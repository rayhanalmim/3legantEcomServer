import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import axios from "axios";
const prisma = new PrismaClient();

// backend/sslcommerzController.js
const store_id = "your_store_id";
const store_passwd = "your_store_password";
const is_live = false; // Set true if you're using the production server


const initiateSSLPayment = catchAsync(async (req, res) => {
    const paymentData = {
        store_id: store_id,
        store_passwd: store_passwd,
        total_amount: req.body.amount,
        currency: 'BDT',
        tran_id: 'transaction_' + new Date().getTime(), // unique transaction ID
        success_url: 'http://localhost:3000/payment/success',
        fail_url: 'http://localhost:3000/payment/fail',
        cancel_url: 'http://localhost:3000/payment/cancel',
        ipn_url: 'http://localhost:3000/payment/ipn',
        product_name: 'E-commerce Product',
        cus_name: req.body.name,
        cus_email: req.body.email,
        cus_phone: req.body.phone,
        cus_add1: req.body.address,
        cus_city: req.body.city,
    };

    try {
        const sslczResponse = await axios.post(
            `https://${is_live ? 'securepay.sslcommerz.com' : 'sandbox.sslcommerz.com'}/gwprocess/v4/api.php`,
            paymentData
        );
        
        if (sslczResponse.data && sslczResponse.data.GatewayPageURL) {
            // Redirect to the SSLCommerz payment gateway
            res.redirect(sslczResponse.data.GatewayPageURL);
        } else {
            res.status(500).json({ error: 'Failed to initiate payment' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Payment initiation error', details: error });
    }
});

const paymentSuccess = catchAsync(async (req, res) => {
    res.json({ message: 'Payment successful', paymentDetails: req.body });
});
const paymentFail = catchAsync(async (req, res) => {
    res.json({ message: 'Payment failed', paymentDetails: req.body });
});
const paymentCancel = catchAsync(async (req, res) => {
    res.json({ message: 'Payment canceled', paymentDetails: req.body });
});

export const PaymentController = {
    initiateSSLPayment,
    paymentSuccess,
    paymentFail,
    paymentCancel,
};