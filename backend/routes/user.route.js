import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout); //get request kyuki cookie delete krna hai mtlb hum data nahi bhej rahe
router.route("/profile/update").post(isAuthenticated,updateProfile); //to update profile make sure it is  authenticated for that we create middleware 

export default router; //ab iss router ko index.js me import krna hai mtlb vaha bhenjana hai