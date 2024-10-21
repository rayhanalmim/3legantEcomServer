import { PrismaClient } from "@prisma/client";
import catchAsync from "../../utils/catchAsync";
const Stripe = require('stripe');
const prisma = new PrismaClient();

// Replace with your Stripe Secret Key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payment = catchAsync(async (req, res) => {
    const { email, paymentMethodId } = req.body;

  try {
    // Create a new customer in Stripe
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email: email,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create the subscription with a 7-day trial
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID }], // Replace with your actual price ID
      trial_period_days: 7, // Set the trial period for 7 days
      expand: ['latest_invoice.payment_intent'], // Expand to get the payment intent for status
    });

    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    const errorMessage = (error as any).message;
    res.status(400).json({ error: { message: errorMessage } });
  }
});


export const StripeController = {
    payment
};