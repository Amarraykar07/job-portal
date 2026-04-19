import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory instead of disk
export const singleUpload = multer({ storage }).single("file");