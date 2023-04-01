import express from "express";
import {LoginPost, Register,Cars} from "../controller/usersController.js";
// import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", Register);
router.post("/login", LoginPost);
router.get("/cars", Cars);

export default router;
