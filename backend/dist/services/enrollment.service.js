"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonProgress = exports.getStudentCourseProgress = exports.getEnrollmentStatus = exports.getCourseEnrollments = exports.updateProgress = exports.getUserEnrollments = exports.enrollUser = void 0;
const prisma_1 = require("../config/prisma");
const certificate_service_1 = require("./certificate.service");
const notification_service_1 = require("./notification.service");
const enrollUser = async (userId, courseId) => {
    const course = await prisma_1.prisma.course.findUnique({ where: { id: courseId } });
    if (!course)
        throw new Error("Course not found");
    if (course.status !== "Published")
        throw new Error("Course is not available for enrollment");
    const existingEnrollment = await prisma_1.prisma.enrollment.findFirst({
        where: { userId, courseId },
    });
    if (existingEnrollment)
        throw new Error("User already enrolled in this course");
    const enrollment = await prisma_1.prisma.enrollment.create({
        data: {
            userId,
            courseId,
            progress: 0,
            completed: false,
        },
        include: {
            course: {
                select: {
                    title: true,
                    thumbnail: true,
                    instructor: { select: { name: true } },
                },
            },
        },
    });
    try {
        await notification_service_1.notificationService.createNotification(userId, {
            type: "welcome",
            title: `Welcome to ${enrollment.course.title}`,
            message: `We're thrilled to have you! Start learning today and unlock your potential.`,
            actionText: "Go to Course",
            link: `/learn/${courseId}`,
            imageUrl: enrollment.course.thumbnail || undefined,
        });
    }
    catch (notifError) {
        // Welcome notification failed silently
    }
    return enrollment;
};
exports.enrollUser = enrollUser;
const getUserEnrollments = async (userId) => {
    const enrollments = await prisma_1.prisma.enrollment.findMany({
        where: { userId },
        include: {
            course: {
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    description: true,
                    difficulty: true,
                    category: true,
                    instructor: { select: { id: true, name: true } },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    const courseIds = enrollments.map((e) => e.course.id);
    const reviews = await prisma_1.prisma.review.findMany({
        where: { userId, courseId: { in: courseIds } },
        select: { courseId: true, rating: true },
    });
    const reviewedByCourseId = new Map(reviews.map((r) => [r.courseId, r.rating]));
    return enrollments.map((enrollment) => ({
        ...enrollment,
        hasReviewed: reviewedByCourseId.has(enrollment.course.id),
        myRating: reviewedByCourseId.get(enrollment.course.id) ?? null,
    }));
};
exports.getUserEnrollments = getUserEnrollments;
const updateProgress = async (enrollmentId, userId, progress, completed) => {
    const enrollment = await prisma_1.prisma.enrollment.findUnique({
        where: { id: enrollmentId },
    });
    if (!enrollment)
        throw new Error("Enrollment not found");
    if (enrollment.userId !== userId) {
        throw new Error("Not authorized to update this enrollment");
    }
    const updatedEnrollment = await prisma_1.prisma.enrollment.update({
        where: { id: enrollmentId },
        data: {
            progress,
            completed,
        },
    });
    return updatedEnrollment;
};
exports.updateProgress = updateProgress;
const getCourseEnrollments = async (courseId, instructorId, userRole) => {
    const course = await prisma_1.prisma.course.findUnique({ where: { id: courseId } });
    if (!course)
        throw new Error("Course not found");
    if (userRole.toLowerCase() !== "admin" &&
        userRole.toLowerCase() !== "administrator" &&
        course.instructorId !== instructorId) {
        throw new Error("Not authorized to view enrollments for this course");
    }
    const enrollments = await prisma_1.prisma.enrollment.findMany({
        where: { courseId },
        include: {
            user: {
                select: { id: true, name: true, email: true, avatarUrl: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return enrollments;
};
exports.getCourseEnrollments = getCourseEnrollments;
const getEnrollmentStatus = async (userId, courseId) => {
    const enrollment = await prisma_1.prisma.enrollment.findFirst({
        where: { userId, courseId },
        select: { id: true },
    });
    return {
        isEnrolled: !!enrollment,
        enrollmentId: enrollment?.id || null,
    };
};
exports.getEnrollmentStatus = getEnrollmentStatus;
const getStudentCourseProgress = async (userId, courseId) => {
    const [enrollment, modules] = await Promise.all([
        prisma_1.prisma.enrollment.findFirst({
            where: { userId, courseId },
            include: {
                lessonProgress: {
                    select: { lessonId: true, completed: true, lastPlayed: true },
                },
            },
        }),
        prisma_1.prisma.module.findMany({
            where: { courseId },
            include: {
                lessons: {
                    select: { id: true },
                },
            },
            orderBy: { order: "asc" },
        }),
    ]);
    if (!enrollment)
        return null;
    const completedLessonIds = new Set(enrollment.lessonProgress.filter((p) => p.completed).map((p) => p.lessonId));
    const moduleProgress = modules.map((module) => {
        const lessonIds = module.lessons.map((l) => l.id);
        const completedLessons = lessonIds.filter((id) => completedLessonIds.has(id)).length;
        const completed = lessonIds.length > 0 && completedLessons === lessonIds.length;
        return {
            moduleId: module.id,
            totalLessons: lessonIds.length,
            completedLessons,
            completed,
        };
    });
    return {
        enrollmentId: enrollment.id,
        progress: enrollment.progress,
        completed: enrollment.completed,
        lessonProgress: enrollment.lessonProgress,
        moduleProgress,
    };
};
exports.getStudentCourseProgress = getStudentCourseProgress;
const updateLessonProgress = async (userId, enrollmentId, lessonId, data) => {
    const [enrollment, existingProgress] = await Promise.all([
        prisma_1.prisma.enrollment.findUnique({
            where: { id: enrollmentId },
        }),
        prisma_1.prisma.lessonProgress.findUnique({
            where: { enrollmentId_lessonId: { enrollmentId, lessonId } },
            select: { completed: true, lastPlayed: true },
        }),
    ]);
    if (!enrollment)
        throw new Error("Enrollment not found");
    if (enrollment.userId !== userId)
        throw new Error("Unauthorized");
    const { completed: requestedCompleted, lastPlayed, passed, forceComplete, score, videoDuration, } = data;
    const wasAlreadyCompleted = !!existingProgress?.completed;
    let completed = wasAlreadyCompleted || requestedCompleted;
    if (completed && !wasAlreadyCompleted) {
        const lesson = await prisma_1.prisma.lesson.findUnique({
            where: { id: lessonId },
            select: { type: true, duration: true },
        });
        if (lesson?.type === "ASSESSMENT" && !passed) {
            completed = false;
        }
        if (lesson?.type === "VIDEO" && !forceComplete) {
            const duration = lesson.duration ?? videoDuration ?? 0;
            const resolvedLastPlayed = lastPlayed ?? existingProgress?.lastPlayed ?? 0;
            const watchedEnough = duration > 0 && resolvedLastPlayed >= Math.floor(duration * 0.98);
            if (!watchedEnough)
                completed = false;
        }
    }
    const progress = await prisma_1.prisma.lessonProgress.upsert({
        where: {
            enrollmentId_lessonId: {
                enrollmentId,
                lessonId,
            },
        },
        update: {
            ...(typeof lastPlayed === "number" ? { lastPlayed } : {}),
            completed,
            ...(typeof passed === "boolean" ? { passed } : {}),
            ...(typeof score === "number" ? { score } : {}),
        },
        create: {
            enrollmentId,
            lessonId,
            ...(typeof lastPlayed === "number" ? { lastPlayed } : {}),
            completed,
            ...(typeof passed === "boolean" ? { passed } : {}),
            ...(typeof score === "number" ? { score } : {}),
        },
    });
    const [totalLessons, completedLessons, modules, completedProgress] = await Promise.all([
        prisma_1.prisma.lesson.count({
            where: { module: { courseId: enrollment.courseId } },
        }),
        prisma_1.prisma.lessonProgress.count({
            where: { enrollmentId, completed: true },
        }),
        prisma_1.prisma.module.findMany({
            where: { courseId: enrollment.courseId },
            include: {
                lessons: {
                    select: { id: true },
                },
            },
        }),
        prisma_1.prisma.lessonProgress.findMany({
            where: { enrollmentId, completed: true },
            select: { lessonId: true },
        }),
    ]);
    const completedLessonIds = new Set(completedProgress.map((p) => p.lessonId));
    const totalModules = modules.length;
    const completedModules = modules.filter((module) => {
        if (!module.lessons || module.lessons.length === 0)
            return false;
        return module.lessons.every((lesson) => completedLessonIds.has(lesson.id));
    }).length;
    const newProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const isCompleted = totalModules > 0 && completedModules === totalModules;
    await prisma_1.prisma.enrollment.update({
        where: { id: enrollmentId },
        data: {
            progress: newProgress,
            completed: isCompleted,
            ...(isCompleted && !enrollment.completed
                ? { completedAt: new Date() }
                : {}),
        },
    });
    if (!enrollment.completed && isCompleted) {
        try {
            const courseInfo = await prisma_1.prisma.course.findUnique({
                where: { id: enrollment.courseId },
                select: { title: true },
            });
            if (courseInfo) {
                await notification_service_1.notificationService.createNotification(userId, {
                    type: "course_completion",
                    title: "Congratulations! Course Completed!",
                    message: `You've successfully completed ${courseInfo.title}. Your certificate is being generated.`,
                    actionText: "View Accomplishments",
                    link: "/accomplishments",
                });
            }
        }
        catch (notifError) {
            // Completion notification failed silently
        }
        await (0, certificate_service_1.issueCertificateForEnrollment)(enrollmentId);
    }
    return progress;
};
exports.updateLessonProgress = updateLessonProgress;
