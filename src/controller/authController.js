import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import dotenv from "dotenv";

dotenv.config();

const SALT = 10;

export async function registerUser(req, res){
    const {username, email, password, role = 'user'} = req.body;

    
    const isUserExist = await UserModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });
    if(isUserExist){
        return res.status(409).json({message:"User already exist "});
    }
 
    const hash = await bcrypt.hash(password,SALT);

    const user = await UserModel.create({
        username,
        email,
        password: hash,
        role});
    const token = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET);
 
    res.cookie("token", token);

    res.status(201).json({
        message:"User registered successfully.",
        user
    })
}


export async function loginUser(req, res){
    const {username, email, password} = req.body;

    const User = await UserModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });
    if(!User){
        res.status(409).json({message:"User does not exist."});
    }
    const isPasswordValid = await bcrypt.compare(password, User.password,)

    if(!User){
        res.status(401).json({message:"Invalid Credentials."});
    }
    const token = jwt.sign({
        id: User._id,
        role: User.role,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message:"User Login successfull.",
        User
    });
}

export async function logOutUser(req, res){
    res.clearCookie("token");
    res.status(200).json({message:"User Loged Out successfull.",});
}

