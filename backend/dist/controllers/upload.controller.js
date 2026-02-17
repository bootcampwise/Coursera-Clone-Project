"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
exports.uploadFile = (0, asyncHandler_1.default)(async (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
    }
    let fileUrl = "";
    if (req.file.path && req.file.path.startsWith("http")) {
        fileUrl = req.file.path;
    }
    else {
        fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }
    res.status(200).json({
        message: "File uploaded successfully",
        url: fileUrl,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
    });
});
