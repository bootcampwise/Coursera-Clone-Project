import path from "path";
import fs from "fs";
import crypto from "crypto";
import puppeteer from "puppeteer";
import { prisma } from "../config/prisma";

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

const ensureCertDir = () => {
  if (!fs.existsSync(CERT_DIR)) {
    fs.mkdirSync(CERT_DIR, { recursive: true });
  }
};

const randomCode = (length: number) =>
  crypto.randomBytes(Math.ceil(length / 2)).toString("hex").slice(0, length);

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
    // READING + ASSESSMENT = fixed 5 minutes
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
    assessmentScores.reduce((sum, v) => sum + v, 0) /
    assessmentScores.length;
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

const buildCertificateHtml = (data: {
  partnerName?: string;
  learnerName: string;
  courseTitle: string;
  issuedAt: Date;
  verificationUrl: string;
}) => {
  const issuedDate = data.issuedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const sealMarkup = RIBBON_LOGO_DATA_URL
    ? `<img src="${RIBBON_LOGO_DATA_URL}" alt="Coursera seal" class="seal-image" />`
    : `<div class="seal-fallback">coursera</div>`;

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    background: #ffffff;
    font-family: "Georgia", "Times New Roman", serif;
  }

  .page {
    --side-inset: 90px;
     --v-space: 20px;
    width: 1200px;
    height: 846px;
    padding: 48px var(--side-inset);
    position: relative;
    background:
      radial-gradient(circle at 20% 40%, rgba(0,0,0,0.03), transparent 40%),
      radial-gradient(circle at 80% 60%, rgba(0,0,0,0.03), transparent 40%),
      #ffffff;
  }

  

  /* ========================= */
/* Inner decorative border   */
/* ========================= */

.page::before {
  content: "";
  position: absolute;
  inset: 8px;              /* VERY tight – matches Figma */
  border: 4px solid #c9c9cc;
  pointer-events: none;
}

