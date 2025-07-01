import { NextResponse } from "next/server";
import { verifyStoredOTP } from "@/lib/otp-utils"; // Use our new util

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required." },
        { status: 400 }
      );
    }

    // 1. Verify the code using our secure utility function
    const isValid = await verifyStoredOTP(email, code);

    // 2. Return the result
    if (isValid) {
      return NextResponse.json(
        { message: "Email verified successfully." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid or expired verification code." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("API Error in verify-code:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
