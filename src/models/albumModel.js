import mongoose from "mongoose";


const albumSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    musics:[{
        type: mongoose.Schema.ObjectId,
        ref:"music",
        required: true
    }],
    artist:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    }
});

const albumModel = mongoose.model("album", albumSchema);

export default albumModel;