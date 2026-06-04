import express from "express";
import {createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbum, deleteAlbum, deleteMusic, } from "../controller/musicController.js"
import authArtist from "../middlewares/auth.muddleware.js";
import multer from "multer";

const upload = multer({
    storage:multer.memoryStorage()
});

const router = express.Router();

router.get("/",getAllMusics);
router.post("/upload", authArtist, upload.single('music'), createMusic);
router.delete("/:musicId", authArtist, deleteMusic);

router.get("/albums",getAllAlbums);
router.get("/albums/:albumId",getAlbum);
router.post("/album", authArtist, createAlbum);
router.delete("/album/:albumId", authArtist, deleteAlbum);


export default router;