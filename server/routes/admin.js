import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/auth.js";
import upload from "../config/multer.js";
import { adminLogin,users,owners,block,unblock,ownerBlock,ownerUnblock,addLocation,location,ownerDetails,ownerVerify,userDetails,userVerify} from "../controller/adminController.js";

router.post("/adminLogin", adminLogin);
router.get('/users',verifyToken,users);
router.get('/owners',verifyToken,owners)
router.patch('/block',verifyToken,block)
router.patch('/unblock',verifyToken,unblock)
router.patch('/ownerBlock',verifyToken,ownerBlock)
router.patch('/ownerunblock',verifyToken,ownerUnblock)
router.post('/location',verifyToken,upload.array('image', 1),addLocation)
router.get('/locations',verifyToken,location)
router.get('/ownerDetails',verifyToken,ownerDetails)
router.patch('/verify',verifyToken,ownerVerify)
router.get('/userDetails',verifyToken,userDetails)
router.patch('/userverify',verifyToken,userVerify)



export default router;
