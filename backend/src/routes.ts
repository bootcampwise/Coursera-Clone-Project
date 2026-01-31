import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.routes";
import enrollmentRoutes from "./routes/enrollment.routes";
import reviewRoutes from "./routes/review.routes";
import analyticsRoutes from "./routes/analytics.routes";
import moduleRoutes from "./routes/module.routes";
import lessonRoutes from "./routes/lesson.routes";

const router = Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/courses", courseRoutes);
router.use("/api/v1/enrollments", enrollmentRoutes);
router.use("/api/v1/reviews", reviewRoutes);
router.use("/api/v1/analytics", analyticsRoutes);
// Curriculum Builder Routes - Mounted at root /api/v1 because individual files define full or sub paths
// moduleRoutes defines /courses/:courseId/modules and /modules/:id
// lessonRoutes defines /modules/:moduleId/lessons and /lessons/:id
router.use("/api/v1", moduleRoutes);
router.use("/api/v1", lessonRoutes);

export default router;
