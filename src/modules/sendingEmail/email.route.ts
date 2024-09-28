import express from "express";
import { EmailController } from "./email.controller";
// import { ProductsController } from "./product.service";
const router = express.Router();

router.post("/contract-sms-send", EmailController.sendContractSms);

export const EmailRoute = router;