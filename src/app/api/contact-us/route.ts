import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as z from "zod";

// Zod schema for input validation on the server
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = contactSchema.parse(body);

    // 1. Create a Nodemailer transporter
    // It's recommended to use environment variables for security
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // 2. Define the email options
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`, // sender address
      to: process.env.ADMIN_EMAIL, // list of receivers
      subject: `New Contact Form Submission from ${name}`, // Subject line
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Thank you! Your message has been sent." },
      { status: 200 }
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid form data.", errors: error.errors },
        { status: 400 }
      );
    }
    // Handle other errors
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while sending the email." },
      { status: 500 }
    );
  }
}
