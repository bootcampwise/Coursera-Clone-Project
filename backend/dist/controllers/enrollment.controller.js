"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonProgress = exports.getStudentCourseProgress = exports.getEnrollmentStatus = exports.getCourseEnrollments = exports.updateProgress = exports.getUserEnrollments = exports.enrollUser = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const enrollmentService = __importStar(require("../services/enrollment.service"));
exports.enrollUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const enrollment = await enrollmentService.enrollUser(userId, courseId);
    res.status(201).json(enrollment);
});
exports.getUserEnrollments = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const enrollments = await enrollmentService.getUserEnrollments(userId);
    res.json(enrollments);
});
exports.updateProgress = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { progress, completed } = req.body;
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const updatedEnrollment = await enrollmentService.updateProgress(id, userId, progress, completed);
    res.json(updatedEnrollment);
});
exports.getCourseEnrollments = (0, asyncHandler_1.default)(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "";
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const enrollments = await enrollmentService.getCourseEnrollments(courseId, userId, userRole);
    res.json(enrollments);
});
exports.getEnrollmentStatus = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const status = await enrollmentService.getEnrollmentStatus(userId, id);
    res.json(status);
});
exports.getStudentCourseProgress = (0, asyncHandler_1.default)(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const progress = await enrollmentService.getStudentCourseProgress(userId, courseId);
    res.json(progress);
});
exports.updateLessonProgress = (0, asyncHandler_1.default)(async (req, res) => {
    const { enrollmentId, lessonId } = req.params;
    const { completed, lastPlayed, passed, forceComplete, score } = req.body;
    const normalizedScore = typeof score === "string" ? Number(score) : score;
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const updatedProgress = await enrollmentService.updateLessonProgress(userId, enrollmentId, lessonId, {
        completed,
        lastPlayed,
        passed,
        forceComplete,
        score: Number.isFinite(normalizedScore) ? normalizedScore : undefined,
    });
    res.json(updatedProgress);
});
