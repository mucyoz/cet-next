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
      subject: "Your Verification Code ",
      text: `Your verification code is: ${otp}`,
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Verification Code</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd; }
        .header h1 { color: #333; margin: 0; }
        .content { padding: 20px 0; }
        .content p { color: #555; font-size: 16px; }
        .otp-code { text-align: center; margin: 20px 0; }
        .otp-code span { display: inline-block; padding: 15px 25px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000; background-color: #f0f2f5; border-radius: 6px; }
        .footer { text-align: center; font-size: 12px; color: #999; padding-top: 20px; border-top: 1px solid #ddd; }
      </style>
    </head>
    <body style="background-color: #f4f7f6; margin: 0; padding: 0;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7f6;">
        <tr>
          <td align="center">
            <div class="container" style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
              <div class="header" style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
                <h1 style="color: #333; margin: 0;">Center of Education Transition</h1>
              </div>
              <div class="content" style="padding: 20px 0;">
                <p style="color: #555; font-size: 16px;">Hello,</p>
                <p style="color: #555; font-size: 16px;">Please use the following verification code to complete your action. The code is valid for 10 minutes.</p>
                <div class="otp-code" style="text-align: center; margin: 20px 0;">
                  <span style="display: inline-block; padding: 15px 25px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000; background-color: #f0f2f5; border-radius: 6px;">${otp}</span>
                </div>
                <p style="color: #555; font-size: 16px;">If you did not request this code, you can safely ignore this email.</p>
                <p style="color: #555; font-size: 16px;">Thanks,<br/>The Center of Education Transition Team</p>
              </div>
              <div class="footer" style="text-align: center; font-size: 12px; color: #999; padding-top: 20px; border-top: 1px solid #ddd;">
                <p>© ${new Date().getFullYear()} Center of Education Transition. All rights reserved.</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>`,
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
