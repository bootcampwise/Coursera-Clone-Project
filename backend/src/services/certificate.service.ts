import path from "path";
import fs from "fs";
import crypto from "crypto";
import puppeteer from "puppeteer";
import ejs from "ejs";
import { prisma } from "../config/prisma";
import { notificationService } from "./notification.service";

const CERT_DIR = path.join(__dirname, "../../uploads/certificates");
const RIBBON_LOGO_CANDIDATES = [
  path.join(process.cwd(), "src/assets/certificate/ribbon-logo.png"),
  path.join(__dirname, "../../assets/certificate/ribbon-logo.png"),
];

const loadRibbonLogoDataUrl = () => {
  for (const candidate of RIBBON_LOGO_CANDIDATES) {
    if (fs.existsSync(candidate)) {
      const buffer = fs.readFileSync(candidate);
      return `data:image/png;base64,${buffer.toString("base64")}`;
    }
  }
  return null;
};

const RIBBON_LOGO_DATA_URL = loadRibbonLogoDataUrl();

const CERTIFICATE_COURSE_SELECT = {
  id: true,
  thumbnail: true,
  description: true,
  outcomes: true,
  difficulty: true,
  category: true,
  instructor: { select: { id: true, name: true } },
};

const ensureCertDir = () => {
  if (!fs.existsSync(CERT_DIR)) {
    fs.mkdirSync(CERT_DIR, { recursive: true });
  }
};

const randomCode = (length: number) =>
  crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);

const generateUniqueCode = async (
  field: "certificateNumber" | "verificationCode",
  length: number,
) => {
  let code = randomCode(length);
  let exists = await prisma.certificate.findFirst({
    where: { [field]: code } as any,
    select: { id: true },
  });
  while (exists) {
    code = randomCode(length);
    exists = await prisma.certificate.findFirst({
      where: { [field]: code } as any,
      select: { id: true },
    });
  }
  return code;
};

const computeCourseDuration = async (courseId: string) => {
  const lessons = await prisma.lesson.findMany({
    where: { module: { courseId } },
    select: { duration: true, type: true },
  });
  if (!lessons.length) return null;

  const totalMinutes = lessons.reduce((sum, lesson) => {
    if (lesson.type === "VIDEO") {
      const seconds = lesson.duration || 0;
      return sum + Math.round(seconds / 60);
    }
    
    return sum + 5;
  }, 0);

  if (!totalMinutes) return null;
  const hours = Math.round((totalMinutes / 60) * 100) / 100;
  return { minutes: totalMinutes, hours };
};

const computeCourseGrade = async (enrollmentId: string) => {
  const progress = await prisma.lessonProgress.findMany({
    where: { enrollmentId, score: { not: null } },
    include: { lesson: { select: { type: true } } },
  });
  const assessmentScores = progress
    .filter((p) => p.lesson.type === "ASSESSMENT" && p.score != null)
    .map((p) => p.score as number);
  if (assessmentScores.length === 0) return null;
  const avg =
    assessmentScores.reduce((sum, v) => sum + v, 0) / assessmentScores.length;
  return Math.round(avg * 100) / 100;
};

const computeCourseGradeByUserCourse = async (
  userId: string,
  courseId: string,
) => {
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId, courseId },
    select: { id: true },
  });
  if (!enrollment) return null;
  return computeCourseGrade(enrollment.id);
};

const buildVerificationUrl = (code: string) => {
  const base =
    process.env.CERT_VERIFY_BASE_URL || "https://coursera.org/verify";
  return `${base}/${code}`;
};

const renderCertificateHtml = async (data: {
  partnerName?: string;
  learnerName: string;
  courseTitle: string;
  issuedAt: Date;
  verificationUrl: string;
}) => {
  const templatePath = path.join(__dirname, "../templates/certificate.ejs");
  const issuedDate = data.issuedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return ejs.renderFile(templatePath, {
    ...data,
    issuedDate,
    sealMarkup: RIBBON_LOGO_DATA_URL,
    partnerName: data.partnerName || "Google",
  });
};

