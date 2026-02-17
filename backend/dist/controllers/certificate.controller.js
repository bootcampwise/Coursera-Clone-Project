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
exports.getCertificateHtml = exports.downloadCertificate = exports.verifyCertificate = exports.getCertificateById = exports.getMyCertificates = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const certificateService = __importStar(require("../services/certificate.service"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.getMyCertificates = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const certificates = await certificateService.getMyCertificates(userId);
    res.json(certificates);
});
exports.getCertificateById = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const certificate = await certificateService.getCertificateById(id, userId);
    res.json(certificate);
});
exports.verifyCertificate = (0, asyncHandler_1.default)(async (req, res) => {
    const { code } = req.params;
    const certificate = await certificateService.verifyCertificate(code);
    res.json(certificate);
});
exports.downloadCertificate = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const cert = await certificateService.getCertificateById(id, userId);
    if (!cert.pdfUrl) {
        res.status(404).json({ message: "Certificate file not found" });
        return;
    }
    const filePath = path_1.default.join(__dirname, "../../", cert.pdfUrl.replace(/^\/+/, ""));
    if (!fs_1.default.existsSync(filePath)) {
        res.status(404).json({ message: "Certificate file not found" });
        return;
    }
    res.sendFile(filePath);
});
exports.getCertificateHtml = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user?.id;
    const { id } = req.params;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const html = await certificateService.getCertificateHtml(id, userId);
    res.send(html);
});
