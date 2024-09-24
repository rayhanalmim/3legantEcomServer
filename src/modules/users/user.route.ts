import express from "express";
import { UserServices } from "./user.service";
const router = express.Router();

router.post("/create-user", UserServices.Registration);
router.post("/log-in", UserServices.LogIn);

export const UserRoute = router;