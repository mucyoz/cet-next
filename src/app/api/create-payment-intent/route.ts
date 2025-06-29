// src/app/api/create-payment-intent/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    // Validate the amount
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount provided." },
        { status: 400 }
      );
    }

    // IMPORTANT: Stripe expects the amount in the smallest currency unit (e.g., cents for USD)
    // So, we multiply the dollar amount by 100.
    const amountInCents = Math.round(amount * 100);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      // In the latest version of the API, specifying the `automatic_payment_methods`
      // parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the client secret to the frontend
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Stripe API Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
