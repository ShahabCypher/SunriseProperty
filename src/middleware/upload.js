import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { AppError } from "./errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../uploads/properties");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-randomnumber-originalname
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new AppError("Only image files are allowed", 400), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10, // Maximum 10 files
  },
});

// Middleware for single image upload
export const uploadSingle = upload.single("image");

// Middleware for multiple image upload
export const uploadMultiple = upload.array("images", 10);

// Middleware for handling multer errors
export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return next(new AppError("File too large. Maximum size is 5MB", 400));
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return next(new AppError("Too many files. Maximum is 10 files", 400));
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return next(new AppError("Unexpected field name", 400));
    }
  }
  next(error);
};

// Utility function to delete image from local storage
export const deleteFromLocal = async (filename) => {
  try {
    const filePath = path.join(uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return { result: "ok" };
  } catch (error) {
    console.error("Error deleting local file:", error);
    throw new AppError("Failed to delete image", 500);
  }
};

// Utility function to get image URL
export const getImageUrl = (filename) => {
  return `/uploads/properties/${filename}`;
};

// Utility function to get full image path
export const getImagePath = (filename) => {
  return path.join(uploadsDir, filename);
};

// Utility function to ensure uploads directory exists
export const ensureUploadsDir = () => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};
