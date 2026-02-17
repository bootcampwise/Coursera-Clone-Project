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
exports.getRecentlyViewed = exports.uploadCourseThumbnail = exports.getAdminCourseCatalog = exports.getInstructorCourses = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getCourseById = exports.getAllCourses = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const courseService = __importStar(require("../services/course.service"));
exports.getAllCourses = (0, asyncHandler_1.default)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { category, difficulty, search, q, status, language } = req.query;
    const filters = {
        category: category,
        difficulty: difficulty,
        search: (search || q),
        status: (status || "Published"),
        language: language,
    };
    const result = await courseService.getAllCourses(page, limit, filters);
    res.json(result);
});
exports.getCourseById = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    res.json(course);
});
exports.createCourse = (0, asyncHandler_1.default)(async (req, res) => {
    const { title, subtitle, description, outcomes, category, difficulty, language, thumbnail, price, status, instructorId: bodyInstructorId, } = req.body;
    const userRole = req.user?.role?.toLowerCase();
    let instructorId;
    if (userRole === "admin") {
        if (!bodyInstructorId) {
            res.status(400).json({ message: "instructorId is required for admin" });
            return;
        }
        instructorId = bodyInstructorId;
    }
    else {
        instructorId = req.user?.id || "";
    }
    if (!instructorId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const course = await courseService.createCourse({
        title,
        subtitle,
        description,
        outcomes,
        category,
        difficulty,
        language,
        thumbnail,
        price: price ? parseFloat(price) : 0,
        instructorId,
        status,
    });
    res.status(201).json(course);
});
exports.updateCourse = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "";
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const course = await courseService.updateCourse(id, userId, userRole, req.body);
    res.json(course);
});
exports.deleteCourse = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "";
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const result = await courseService.deleteCourse(id, userId, userRole);
    res.json(result);
});
exports.getInstructorCourses = (0, asyncHandler_1.default)(async (req, res) => {
    const instructorId = req.user?.id;
    if (!instructorId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const courses = await courseService.getInstructorCourses(instructorId);
    res.json(courses);
});
exports.getAdminCourseCatalog = (0, asyncHandler_1.default)(async (req, res) => {
    const courses = await courseService.getAdminCourses();
    res.json(courses);
});
exports.uploadCourseThumbnail = (0, asyncHandler_1.default)(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || "";
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    if (!req.file) {
        res.status(400).json({ message: "Thumbnail file is required" });
        return;
    }
    await courseService.verifyCourseOwnership(id, userId, userRole);
    const base64 = req.file.buffer.toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
    const updated = await courseService.updateCourseThumbnail(id, dataUrl);
    res.json(updated);
});
exports.getRecentlyViewed = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const courses = await courseService.getRecentlyViewedCourses(userId);
    res.json(courses);
});
