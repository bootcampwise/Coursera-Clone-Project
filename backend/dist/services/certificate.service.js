"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCertificateHtml = exports.verifyCertificate = exports.getCertificateById = exports.getMyCertificates = exports.issueCertificateForEnrollment = exports.regenerateCertificateAssets = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const ejs_1 = __importDefault(require("ejs"));
const prisma_1 = require("../config/prisma");
const notification_service_1 = require("./notification.service");
const CERT_DIR = path_1.default.join(__dirname, "../../uploads/certificates");
const RIBBON_LOGO_CANDIDATES = [
    path_1.default.join(process.cwd(), "src/assets/certificate/ribbon-logo.png"),
    path_1.default.join(__dirname, "../../assets/certificate/ribbon-logo.png"),
];
const loadRibbonLogoDataUrl = () => {
    for (const candidate of RIBBON_LOGO_CANDIDATES) {
        if (fs_1.default.existsSync(candidate)) {
            const buffer = fs_1.default.readFileSync(candidate);
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
    if (!fs_1.default.existsSync(CERT_DIR)) {
        fs_1.default.mkdirSync(CERT_DIR, { recursive: true });
    }
};
const randomCode = (length) => crypto_1.default
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
const generateUniqueCode = async (field, length) => {
    let code = randomCode(length);
    let exists = await prisma_1.prisma.certificate.findFirst({
        where: { [field]: code },
        select: { id: true },
    });
    while (exists) {
        code = randomCode(length);
        exists = await prisma_1.prisma.certificate.findFirst({
            where: { [field]: code },
            select: { id: true },
        });
    }
    return code;
};
const computeCourseDuration = async (courseId) => {
    const lessons = await prisma_1.prisma.lesson.findMany({
        where: { module: { courseId } },
        select: { duration: true, type: true },
    });
    if (!lessons.length)
        return null;
    const totalMinutes = lessons.reduce((sum, lesson) => {
        if (lesson.type === "VIDEO") {
            const seconds = lesson.duration || 0;
            return sum + Math.round(seconds / 60);
        }
        return sum + 5;
    }, 0);
    if (!totalMinutes)
        return null;
    const hours = Math.round((totalMinutes / 60) * 100) / 100;
    return { minutes: totalMinutes, hours };
};
const computeCourseGrade = async (enrollmentId) => {
    const progress = await prisma_1.prisma.lessonProgress.findMany({
        where: { enrollmentId, score: { not: null } },
        include: { lesson: { select: { type: true } } },
    });
    const assessmentScores = progress
        .filter((p) => p.lesson.type === "ASSESSMENT" && p.score != null)
        .map((p) => p.score);
    if (assessmentScores.length === 0)
        return null;
    const avg = assessmentScores.reduce((sum, v) => sum + v, 0) / assessmentScores.length;
    return Math.round(avg * 100) / 100;
};
const computeCourseGradeByUserCourse = async (userId, courseId) => {
    const enrollment = await prisma_1.prisma.enrollment.findFirst({
        where: { userId, courseId },
        select: { id: true },
    });
    if (!enrollment)
        return null;
    return computeCourseGrade(enrollment.id);
};
const buildVerificationUrl = (code) => {
    const base = process.env.CERT_VERIFY_BASE_URL || "https://coursera.org/verify";
    return `${base}/${code}`;
};
const renderCertificateHtml = async (data) => {
    const templatePath = path_1.default.join(__dirname, "../templates/certificate.ejs");
    const issuedDate = data.issuedAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return ejs_1.default.renderFile(templatePath, {
        ...data,
        issuedDate,
        sealMarkup: RIBBON_LOGO_DATA_URL,
        partnerName: data.partnerName || "Google",
    });
};
const cloudinary_1 = require("../config/cloudinary");
const renderCertificateAssets = async (data) => {
    ensureCertDir();
    const fileBase = `certificate_${data.certificateNumber}`;
    const pdfPath = path_1.default.join(CERT_DIR, `${fileBase}.pdf`);
    const imagePath = path_1.default.join(CERT_DIR, `${fileBase}.png`);
    const verificationUrl = buildVerificationUrl(data.verificationCode);
    const html = await renderCertificateHtml({
        partnerName: data.partnerName,
        learnerName: data.learnerName,
        courseTitle: data.courseTitle,
        issuedAt: data.issuedAt,
        verificationUrl,
    });
    try {
        const browser = await puppeteer_1.default.launch({
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
            ],
            timeout: 60000,
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });
        await page.setContent(html, { waitUntil: "load", timeout: 60000 });
        await new Promise((r) => setTimeout(r, 500));
        await page.pdf({
            path: pdfPath,
            printBackground: true,
            landscape: true,
            width: "11.7in",
            height: "8.3in",
        });
        await page.screenshot({ path: imagePath, fullPage: true });
        await browser.close().catch((e) => { });
        const [pdfResponse, imageResponse] = await Promise.all([
            cloudinary_1.cloudinary.uploader.upload(pdfPath, {
                folder: "coursera-clone/certificates",
                public_id: `${fileBase}`,
                resource_type: "auto",
            }),
            cloudinary_1.cloudinary.uploader.upload(imagePath, {
                folder: "coursera-clone/certificates",
                public_id: `${fileBase}`,
                resource_type: "image",
            }),
        ]);
        try {
            if (fs_1.default.existsSync(pdfPath))
                fs_1.default.unlinkSync(pdfPath);
            if (fs_1.default.existsSync(imagePath))
                fs_1.default.unlinkSync(imagePath);
        }
        catch (cleanupErr) {
            // Temporary files cleanup failed
        }
        return {
            pdfUrl: pdfResponse.secure_url,
            imageUrl: imageResponse.secure_url,
        };
    }
    catch (err) {
        throw err;
    }
};
const regenerateCertificateAssets = async (certificateId) => {
    const cert = await prisma_1.prisma.certificate.findUnique({
        where: { id: certificateId },
    });
    if (!cert)
        throw new Error("Certificate not found");
    const assets = await renderCertificateAssets({
        certificateNumber: cert.certificateNumber,
        verificationCode: cert.verificationCode,
        learnerName: cert.learnerName,
        courseTitle: cert.courseTitle,
        partnerName: cert.partnerName || undefined,
        issuedAt: cert.issuedAt,
    });
    return prisma_1.prisma.certificate.update({
        where: { id: cert.id },
        data: {
            pdfUrl: assets.pdfUrl,
            imageUrl: assets.imageUrl,
        },
    });
};
exports.regenerateCertificateAssets = regenerateCertificateAssets;
const issueCertificateForEnrollment = async (enrollmentId) => {
    const enrollment = await prisma_1.prisma.enrollment.findUnique({
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
    if (!enrollment)
        throw new Error("Enrollment not found");
    if (!enrollment.completed)
        throw new Error("Course not completed for this enrollment");
    const existing = await prisma_1.prisma.certificate.findFirst({
        where: { userId: enrollment.userId, courseId: enrollment.courseId },
    });
    if (existing) {
        const pdfUrl = existing.pdfUrl || "";
        const imageUrl = existing.imageUrl || "";
        const pdfPath = path_1.default.join(__dirname, "../../", pdfUrl.replace(/^\/+/, ""));
        const imagePath = path_1.default.join(__dirname, "../../", imageUrl.replace(/^\/+/, ""));
        const isCloudinary = pdfUrl.startsWith("http");
        if (pdfUrl &&
            imageUrl &&
            (isCloudinary || (fs_1.default.existsSync(pdfPath) && fs_1.default.existsSync(imagePath)))) {
            const found = await prisma_1.prisma.certificate.findUnique({
                where: { id: existing.id },
                include: { course: { select: CERTIFICATE_COURSE_SELECT } },
            });
            return found;
        }
    }
    ensureCertDir();
    let certificate = existing;
    if (!certificate) {
        const certificateNumber = await generateUniqueCode("certificateNumber", 12);
        const verificationCode = await generateUniqueCode("verificationCode", 16);
        const duration = await computeCourseDuration(enrollment.courseId);
        const grade = await computeCourseGrade(enrollmentId);
        certificate = await prisma_1.prisma.certificate.create({
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
            await notification_service_1.notificationService.createNotification(enrollment.userId, {
                type: "certificate",
                title: "Congratulations, Your Course Certificate is Ready!",
                message: `${enrollment.course.title}. You can now download your certificate, add it to LinkedIn, and share it with your network.`,
                actionText: "View Certificate",
                link: `/accomplishments/certificate/${certificate.id}`,
            });
        }
        catch (notifError) {
            // Notification failed
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
        return prisma_1.prisma.certificate.update({
            where: { id: certificate.id },
            data: {
                pdfUrl: assets.pdfUrl,
                imageUrl: assets.imageUrl,
            },
            include: { course: { select: CERTIFICATE_COURSE_SELECT } },
        });
    }
    catch (err) {
        const found = await prisma_1.prisma.certificate.findUnique({
            where: { id: certificate.id },
            include: { course: { select: CERTIFICATE_COURSE_SELECT } },
        });
        return found;
    }
};
exports.issueCertificateForEnrollment = issueCertificateForEnrollment;
const getMyCertificates = async (userId) => {
    const certificates = await prisma_1.prisma.certificate.findMany({
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
        const pdfPath = path_1.default.join(__dirname, "../../", pdfUrl.replace(/^\/+/, ""));
        const imagePath = path_1.default.join(__dirname, "../../", imageUrl.replace(/^\/+/, ""));
        const isCloudinary = pdfUrl.startsWith("http");
        if (!pdfUrl ||
            !imageUrl ||
            (!isCloudinary && (!fs_1.default.existsSync(pdfPath) || !fs_1.default.existsSync(imagePath)))) {
            try {
                const enrollment = await prisma_1.prisma.enrollment.findFirst({
                    where: { userId: cert.userId, courseId: cert.courseId },
                });
                if (enrollment) {
                    cert = await (0, exports.issueCertificateForEnrollment)(enrollment.id);
                }
            }
            catch (err) {
                // Self-heal failed
            }
        }
        if (typeof cert.grade !== "number") {
            const grade = await computeCourseGradeByUserCourse(cert.userId, cert.courseId);
            if (typeof grade === "number") {
                cert = await prisma_1.prisma.certificate.update({
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
exports.getMyCertificates = getMyCertificates;
const getCertificateById = async (id, userId) => {
    const cert = await prisma_1.prisma.certificate.findUnique({
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
    if (!cert)
        throw new Error("Certificate not found");
    if (cert.userId !== userId)
        throw new Error("Unauthorized");
    const updates = {};
    if (!cert.durationMinutes || !cert.durationHours) {
        const duration = await computeCourseDuration(cert.courseId);
        if (duration) {
            updates.durationHours = duration.hours;
            updates.durationMinutes = duration.minutes;
        }
    }
    if (typeof cert.grade !== "number") {
        const grade = await computeCourseGradeByUserCourse(cert.userId, cert.courseId);
        if (typeof grade === "number") {
            updates.grade = grade;
        }
    }
    if (Object.keys(updates).length > 0) {
        const updated = await prisma_1.prisma.certificate.update({
            where: { id: cert.id },
            data: updates,
        });
        return { ...cert, ...updated };
    }
    return cert;
};
exports.getCertificateById = getCertificateById;
const verifyCertificate = async (verificationCode) => {
    const cert = await prisma_1.prisma.certificate.findFirst({
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
    if (!cert)
        throw new Error("Certificate not found");
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
exports.verifyCertificate = verifyCertificate;
const getCertificateHtml = async (id, userId) => {
    const cert = await prisma_1.prisma.certificate.findUnique({
        where: { id },
    });
    if (!cert)
        throw new Error("Certificate not found");
    if (cert.userId !== userId)
        throw new Error("Unauthorized");
    const verificationUrl = buildVerificationUrl(cert.verificationCode);
    return renderCertificateHtml({
        partnerName: cert.partnerName || undefined,
        learnerName: cert.learnerName,
        courseTitle: cert.courseTitle,
        issuedAt: cert.issuedAt,
        verificationUrl,
    });
};
exports.getCertificateHtml = getCertificateHtml;
