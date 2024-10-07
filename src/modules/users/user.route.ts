import express from "express";
import { UserServices } from "./user.service";
const router = express.Router();

// Route for user registration with image upload
router.post("/create-user", UserServices.upload.single('profileImage'), UserServices.Registration);
router.post("/log-in", UserServices.LogIn);

export const UserRoute = router;