const renderCertificateAssets = async (data: {
  certificateNumber: string;
  verificationCode: string;
  learnerName: string;
  courseTitle: string;
  partnerName?: string;
  issuedAt: Date;
}) => {
  ensureCertDir();
  const fileBase = `certificate_${data.certificateNumber}`;
  const pdfPath = path.join(CERT_DIR, `${fileBase}.pdf`);
  const imagePath = path.join(CERT_DIR, `${fileBase}.png`);

  const verificationUrl = buildVerificationUrl(data.verificationCode);
  const html = await renderCertificateHtml({
    partnerName: data.partnerName,
    learnerName: data.learnerName,
    courseTitle: data.courseTitle,
    issuedAt: data.issuedAt,
    verificationUrl,
  });

  try {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      timeout: 60000,
    });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });

    console.log(`[certificate-service] Setting content for ${fileBase}...`);
    await page.setContent(html, { waitUntil: "load", timeout: 60000 });

    
    await new Promise((r) => setTimeout(r, 500));

    console.log(`[certificate-service] Generating PDF for ${fileBase}...`);
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      landscape: true,
      width: "11.7in",
      height: "8.3in",
    });

    console.log(
      `[certificate-service] Generating screenshot for ${fileBase}...`,
    );
    await page.screenshot({ path: imagePath, fullPage: true });

    await browser
      .close()
      .catch((e) =>
        console.error("[certificate-service] Error closing browser:", e),
      );
  } catch (err: any) {
    console.error(
      `[certificate-service] Puppeteer failure for ${fileBase}:`,
      err.message,
    );
    if (err.stack) console.error(err.stack);
    throw err;
  }

  return {
    pdfUrl: `/uploads/certificates/${fileBase}.pdf`,
    imageUrl: `/uploads/certificates/${fileBase}.png`,
  };
};

export const regenerateCertificateAssets = async (certificateId: string) => {
  const cert = await prisma.certificate.findUnique({
    where: { id: certificateId },
  });
  if (!cert) throw new Error("Certificate not found");

  const assets = await renderCertificateAssets({
    certificateNumber: cert.certificateNumber,
    verificationCode: cert.verificationCode,
    learnerName: cert.learnerName,
    courseTitle: cert.courseTitle,
    partnerName: cert.partnerName || undefined,
    issuedAt: cert.issuedAt,
  });

  return prisma.certificate.update({
    where: { id: cert.id },
    data: {
      pdfUrl: assets.pdfUrl,
      imageUrl: assets.imageUrl,
    },
  });
};

export const issueCertificateForEnrollment = async (enrollmentId: string) => {
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
    include: {
      user: { select: { id: true, name: true } },
      course: {
        select: {
          id: true,
          title: true,
          instructor: { select: { name: true } },
        },
      },
    },
  });

  if (!enrollment) throw new Error("Enrollment not found");
  if (!enrollment.completed)
    throw new Error("Course not completed for this enrollment");

  const existing = await prisma.certificate.findFirst({
    where: { userId: enrollment.userId, courseId: enrollment.courseId },
  });

  
  if (existing) {
    const pdfUrl = existing.pdfUrl || "";
    const imageUrl = existing.imageUrl || "";
    const pdfPath = path.join(__dirname, "../../", pdfUrl.replace(/^\/+/, ""));
    const imagePath = path.join(
      __dirname,
      "../../",
      imageUrl.replace(/^\/+/, ""),
    );

    if (
      pdfUrl &&
      imageUrl &&
      fs.existsSync(pdfPath) &&
      fs.existsSync(imagePath)
    ) {
      return prisma.certificate.findUnique({
        where: { id: existing.id },
        include: { course: { select: CERTIFICATE_COURSE_SELECT } },
      }) as any;
    }
    
    console.log(
      `[certificate-service] Assets missing for existing certificate ${existing.id}, retrying generation...`,
    );
  }

  ensureCertDir();

  let certificate = existing;
  if (!certificate) {
    const certificateNumber = await generateUniqueCode("certificateNumber", 12);
    const verificationCode = await generateUniqueCode("verificationCode", 16);

    const duration = await computeCourseDuration(enrollment.courseId);
    const grade = await computeCourseGrade(enrollmentId);

    certificate = await prisma.certificate.create({
      data: {
        userId: enrollment.userId,
        courseId: enrollment.courseId,
        issuedAt: enrollment.completedAt || new Date(),
        certificateNumber,
        verificationCode,
        learnerName: enrollment.user.name,
        courseTitle: enrollment.course.title,
        partnerName: enrollment.course.instructor?.name || undefined,
        durationHours: duration?.hours ?? undefined,
        durationMinutes: duration?.minutes ?? undefined,
        grade: grade ?? undefined,
        verifiedIdentity: false,
      },
    });

    
    try {
      await notificationService.createNotification(enrollment.userId, {
        type: "certificate",
        title: "Congratulations, Your Course Certificate is Ready!",
        message: `${enrollment.course.title}. You can now download your certificate, add it to LinkedIn, and share it with your network.`,
        actionText: "View Certificate",
        link: `/accomplishments/certificate/${certificate.id}`,
      });
    } catch (notifError) {
      console.error(
        "[certificate-service] Failed to create notification:",
        notifError,
      );
      
    }
  }

  try {
    const assets = await renderCertificateAssets({
      certificateNumber: certificate.certificateNumber,
      verificationCode: certificate.verificationCode,
      learnerName: certificate.learnerName,
      courseTitle: certificate.courseTitle,
      partnerName: certificate.partnerName || undefined,
      issuedAt: certificate.issuedAt,
    });

    console.log(`[certificate-service] Assets generated for ${certificate.id}`);
    return prisma.certificate.update({
      where: { id: certificate.id },
      data: {
        pdfUrl: assets.pdfUrl,
        imageUrl: assets.imageUrl,
      },
      include: { course: { select: CERTIFICATE_COURSE_SELECT } },
    });
  } catch (err) {
    console.error(
      `[certificate-service] Failed to render certificate assets for ${certificate.id}:`,
      err,
    );
    return prisma.certificate.findUnique({
      where: { id: certificate.id },
      include: { course: { select: CERTIFICATE_COURSE_SELECT } },
    }) as any;
  }
};

