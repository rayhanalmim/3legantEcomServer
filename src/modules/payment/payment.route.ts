import express from "express";
import { PaymentController } from "./payment.controller";
const router = express.Router();

router.post('/initiate', PaymentController.initiateSSLPayment);
router.post('/success', PaymentController.paymentSuccess);
router.post('/fail', PaymentController.paymentFail);
router.post('/cancel', PaymentController.paymentCancel);
router.post('/ipn', PaymentController.ipn);

export const PaymentRoute = router;