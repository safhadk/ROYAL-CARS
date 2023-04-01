import upload from "../config/multer.js";
import express from "express";
import {  LoginPost, Register,Cars,addCar } from "../controller/ownerController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", LoginPost);
router.get("/cars",verifyToken, Cars);
router.post('/addCar',verifyToken,upload.array('image', 4),addCar)

export default router;
