import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  let fileUrl = "";

  // Check if it's Cloudinary upload (req.file.path is HTTP URL) or Local (path is filesystem path)
  if (req.file.path && req.file.path.startsWith("http")) {
    fileUrl = req.file.path;
  } else {
    // Local URL construction
    fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  }

  res.status(200).json({
    message: "File uploaded successfully",
    url: fileUrl,
    filename: req.file.filename, // Cloudinary uses public_id usually, but let's keep consistency
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});
