"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstructorReviews = exports.getAllReviews = exports.deleteReview = exports.getCourseReviews = exports.createReview = void 0;
const prisma_1 = require("../config/prisma");
const createReview = async (data) => {
    const course = await prisma_1.prisma.course.findUnique({
        where: { id: data.courseId },
    });
    if (!course)
        throw new Error("Course not found");
    const enrollment = await prisma_1.prisma.enrollment.findFirst({
        where: { userId: data.userId, courseId: data.courseId },
    });
    if (!enrollment) {
        throw new Error("You must be enrolled in the course to leave a review");
    }
    const existingReview = await prisma_1.prisma.review.findFirst({
        where: { userId: data.userId, courseId: data.courseId },
    });
    if (existingReview) {
        throw new Error("You have already reviewed this course");
    }
    if (data.rating < 1 || data.rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    const review = await prisma_1.prisma.review.create({
        data: {
            userId: data.userId,
            courseId: data.courseId,
            rating: data.rating,
            comment: data.comment,
        },
        include: {
            user: {
                select: { id: true, name: true, avatarUrl: true },
            },
        },
    });
    return review;
};
exports.createReview = createReview;
const getCourseReviews = async (courseId) => {
    const reviews = await prisma_1.prisma.review.findMany({
        where: { courseId },
        include: {
            user: {
                select: { id: true, name: true, avatarUrl: true },
            },
        },
        orderBy: { id: "desc" },
    });
    const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    return {
        reviews,
        summary: {
            totalReviews: reviews.length,
            averageRating: parseFloat(averageRating.toFixed(1)),
        },
    };
};
exports.getCourseReviews = getCourseReviews;
const deleteReview = async (reviewId, userId, userRole) => {
    const review = await prisma_1.prisma.review.findUnique({ where: { id: reviewId } });
    if (!review)
        throw new Error("Review not found");
    if (userRole.toLowerCase() !== "admin" && review.userId !== userId) {
        throw new Error("Not authorized to delete this review");
    }
    await prisma_1.prisma.review.delete({ where: { id: reviewId } });
    return { message: "Review deleted successfully" };
};
exports.deleteReview = deleteReview;
const getAllReviews = async () => {
    const reviews = await prisma_1.prisma.review.findMany({
        include: {
            user: { select: { id: true, name: true, avatarUrl: true } },
            course: {
                select: {
                    id: true,
                    title: true,
                    instructor: { select: { id: true, name: true } },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return reviews;
};
exports.getAllReviews = getAllReviews;
const getInstructorReviews = async (instructorId) => {
    const reviews = await prisma_1.prisma.review.findMany({
        where: {
            course: { instructorId },
        },
        include: {
            user: { select: { id: true, name: true, avatarUrl: true } },
            course: {
                select: {
                    id: true,
                    title: true,
                    instructor: { select: { id: true, name: true } },
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    return reviews;
};
exports.getInstructorReviews = getInstructorReviews;
