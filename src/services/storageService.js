import { ImageKit } from "@imagekit/nodejs";

import dotenv from "dotenv";

dotenv.config();


const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadFile(file) {
    const result = await ImageKitClient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "sharyians-complete-backend/music"
    })
    
    return result;
}


export default  uploadFile;