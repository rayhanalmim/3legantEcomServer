"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const client_1 = require("@prisma/client");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const prisma = new client_1.PrismaClient();
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = "cattl6519ad5ac55ab";
const store_passwd = "cattl6519ad5ac55ab@ssl";
const is_live = false;
const initiateSSLPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.cancelURL);
    const paymentData = {
        store_id: store_id,
        store_passwd: store_passwd,
        total_amount: req.body.amount,
        currency: 'BDT',
        tran_id: 'transaction_' + new Date().getTime(),
        success_url: 'http://localhost:3000/payment/success',
        fail_url: 'http://localhost:3000/payment/fail',
        cancel_url: process.env.cancelURL, // Use environment variable,
        ipn_url: 'http://localhost:3013/api/ipn',
        product_name: 'E-commerce Product',
        cus_name: req.body.name,
        cus_email: req.body.email,
        cus_phone: req.body.phone,
        cus_add1: req.body.address,
        cus_city: req.body.city,
        shipping_method: 'NO',
        product_category: 'Electronic',
        product_profile: 'general',
        // Add this field to encourage web view
        multi_card_name: 'internetbanking,master,visa,amex',
    };
    console.log(paymentData);
    try {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const sslczResponse = yield sslcz.init(paymentData);
        if (sslczResponse.GatewayPageURL) {
            // Redirect to SSLCommerz Gateway URL
            // console.log('Redirecting to Gateway URL:', sslczResponse);
            res.json({ url: sslczResponse.GatewayPageURL, tranId: paymentData.tran_id });
        }
        else {
            res.status(500).json({ error: 'Failed to initiate payment' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Payment initiation error', details: error });
    }
}));
const ipn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ipnData = req.body; // IPN data sent from SSLCommerz
    console.log('hello from ipn');
    try {
        if (ipnData.status === 'VALID') {
            // Handle successful payment
            console.log('Payment success:', ipnData);
        }
        else if (ipnData.status === 'FAILED') {
            // Handle failed payment
            console.log('Payment failed:', ipnData);
        }
        else if (ipnData.status === 'CANCELLED') {
            // Handle canceled payment
            console.log('Payment canceled:', ipnData);
        }
        res.status(200).json({ message: 'IPN received and processed' });
    }
    catch (error) {
        console.error('Error processing IPN:', error);
        res.status(500).json({ error: 'Error processing IPN' });
    }
}));
const paymentSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: 'Payment successful', paymentDetails: req.body });
}));
const paymentFail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: 'Payment failed', paymentDetails: req.body });
}));
const paymentCancel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('payment cancel');
    res.redirect("http://localhost:3000/paymentcancel");
    res.json({ message: 'Payment canceled', paymentDetails: req.body });
}));
exports.PaymentController = {
    initiateSSLPayment,
    paymentSuccess,
    paymentFail,
    paymentCancel,
    ipn
};
