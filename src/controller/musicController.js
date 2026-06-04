import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadFile, uploadToCloudinary } from "../services/storageService.js";
import MusicModel from "../models/musicModel.js";
import albumModel from "../models/albumModel.js";

dotenv.config();

export async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No music file provided" });
  }

  // const result = await uploadFile(req.file.buffer.toString('base64'));
  const result = await uploadToCloudinary(req.file.buffer);
  console.log(typeof(result.url));
  console.log(result.url);
  const music = await MusicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music uploaded successfully.",
    music,
  });
}

export async function deleteMusic(req, res) {
  try {
    const { musicId } = req.params;

    const music = await MusicModel.findById(musicId);
    if (!music) return res.status(404).json({ message: "Music not found." });
    if (music.artist.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own music." });
    }
    await music.deleteOne();

    return res.status(200).json({ message: "Music deleted successfully." });
  } catch (error) {
    console.error("Delete music error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function createAlbum(req, res) {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    musics: musics,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music album created successfully.",
    album,
  });
}

export async function deleteAlbum(req, res) {
  try {
    const { albumId } = req.params;
    const album = await albumModel.findById(albumId);
    if (!album) return res.status(404).json({ message: "Album not found." });
    if (album.artist.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can only delete your own album." });
    }
    await album.deleteOne();

    return res.status(200).json({ message: "Album deleted successfully." });
  } catch (error) {
    console.error("Delete album error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function getAllMusics(req, res) {
  const musics = await MusicModel.find()
    .limit(20)
    .populate("artist", "_id username");

  res.status(200).json({
    message: "Music fetched successfully.",
    musics,
  });
}

export async function getAllAlbums(req, res) {
  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username _id");

  res.status(200).json({
    message: "Albums fetched successfully.",
    albums,
  });
}

export async function getAlbum(req, res) {
  const { albumId } = req.params;
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username _id")
    .populate("musics"); 

  res.status(200).json({
    message: "Album fetched successfully.",
    album,
  });
}
