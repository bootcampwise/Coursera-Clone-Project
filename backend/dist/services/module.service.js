"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderModules = exports.deleteModule = exports.updateModule = exports.createModule = exports.getCourseModules = void 0;
const prisma_1 = require("../config/prisma");
const course_service_1 = require("./course.service");
const getCourseModules = async (courseId) => {
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
exports.getCourseModules = getCourseModules;
const createModule = async (courseId, title, order, userId, userRole) => {
    await (0, course_service_1.verifyCourseOwnership)(courseId, userId, userRole);
    return await prisma_1.prisma.module.create({
        data: {
            title,
            order,
            courseId,
        },
    });
};
exports.createModule = createModule;
const updateModule = async (id, title, userId, userRole) => {
    const module = await prisma_1.prisma.module.findUnique({ where: { id } });
    if (!module)
        throw new Error("Module not found");
    await (0, course_service_1.verifyCourseOwnership)(module.courseId, userId, userRole);
    return await prisma_1.prisma.module.update({
        where: { id },
        data: { title },
    });
};
exports.updateModule = updateModule;
const deleteModule = async (id, userId, userRole) => {
    const module = await prisma_1.prisma.module.findUnique({ where: { id } });
    if (!module)
        throw new Error("Module not found");
    await (0, course_service_1.verifyCourseOwnership)(module.courseId, userId, userRole);
    return await prisma_1.prisma.module.delete({
        where: { id },
    });
};
exports.deleteModule = deleteModule;
const reorderModules = async (courseId, moduleOrders, userId, userRole) => {
    await (0, course_service_1.verifyCourseOwnership)(courseId, userId, userRole);
    const updates = moduleOrders.map((item) => prisma_1.prisma.module.update({
        where: { id: item.id },
        data: { order: item.order },
    }));
    return await prisma_1.prisma.$transaction(updates);
};
exports.reorderModules = reorderModules;
