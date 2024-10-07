import express from "express";
import { ImageController } from "./multiImage.controller";
// import { PaymentController } from "./payment.controller";
const router = express.Router();

router.post('/multiImage', ImageController.uploadMultiImage);


export const MultiImageRoute = router;