import { ImageKit } from "@imagekit/nodejs";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { promisify } from 'util';
import dotenv from "dotenv";

dotenv.config();

const ImageKitClient = new ImageKit({
    publicKey: process.env['IMAGEKIT_PUBLIC_KEY'],
    privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
    urlEndpoint: process.env['IMAGEKIT_URL_ENDPOINT'],
    fetchOptions: {
        timeout: 600000 // FIX: Extends request timeout to 10 minutes for slow network audio buffers
    }
});

export async function uploadFile(file) {
    // If 'file' comes from multer.memoryStorage(), its data payload sits inside file.buffer
    const fileData = file.buffer ? file.buffer : file;

    const result = await ImageKitClient.files.upload({
        file: fileData, 
        fileName: "music_" + Date.now() + (file.originalname ? "_" + file.originalname : ".mp3"),
        folder: "sharyians-complete-backend/music"
    });
    
    return result;
}

export default uploadFile;

// Initialize Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

export async function uploadToCloudinary(fileBuffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id: `music_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        format: 'mp3',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result.secure_url });
      }
    );
    uploadStream.end(fileBuffer);
  });
}