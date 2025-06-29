// /app/api/finalize-application/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
// Import BOTH functions from your email service
import {
  sendApplicationEmail,
  sendUserConfirmationEmail,
} from "../../../lib/emailService";

// --- Environment Variable Checks & Stripe Initialization ---
// This check runs when the serverless function starts up.
if (!process.env.STRIPE_SECRET_KEY || !process.env.EMAIL_USER) {
  // This error will be logged on the server if Vercel env vars are missing.
  console.error(
    "FATAL: Missing critical environment variables (Stripe or Email)."
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

// --- Main API Handler ---
export async function POST(request: NextRequest) {
  try {
    // Ensure the Stripe key is actually available at runtime
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        "Stripe secret key is not available on the server environment."
      );
    }

    const body = await request.json();
    const { paymentIntentId, formData } = body;

    // 1. Basic Validation
    if (!paymentIntentId || !formData) {
      return NextResponse.json(
        { message: "Missing paymentIntentId or formData" },
        { status: 400 }
      );
    }

    // --- 2. Verify Payment with Stripe ---
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { message: `Payment not successful. Status: ${paymentIntent.status}` },
        { status: 402 }
      );
    }

    // --- 3. Pre-fetch Attachment Content from Cloudinary ---
    const attachmentsWithContent = [];
    if (
      formData.documents &&
      formData.documents.files &&
      formData.documents.files.length > 0
    ) {
      console.log("Fetching attachments from Cloudinary...");
      for (const file of formData.documents.files) {
        // Ensure the file object and its path are valid before fetching
        if (file && file.path) {
          try {
            // Fetch the file from the Cloudinary URL
            const response = await fetch(file.path);
            if (!response.ok) {
              // Log the error but don't stop the whole process for one failed file
              console.error(
                `Failed to fetch attachment ${file.name} from cloud storage. Status: ${response.status}`
              );
              continue; // Skip this file and try the next one
            }

            // Get the file content as a raw Buffer
            const content = Buffer.from(await response.arrayBuffer());

            // Add the prepared attachment object to our array
            attachmentsWithContent.push({
              filename: file.name,
              content: content, // This is the raw file data
              contentType:
                response.headers.get("content-type") ||
                "application/octet-stream",
            });
          } catch (fetchError) {
            console.error(
              `Could not process attachment: ${file.name}`,
              fetchError
            );
          }
        }
      }
      // This log is crucial for debugging
      console.log(
        `Successfully prepared ${attachmentsWithContent.length} attachments.`
      );
    }

    // --- 4. Send the CRITICAL Admin Notification Email ---
    try {
      await sendApplicationEmail({
        formData: formData,
        paymentDetails: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        },
        // Pass the array of attachments that now contains the file content
        attachments: attachmentsWithContent,
      });
    } catch (adminEmailError: any) {
      // If this specific step fails, we stop and return a detailed error
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

    // --- 5. Send the User Confirmation Email ---
    // This is a "fire-and-forget" call; we don't stop the process if it fails.
    // The function itself will log any errors.
    await sendUserConfirmationEmail({
      formData: formData,
      paymentDetails: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      },
      // We don't send attachments to the user
      attachments: [],
    });

    // --- 6. Return Final Success Response to the Frontend ---
    return NextResponse.json(
      { success: true, message: "Application finalized successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    // This is the main catch-all for other unexpected errors.
    console.error("Finalization API Error:", error);
    return NextResponse.json(
      { message: `An unexpected server error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
