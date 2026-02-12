import { Router } from "express";
import {
  getMyCertificates,
  getCertificateById,
  verifyCertificate,
  downloadCertificate,
  getCertificateHtml,
} from "../controllers/certificate.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/my", authMiddleware, getMyCertificates);
router.get("/verify/:code", verifyCertificate);
router.get("/:id/download", authMiddleware, downloadCertificate);
router.get("/:id/html", authMiddleware, getCertificateHtml);
router.get("/:id", authMiddleware, getCertificateById);

export default router;
