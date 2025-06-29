// test-email.js
const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env.local" }); // Make sure it reads your .env.local

async function runTest() {
  // Check if environment variables are loaded
  if (
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    !process.env.ADMIN_EMAIL
  ) {
    console.error(
      "Error: Missing one or more required environment variables (EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL)."
    );
    return;
  }

  console.log(`Attempting to send email from: ${process.env.EMAIL_USER}`);
  console.log(`Attempting to send email to:   ${process.env.ADMIN_EMAIL}`);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Add this for more detailed logs
    logger: true,
    debug: true,
  });

  const mailOptions = {
    from: `"Test Sender" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "Nodemailer Test Email",
    text: "If you received this email, your Nodemailer configuration is working!",
    html: "<h1>Test Successful</h1><p>If you received this email, your Nodemailer configuration is working!</p>",
  };

  try {
    console.log("Sending test email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

runTest();
