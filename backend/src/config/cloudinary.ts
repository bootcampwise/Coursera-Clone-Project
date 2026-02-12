import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Storage Engine
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "coursera-clone/videos",
    resource_type: "auto", // auto detects video/image
    allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov", "avi", "mkv"],
  } as any, // Cast to any to avoid type issues with params
});
