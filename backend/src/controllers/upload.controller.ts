import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  // Construct URL
  // Assuming the server serves 'uploads' folder at /uploads route
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({
    message: "File uploaded successfully",
    url: fileUrl,
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    size: req.file.size,
  });
});
