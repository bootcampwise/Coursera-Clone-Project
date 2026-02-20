"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentlyViewedCourses = exports.updateCourseThumbnail = exports.verifyCourseOwnership = exports.getCourseContent = exports.createLesson = exports.createModule = exports.getAdminCourses = exports.getInstructorCourses = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getAllCourses = void 0;
const prisma_1 = require("../config/prisma");
const getAllCourses = async (page = 1, limit = 10, filters = {}) => {
    const skip = (page - 1) * limit;
    const where = {};
    if (filters.status) {
        where.status = filters.status;
    }
    if (filters.category) {
        where.category = filters.category;
    }
    if (filters.difficulty) {
        where.difficulty = filters.difficulty;
    }
    if (filters.search) {
        where.OR = [
            { title: { contains: filters.search, mode: "insensitive" } },
            { subtitle: { contains: filters.search, mode: "insensitive" } },
            { description: { contains: filters.search, mode: "insensitive" } },
            { category: { contains: filters.search, mode: "insensitive" } },
        ];
    }
    if (filters.language) {
        where.language = filters.language;
    }
    const [courses, total] = await Promise.all([
        prisma_1.prisma.course.findMany({
            where,
            skip,
            take: limit,
            include: {
                instructor: {
                    select: { id: true, name: true, avatarUrl: true },
                },
                _count: {
                    select: { enrollments: true, reviews: true },
                },
            },
            orderBy: { createdAt: "desc" },
        }),
        prisma_1.prisma.course.count({ where }),
    ]);
    return {
        courses,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getAllCourses = getAllCourses;
const getCourseById = async (id) => {
    const course = await prisma_1.prisma.course.findUnique({
        where: { id },
        include: {
            instructor: {
                select: { id: true, name: true, avatarUrl: true, email: true },
            },
            modules: {
                include: {
                    lessons: {
                        orderBy: { order: "asc" },
                    },
                },
                orderBy: { order: "asc" },
            },
            reviews: {
                include: {
                    user: { select: { id: true, name: true, avatarUrl: true } },
                },
                orderBy: { id: "desc" },
                take: 10,
            },
            _count: {
                select: { enrollments: true, reviews: true },
            },
        },
    });
    if (!course)
        throw new Error("Course not found");
    return course;
};
exports.getCourseById = getCourseById;
const createCourse = async (data) => {
    const course = await prisma_1.prisma.course.create({
        data: {
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            outcomes: data.outcomes,
            category: data.category,
            difficulty: data.difficulty,
            language: data.language,
            thumbnail: data.thumbnail,
            price: data.price || 0,
            instructorId: data.instructorId,
            status: data.status || "Draft",
        },
        include: {
            instructor: {
                select: { id: true, name: true, avatarUrl: true },
            },
        },
    });
    return course;
};
exports.createCourse = createCourse;
const updateCourse = async (id, userId, userRole, data) => {
    const course = await prisma_1.prisma.course.findUnique({ where: { id } });
    if (!course)
        throw new Error("Course not found");
    const role = userRole.toLowerCase();
    if (role !== "admin" &&
        role !== "administrator" &&
        course.instructorId !== userId) {
        throw new Error("Not authorized to update this course");
    }
    const updatedCourse = await prisma_1.prisma.course.update({
        where: { id },
        data,
        include: {
            instructor: {
                select: { id: true, name: true, avatarUrl: true },
            },
        },
    });
    return updatedCourse;
};
exports.updateCourse = updateCourse;
const deleteCourse = async (id, userId, userRole) => {
    const course = await prisma_1.prisma.course.findUnique({ where: { id } });
    if (!course)
        throw new Error("Course not found");
    const role = userRole.toLowerCase();
    if (role !== "admin" &&
        role !== "administrator" &&
        course.instructorId !== userId) {
        throw new Error("Not authorized to delete this course");
    }
    try {
        await prisma_1.prisma.$transaction(async (tx) => {
            const modules = await tx.module.findMany({
                where: { courseId: id },
                select: { id: true },
            });
            const moduleIds = modules.map((m) => m.id);
            const lessons = await tx.lesson.findMany({
                where: { moduleId: { in: moduleIds } },
                select: { id: true },
            });
            const lessonIds = lessons.map((l) => l.id);
            const enrollments = await tx.enrollment.findMany({
                where: { courseId: id },
                select: { id: true },
            });
            const enrollmentIds = enrollments.map((e) => e.id);
            const assessments = await tx.assessment.findMany({
                where: { courseId: id },
                select: { id: true },
            });
            const assessmentIds = assessments.map((a) => a.id);
            await tx.lessonProgress.deleteMany({
                where: {
                    OR: [
                        { lessonId: { in: lessonIds } },
                        { enrollmentId: { in: enrollmentIds } },
                    ],
                },
            });
            if (lessonIds.length > 0) {
                await tx.transcriptLine.deleteMany({
                    where: { lessonId: { in: lessonIds } },
                });
            }
            if (assessmentIds.length > 0) {
                await tx.submission.deleteMany({
                    where: { assessmentId: { in: assessmentIds } },
                });
                await tx.question.deleteMany({
                    where: { assessmentId: { in: assessmentIds } },
                });
                await tx.assessment.deleteMany({
                    where: { id: { in: assessmentIds } },
                });
            }
            if (lessonIds.length > 0) {
                await tx.lesson.deleteMany({
                    where: { id: { in: lessonIds } },
                });
            }
            if (moduleIds.length > 0) {
                await tx.module.deleteMany({
                    where: { id: { in: moduleIds } },
                });
            }
            await tx.enrollment.deleteMany({
                where: { courseId: id },
            });
            await tx.review.deleteMany({
                where: { courseId: id },
            });
            await tx.course.delete({ where: { id } });
        }, {
            timeout: 15000,
        });
    }
    catch (error) {
        throw error;
    }
    return { message: "Course deleted successfully" };
};
exports.deleteCourse = deleteCourse;
const getInstructorCourses = async (instructorId) => {
    const courses = await prisma_1.prisma.course.findMany({
        where: { instructorId },
        include: {
            _count: {
                select: { enrollments: true, reviews: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return courses;
};
exports.getInstructorCourses = getInstructorCourses;
const getAdminCourses = async () => {
    const courses = await prisma_1.prisma.course.findMany({
        include: {
            instructor: {
                select: { id: true, name: true },
            },
            _count: {
                select: { enrollments: true, reviews: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return courses;
};
exports.getAdminCourses = getAdminCourses;
const createModule = async (courseId, title, order) => {
    return await prisma_1.prisma.module.create({
        data: {
            title,
            order,
            courseId,
        },
    });
};
exports.createModule = createModule;
const createLesson = async (moduleId, data) => {
    return await prisma_1.prisma.lesson.create({
        data: {
            ...data,
            moduleId,
        },
    });
};
exports.createLesson = createLesson;
const getCourseContent = async (courseId) => {
    const course = await prisma_1.prisma.course.findUnique({
        where: { id: courseId },
        include: {
            modules: {
                include: {
                    lessons: {
                        orderBy: { order: "asc" },
                    },
                },
                orderBy: { order: "asc" },
            },
        },
    });
    if (!course)
        throw new Error("Course not found");
    return course.modules;
};
exports.getCourseContent = getCourseContent;
const verifyCourseOwnership = async (courseId, userId, userRole) => {
    const course = await prisma_1.prisma.course.findUnique({
        where: { id: courseId },
        select: { id: true, instructorId: true },
    });
    if (!course)
        throw new Error("Course not found");
    const role = userRole.toLowerCase();
    if (role !== "admin" &&
        role !== "administrator" &&
        course.instructorId !== userId) {
        throw new Error("Not authorized to modify this course");
    }
    return course;
};
exports.verifyCourseOwnership = verifyCourseOwnership;
const updateCourseThumbnail = async (id, thumbnail) => {
    const updatedCourse = await prisma_1.prisma.course.update({
        where: { id },
        data: { thumbnail },
    });
    return updatedCourse;
};
exports.updateCourseThumbnail = updateCourseThumbnail;
const getRecentlyViewedCourses = async (userId) => {
    const enrollments = await prisma_1.prisma.enrollment.findMany({
        where: { userId },
        orderBy: { lastAccessed: "desc" },
        take: 10,
        include: {
            course: {
                select: {
                    id: true,
                    title: true,
                    thumbnail: true,
                    instructor: {
                        select: { name: true },
                    },
                },
            },
        },
    });
    return enrollments.map((e) => ({
        ...e.course,
        lastAccessed: e.lastAccessed,
    }));
};
exports.getRecentlyViewedCourses = getRecentlyViewedCourses;
