import upload from "../config/multer.js";
import express from "express";
import {  LoginPost, Register,Cars,addCar,Profile,UpdateProfile,Locations,Booking,changeStatus} from "../controller/ownerController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", LoginPost);
router.get("/cars",verifyToken, Cars);
router.post('/addCar',verifyToken,upload.array('image', 4),addCar)
router.get('/profile',verifyToken,Profile)
router.post('/profile',verifyToken,upload.array('image', 2),UpdateProfile)
router.get('/locations',verifyToken,Locations)
router.get('/bookings',verifyToken,Booking)
router.patch('/changestatus',verifyToken,changeStatus)

export default router;
