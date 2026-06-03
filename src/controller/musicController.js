import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import uploadFile from "../services/storageService.js";
import MusicModel from "../models/musicModel.js";
import albumModel from "../models/albumModel.js";

dotenv.config();

export async function createMusic(req, res) {
  const { title } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No music file provided" });
  }

  const result = await uploadFile(file.buffer.toString("base64"));

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

    const deletedMusic = await MusicModel.findOneAndDelete({_id: musicId });

    if (!deletedMusic) {
      return res.status(404).json({ message: "Music not found." });
    }

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

    const deletedAlbum = await albumModel.findOneAndDelete({_id: albumId });

    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not found." });
    }

    return res.status(200).json({ message: "Album deleted successfully." });
    
  } catch (error) {
    console.error("Delete album error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

export async function getAllMusics(req, res) {

    const musics = await MusicModel
      .find()
      .limit(20)
      .populate("artist", "_id username");

    res.status(200).json({
      message: "Music fetched successfully.",
      musics,
    });
}

export async function getAllAlbums(req, res) {

    const albums = await albumModel.find().select("title artist").populate("artist", "username _id");

    res.status(200).json({
      message: "Albums fetched successfully.",
      albums,
    });
}

export async function getAlbum(req, res) {
    const {albumId} = req.params.albumId;
    const album = await albumModel.findOne({albumId}).populate("artist", "username _id");

    res.status(200).json({
      message: "Album fetched successfully.",
      album,
    });
}


