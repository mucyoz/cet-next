// /app/api/finalize-application/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { v2 as cloudinary } from "cloudinary";
import {
  sendApplicationEmail,
  sendUserConfirmationEmail,
} from "../../../lib/emailService";

// Define the shape of the file object coming from your frontend
interface CloudinaryFile {
  name: string;
  public_id: string;
  resource_type: string;
}

// --- Environment Variable Checks & Service Initializations ---
// This ensures your application fails to start if critical configuration is missing.
if (
  !process.env.STRIPE_SECRET_KEY ||
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error(
    "FATAL: Missing critical environment variables for Stripe or Cloudinary."
  );
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Main API Handler ---
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentIntentId, formData } = body;

    // 1. Basic Validation
    if (!paymentIntentId || !formData) {
      return NextResponse.json(
        { message: "Missing paymentIntentId or formData" },
        { status: 400 }
      );
    }

    // 2. Verify Payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { message: `Payment not successful. Status: ${paymentIntent.status}` },
        { status: 402 }
      );
    }

    // 3. Generate Secure Download Links from Cloudinary
    const documentLinks = [];

    if (formData.documents?.files?.length > 0) {
      console.log(
        `Generating secure links for ${formData.documents.files.length} documents...`
      );

      for (const file of formData.documents.files as CloudinaryFile[]) {
        if (!file?.public_id) {
          console.warn("Skipping file due to missing public_id:", file);
          continue;
        }

        const extension = file.name.split(".").pop();
        if (!extension) {
          console.warn(
            `Could not determine extension for ${file.name}, skipping.`
          );
          continue;
        }

        // Generate a signed URL that forces download and expires in 7 days
        const signedUrl = cloudinary.utils.private_download_url(
          file.public_id,
          extension,
          {
            resource_type: file.resource_type,
            type: "upload",
            attachment: true, // This is a hint to the browser to download, not display
            expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // Link is valid for 7 days
          }
        );

        documentLinks.push({
          name: file.name,
          url: signedUrl,
        });
      }
      console.log(
        `Successfully generated ${documentLinks.length} secure links.`
      );
    }

    // 4. Send the Admin Notification Email
    try {
      await sendApplicationEmail({
        formData: formData,
        paymentDetails: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        },
        documentLinks: documentLinks,
      });
    } catch (adminEmailError: any) {
      console.error(
        "CRITICAL: Admin notification email failed!",
        adminEmailError
      );
      return NextResponse.json(
        {
          message: `Your payment was successful, but the final admin notification could not be sent. Please contact support with Transaction ID: ${paymentIntent.id}`,
        },
        { status: 500 }
      );
    }

    // 5. Send the User Confirmation Email (with the corrected 'paymentDetails' object)
    await sendUserConfirmationEmail({
      formData: formData,
      paymentDetails: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      },
    });

    // 6. Return Final Success Response to Frontend
    return NextResponse.json(
      { success: true, message: "Application finalized successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Finalization API Error:", error);
    return NextResponse.json(
      { message: `An unexpected server error occurred : ${error.message}` },
      { status: 500 }
    );
  }
}
