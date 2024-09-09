/* File Handling */

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return;
    // upload the file on cloudinary
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    fs.unlinkSync(localFilePath);
    return res;
  } catch (error) {
    // remove the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
