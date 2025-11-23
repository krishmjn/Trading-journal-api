import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "@config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file: any) => {
    const format = file.mimetype.split("/")[1];
    return {
      folder: "trade_journal",
      format:
        format === "vnd.openxmlformats-officedocument.wordprocessingml.document"
          ? "docx"
          : format,
      public_id: `trade_${Date.now()}`,
      resource_type: "auto", // important for PDFs and docs
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPG, PNG, PDF, and DOCX files are allowed."
        )
      );
    }
  },
});

export default upload;
