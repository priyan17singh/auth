import express from "express";
import {registerUser, loginUser, logOutUser, getProfile} from "../controller/authController.js"
import { userM } from "../middlewares/auth.muddleware.js";


const router = express.Router();

router.get("/profile", userM, getProfile);
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logOutUser);


export default router;