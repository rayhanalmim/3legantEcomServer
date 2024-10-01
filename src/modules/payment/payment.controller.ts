import { PrismaClient } from "@prisma/client";
import catchAsync from "../../utils/catchAsync";
const prisma = new PrismaClient();
const SSLCommerzPayment = require('sslcommerz-lts'); // Use appropriate SSLCommerz package 

// backend/sslcommerzController.js
const store_id = "cattl6519ad5ac55ab";
const store_passwd = "cattl6519ad5ac55ab@ssl";
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
        cancel_url: `http://localhost:3000//checkout`,
        ipn_url: 'http://localhost:3000/payment/ipn',
        product_name: 'E-commerce Product',
        cus_name: req.body.name,
        cus_email: req.body.email,
        cus_phone: req.body.phone,
        cus_add1: req.body.address,
        cus_city: req.body.city,

        // Add shipping_method field
        shipping_method: 'NO', // or 'Courier', 'Air', etc., based on your use case
        product_category: 'Electronic',
        product_profile: 'general',

        // Add this field to encourage web view
        multi_card_name: 'internetbanking,master,visa,amex',

    };

    try {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const sslczResponse = await sslcz.init(paymentData);

        console.log(sslczResponse);

        if (sslczResponse.GatewayPageURL) {
            // Redirect to SSLCommerz Gateway URL
            res.json({ url: sslczResponse.GatewayPageURL });

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