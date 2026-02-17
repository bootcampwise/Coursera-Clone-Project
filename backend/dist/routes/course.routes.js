"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const enrollment_controller_1 = require("../controllers/enrollment.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});
router.get("/", course_controller_1.getAllCourses);
router.get("/search", course_controller_1.getAllCourses);
router.get("/recently-viewed", auth_middleware_1.authMiddleware, course_controller_1.getRecentlyViewed);
router.get("/instructor/my", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)(["instructor", "admin"]), course_controller_1.getInstructorCourses);
router.get("/admin/catalog", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)(["admin"]), course_controller_1.getAdminCourseCatalog);
router.post("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)(["instructor", "admin"]), course_controller_1.createCourse);
router.put("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)(["instructor", "admin"]), course_controller_1.updateCourse);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)(["instructor", "admin"]), course_controller_1.deleteCourse);
router.post("/:id/thumbnail", auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)(["instructor", "admin"]), upload.single("thumbnail"), course_controller_1.uploadCourseThumbnail);
router.get("/:id", course_controller_1.getCourseById);
router.get("/:id/enrollment-status", auth_middleware_1.authMiddleware, enrollment_controller_1.getEnrollmentStatus);
exports.default = router;
