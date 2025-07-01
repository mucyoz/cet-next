import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateOTP, storeOTP } from "@/lib/otp-utils"; // Use our new utils

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    // 1. Generate a new OTP
    const otp = generateOTP();

    // 2. Hash and store it securely
    await storeOTP(email, otp);

    // 3. Send the PLAIN OTP to the user via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is: ${otp}`,
      html: `<p>Your verification code is: <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Verification code sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error in send-verification:", error);
    return NextResponse.json(
      { message: "Failed to send verification email." },
      { status: 500 }
    );
  }
}
