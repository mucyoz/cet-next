// /app/api/finalize-application/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { supabase } from "../../../lib/supabase-client"; // NEW: Import our Supabase client
import {
  sendApplicationEmail,
  sendUserConfirmationEmail,
} from "../../../lib/emailService";
// NEW: Import Attachment type
import { Attachment } from "nodemailer/lib/mailer";

// Define the shape of the file object coming from your frontend (now using `path`)
interface SupabaseFile {
  name: string; // Original filename
  path: string; // Path in Supabase storage
}

// --- Environment Variable Checks & Service Initializations ---
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("FATAL: Missing critical environment variable for Stripe.");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

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

    // 3. NEW: Download Files from Supabase to create attachments
    const attachmentsData: Attachment[] = []; // This will be passed to Nodemailer

    if (formData.documents?.files?.length > 0) {
      console.log(
        `Downloading ${formData.documents.files.length} files from Supabase...`
      );

      for (const file of formData.documents.files as SupabaseFile[]) {
        if (!file?.path) {
          console.warn("Skipping file due to missing path:", file);
          continue;
        }

        // Download the file content from the 'documents' bucket
        const { data: blob, error: downloadError } = await supabase.storage
          .from("attachments")
          .download(file.path);

        if (downloadError || !blob) {
          console.error(
            `Failed to download file from Supabase: ${file.path}`,
            downloadError
          );
          // Decide if you want to continue or fail the request
          continue;
        }

        // Convert the downloaded Blob into a Buffer for Nodemailer
        const buffer = Buffer.from(await blob.arrayBuffer());

        attachmentsData.push({
          filename: file.name, // The original user-friendly filename
          content: buffer, // The file content
        });
      }
      console.log(
        `Successfully prepared ${attachmentsData.length} files as attachments.`
      );
    }

    // 4. Send the Admin Notification Email with the attachments
    try {
      await sendApplicationEmail({
        formData: formData,
        paymentDetails: {
          id: paymentIntent.id,
          status: paymentIntent.status,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
        },
        attachments: attachmentsData, // Pass the downloaded file data
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

    // 5. Send the User Confirmation Email
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
      { message: `An unexpected server error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