export const getMyCertificates = async (userId: string) => {
  const certificates = await prisma.certificate.findMany({
    where: { userId },
    orderBy: { issuedAt: "desc" },
    include: {
      course: {
        select: CERTIFICATE_COURSE_SELECT,
      },
    },
  });

  const finalCerts = [];
  for (let cert of certificates) {
    
    const pdfUrl = cert.pdfUrl || "";
    const imageUrl = cert.imageUrl || "";
    const pdfPath = path.join(__dirname, "../../", pdfUrl.replace(/^\/+/, ""));
    const imagePath = path.join(
      __dirname,
      "../../",
      imageUrl.replace(/^\/+/, ""),
    );

    if (
      !pdfUrl ||
      !imageUrl ||
      !fs.existsSync(pdfPath) ||
      !fs.existsSync(imagePath)
    ) {
      console.log(
        `[certificate-service] Self-healing broken certificate ${cert.id}...`,
      );
      try {
        const enrollment = await prisma.enrollment.findFirst({
          where: { userId: cert.userId, courseId: cert.courseId },
        });
        if (enrollment) {
          cert = await issueCertificateForEnrollment(enrollment.id);
        }
      } catch (err) {
        console.error(
          `[certificate-service] Self-heal failed for ${cert.id}:`,
          err,
        );
      }
    }

    
    if (typeof cert.grade !== "number") {
      const grade = await computeCourseGradeByUserCourse(
        cert.userId,
        cert.courseId,
      );
      if (typeof grade === "number") {
        cert = await prisma.certificate.update({
          where: { id: cert.id },
          data: { grade },
          include: {
            course: {
              select: CERTIFICATE_COURSE_SELECT,
            },
          },
        });
      }
    }

    finalCerts.push(cert);
  }

  return finalCerts;
};

export const getCertificateById = async (id: string, userId: string) => {
  const cert = await prisma.certificate.findUnique({
    where: { id },
    include: {
      course: {
        select: {
          id: true,
          thumbnail: true,
          description: true,
          outcomes: true,
          difficulty: true,
          category: true,
          instructor: { select: { id: true, name: true } },
        },
      },
    },
  });
  if (!cert) throw new Error("Certificate not found");
  if (cert.userId !== userId) throw new Error("Unauthorized");
  const updates: {
    durationHours?: number;
    durationMinutes?: number;
    grade?: number;
  } = {};

  if (!cert.durationMinutes || !cert.durationHours) {
    const duration = await computeCourseDuration(cert.courseId);
    if (duration) {
      updates.durationHours = duration.hours;
      updates.durationMinutes = duration.minutes;
    }
  }

  if (typeof cert.grade !== "number") {
    const grade = await computeCourseGradeByUserCourse(
      cert.userId,
      cert.courseId,
    );
    if (typeof grade === "number") {
      updates.grade = grade;
    }
  }

  if (Object.keys(updates).length > 0) {
    const updated = await prisma.certificate.update({
      where: { id: cert.id },
      data: updates,
    });
    return { ...cert, ...updated };
  }

  return cert;
};

export const verifyCertificate = async (verificationCode: string) => {
  const cert = await prisma.certificate.findFirst({
    where: { verificationCode, revokedAt: null },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          instructor: { select: { name: true } },
        },
      },
      user: { select: { name: true } },
    },
  });
  if (!cert) throw new Error("Certificate not found");
  return {
    id: cert.id,
    certificateNumber: cert.certificateNumber,
    verificationCode: cert.verificationCode,
    issuedAt: cert.issuedAt,
    learnerName: cert.learnerName || cert.user.name,
    courseTitle: cert.courseTitle || cert.course.title,
    partnerName: cert.partnerName || cert.course.instructor?.name,
    verifiedIdentity: cert.verifiedIdentity,
  };
};

export const getCertificateHtml = async (id: string, userId: string) => {
  const cert = await prisma.certificate.findUnique({
    where: { id },
  });
  if (!cert) throw new Error("Certificate not found");
  if (cert.userId !== userId) throw new Error("Unauthorized");

  const verificationUrl = buildVerificationUrl(cert.verificationCode);
  return renderCertificateHtml({
    partnerName: cert.partnerName || undefined,
    learnerName: cert.learnerName,
    courseTitle: cert.courseTitle,
    issuedAt: cert.issuedAt,
    verificationUrl,
  });
};