/* Corner ornaments */
.page::after {
  content: "";
  position: absolute;
  inset: 8px;
  pointer-events: none;

  background:
    /* top-left */
    linear-gradient(#c9c9cc, #c9c9cc) left top / 12px 1px no-repeat,
    linear-gradient(#c9c9cc, #c9c9cc) left top / 1px 12px no-repeat,

    /* top-right */
    linear-gradient(#c9c9cc, #c9c9cc) right top / 12px 1px no-repeat,
    linear-gradient(#c9c9cc, #c9c9cc) right top / 1px 12px no-repeat,

    /* bottom-left */
    linear-gradient(#c9c9cc, #c9c9cc) left bottom / 12px 1px no-repeat,
    linear-gradient(#c9c9cc, #c9c9cc) left bottom / 1px 12px no-repeat,

    /* bottom-right */
    linear-gradient(#c9c9cc, #c9c9cc) right bottom / 12px 1px no-repeat,
    linear-gradient(#c9c9cc, #c9c9cc) right bottom / 1px 12px no-repeat;
}


  /* Google logo */
  .google {
    font-family: Arial, sans-serif;
    font-size: 128px;
    font-weight: 700;
    letter-spacing: -0.8px;
    line-height: 1;
    margin-bottom: 24px;
  }
  .g1 { color:#4285F4; }
  .g2 { color:#EA4335; }
  .g3 { color:#FBBC05; }
  .g4 { color:#4285F4; }
  .g5 { color:#34A853; }
  .g6 { color:#EA4335; }


  .issued,
.completed,
.authorized {
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: 400;
  color: #6b6b6b;
}


  .issued {
    margin-top: var(--v-space);
  }

  .name {
  margin-top: var(--v-space);
  font-size: 48px;
  font-weight: 400;
}

  .completed {
   margin-top: var(--v-space);
  }

 .course {
  margin-top: var(--v-space);
  font-size: 32px;
  font-weight: 400;
}

  .authorized {
    margin-top: var(--v-space);
    max-width: 560px;
  }

  /* Signature */
  .signature {
    position: absolute;
    bottom: 120px;
    left: 90px;
  }
.sig-line {
  font-family: "Segoe Script", "Brush Script MT", cursive;
  font-size: 26px;
  font-weight: 700;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 260px;            /* slightly wider */
  white-space: nowrap;     /* ✅ forces single line */
}


  .sig-name {
  margin-top: 10px;
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #555;
}

.sig-title {
  margin-top: 6px;
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #6b6b6b;
}


    /* ========================= */
  /* Ribbon - Figma matched    */
  /* ========================= */
  .ribbon {
    position: absolute;
    top: 8px;
    right: var(--side-inset);
    width: 200px;
    height: 70%;
    background: #e2e7eb;
    border-left: 1px solid #cfd4dc;
    text-align: center;
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 36px),
      50% 100%,
      0 calc(100% - 36px)
    );
  }

 .ribbon-inner {
  width: 100%;
  height: 100%;
  padding: 48px 24px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


  .ribbon-title {
    margin: 0;
    font-family: "Georgia", "Times New Roman", serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 2;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #000000;
  }

  .ribbon-title span {
    display: block;
  }

  .seal {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-bottom: 16px;
  }
  .seal-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .seal-fallback {
    font-family: Arial, sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #2c2c2c;
    text-transform: lowercase;
    z-index: 2;
  }

  
  /* Footer */
  .verify {
    position: absolute;
    bottom: 36px;
    right: 56px;
    font-family: Arial, sans-serif;
    font-size: 11px;
    color: #555;
    text-align: right;
    width: 360px;
    line-height: 1.5;
  }
  .verify a {
    color: #1a73e8;
    text-decoration: none;
  }

  .content {
  max-width: 760px;
  margin-top: 28px;
}


</style>
</head>

<body>
<div class="page">

  <div class="content">
    <div class="google">
      <span class="g1">G</span><span class="g2">o</span><span class="g3">o</span><span class="g4">g</span><span class="g5">l</span><span class="g6">e</span>
    </div>
    <div class="issued">${issuedDate}</div>

    <div class="name">${data.learnerName}</div>
    <div class="completed">has successfully completed</div>

    <div class="course">${data.courseTitle}</div>
    <div class="authorized">
      an online non-credit course authorized by ${data.partnerName || "Google"} and offered through Coursera
    </div>
  </div>

  <div class="signature">
    <div class="sig-line">Amanda Brophy</div>
    <div class="sig-name">Amanda Brophy</div>
    <div class="sig-title">Global Director of Google Career Certificates</div>
  </div>

    <div class="ribbon">
    <div class="ribbon-inner">
      <div class="ribbon-title">
        <span>Course</span>
        <span>Certificate</span>
      </div>
      <div class="seal">${sealMarkup}</div>
    </div>
  </div>

  <div class="verify">
    Verify at:<br/>
    <a href="${data.verificationUrl}">${data.verificationUrl}</a><br/>
    Coursera has confirmed the identity of this individual and<br/>
    their participation in the course
  </div>

</div>
</body>
</html>
`;
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
  const html = buildCertificateHtml({
    partnerName: data.partnerName,
    learnerName: data.learnerName,
    courseTitle: data.courseTitle,
    issuedAt: data.issuedAt,
    verificationUrl,
  });

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 850, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({
    path: pdfPath,
    printBackground: true,
    landscape: true,
    width: "11.7in",
    height: "8.3in",
  });
  await page.screenshot({ path: imagePath, fullPage: true });
  await browser.close();

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
  if (existing) return existing;

  ensureCertDir();

  const certificateNumber = await generateUniqueCode(
    "certificateNumber",
    12,
  );
  const verificationCode = await generateUniqueCode(
    "verificationCode",
    16,
  );

  const duration = await computeCourseDuration(enrollment.courseId);
  const grade = await computeCourseGrade(enrollmentId);

  const certificate = await prisma.certificate.create({
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
    const assets = await renderCertificateAssets({
      certificateNumber,
      verificationCode,
      learnerName: certificate.learnerName,
      courseTitle: certificate.courseTitle,
      partnerName: certificate.partnerName || undefined,
      issuedAt: certificate.issuedAt,
    });

    return prisma.certificate.update({
      where: { id: certificate.id },
      data: {
        pdfUrl: assets.pdfUrl,
        imageUrl: assets.imageUrl,
      },
    });
  } catch (err) {
    console.error("Failed to render certificate assets", err);
    return certificate;
  }
};

export const getMyCertificates = async (userId: string) => {
  const certificates = await prisma.certificate.findMany({
    where: { userId },
    orderBy: { issuedAt: "desc" },
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
  const updates = await Promise.all(
    certificates.map(async (cert) => {
      if (typeof cert.grade === "number") return cert;
      const grade = await computeCourseGradeByUserCourse(
        cert.userId,
        cert.courseId,
      );
      if (typeof grade !== "number") {
        console.log(
          `[certificates] Grade not available for certificate ${cert.id} (user ${cert.userId}, course ${cert.courseId})`,
        );
        return cert;
      }
      const updated = await prisma.certificate.update({
        where: { id: cert.id },
        data: { grade },
      });
      console.log(
        `[certificates] Grade computed for certificate ${cert.id}: ${updated.grade}`,
      );
      return { ...cert, grade: updated.grade };
    }),
  );
  return updates;
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
  const updates: { durationHours?: number; durationMinutes?: number; grade?: number } =
    {};

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

