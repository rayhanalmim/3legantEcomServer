"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoute = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post('/initiate', payment_controller_1.PaymentController.initiateSSLPayment);
router.post('/success', payment_controller_1.PaymentController.paymentSuccess);
router.post('/fail', payment_controller_1.PaymentController.paymentFail);
router.post('/cancel', payment_controller_1.PaymentController.paymentCancel);
router.post('/ipn', payment_controller_1.PaymentController.ipn);
exports.PaymentRoute = router;
