import mongoose from "mongoose";


const musicSchema = new mongoose.Schema({
    uri:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    artist:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    }
});

const MusicModel = mongoose.model("music", musicSchema);

export default MusicModel;