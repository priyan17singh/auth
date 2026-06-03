import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required: true
    },
    email:{
        type: String,
        unique:true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['user','artist'],
        default: 'user',
    },
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;