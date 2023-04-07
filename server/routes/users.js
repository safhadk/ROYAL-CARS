import express from "express";
import {LoginPost, Register,Cars,Search,CreateOrder,VerifyPayment} from "../controller/usersController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", LoginPost);
router.get("/cars", Cars);
router.post('/search',Search)
router.post('/createOrder',verifyToken,CreateOrder)
router.post('/verifyPayment',verifyToken,VerifyPayment)

export default router;
