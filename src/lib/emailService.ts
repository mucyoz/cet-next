// lib/emailService.ts

import nodemailer from "nodemailer";

// --- Type Definitions ---
// Defines the shape of the data passed to our email functions.
// `documentLinks` is now the key property for the admin email.
interface EmailParams {
  formData: any; // Replace 'any' with a more specific type if you have one for your form data
  paymentDetails: any; // Replace 'any' with a more specific type for payment details
  documentLinks?: { name: string; url: string }[]; // This is optional as the user email won't have it
}

// --- Nodemailer Transporter Setup ---
// This configures the connection to your email server.
// All sensitive data should come from your environment variables (.env.local).
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: process.env.EMAIL_SERVER_PORT === "465", // `true` for port 465, `false` for others like 587
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  // Adding timeouts is a good practice to prevent hanging requests, even for small emails.
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000, // 10 seconds
  socketTimeout: 10000, // 10 seconds
});

/**
 * Sends the main application notification email to the admin.
 * This email contains links to the uploaded documents instead of attachments.
 * @param {EmailParams} params - The email parameters, including form data and document links.
 */
export async function sendApplicationEmail({
  formData,
  paymentDetails,
  documentLinks,
}: EmailParams) {
  // 1. Dynamically generate the HTML for the list of document links.
  let documentsHtmlSection =
    "<p>No documents were uploaded with this application.</p>";

  if (documentLinks && documentLinks.length > 0) {
    documentsHtmlSection = `
      <h3>Uploaded Documents (${documentLinks.length})</h3>
      <p><em>Note: These are secure download links that will expire in 7 days.</em></p>
      <ul>
        ${documentLinks
          .map(
            (doc) =>
              `<li><a href="${doc.url}" target="_blank" rel="noopener noreferrer">${doc.name}</a></li>`
          )
          .join("")}
      </ul>
    `;
  }

  // 2. Construct the full HTML body for the email.
  const emailHtml = `
    <html>
      <body style="font-family: sans-serif; line-height: 1.6;">
        <h1>New Application Received</h1>
        <p>A new application has been submitted and paid for. Please review the details below.</p>
        
        <h2>Applicant Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${formData.personalInfo.firstName} ${
    formData.personalInfo.lastName
  }</li>
          <li><strong>Email:</strong> ${formData.personalInfo.email}</li>
          <li><strong>Phone:</strong> ${formData.personalInfo.phone}</li>
        </ul>

        <h2>Payment Details:</h2>
        <ul>
          <li><strong>Transaction ID:</strong> ${paymentDetails.id}</li>
          <li><strong>Amount:</strong> ${(paymentDetails.amount / 100).toFixed(
            2
          )} ${paymentDetails.currency.toUpperCase()}</li>
          <li><strong>Status:</strong> ${paymentDetails.status}</li>
        </ul>
        <hr>
        
        ${documentsHtmlSection}
        
        <hr>
        <p>Please review the full application in your admin dashboard.</p>
      </body>
    </html>
  `;

  // 3. Send the email using the configured transporter.
  try {
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_FROM}>`, // e.g., "My App <noreply@myapp.com>"
      to: process.env.ADMIN_EMAIL!,
      subject: `New Application from ${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`,
      html: emailHtml,
      // NOTE: The 'attachments' property is intentionally omitted.
    });

    console.log(
      "Admin notification email with links sent successfully via Nodemailer."
    );
  } catch (error) {
    console.error("Failed to send application email:", error);
    // This error will be caught by the API route that called this function.
    throw new Error("Could not send the application email.");
  }
}

/**
 * Sends a confirmation email to the user after they submit their application.
 * @param {EmailParams} params - The email parameters, primarily for user details.
 */
export async function sendUserConfirmationEmail({
  formData,
  paymentDetails,
}: EmailParams) {
  const emailHtml = `
    <html>
      <body style="font-family: sans-serif; line-height: 1.6;">
        <h1>Thank You for Your Application!</h1>
        <p>Hi ${formData.personalInfo.firstName},</p>
        <p>We have successfully received your application and payment. Your transaction ID is <strong>${paymentDetails.id}</strong>.</p>
        <p>Our team will review your submission and get back to you shortly. You can expect an update within the processing time for the package you selected.</p>
        <p>Thank you for choosing us.</p>
        <br>
        <p>Sincerely,</p>
        <p>The Team at Your App Name</p>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_FROM}>`,
      to: formData.personalInfo.email, // Send to the applicant
      subject: "Your Application has been Received!",
      html: emailHtml,
    });

    console.log(
      `User confirmation email sent successfully to ${formData.personalInfo.email}.`
    );
  } catch (error) {
    // It's often acceptable to just log an error for the user confirmation
    // without failing the entire API request.
    console.warn(
      `Failed to send user confirmation email to ${formData.personalInfo.email}:`,
      error
    );
  }
}
