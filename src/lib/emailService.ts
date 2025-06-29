// lib/emailService.ts

import nodemailer, { SendMailOptions } from "nodemailer";
import * as z from "zod";
import {
  personalInfoSchema,
  educationSchema,
  documentsSchema,
  packageSelectionSchema,
} from "@/lib/schemas";

// --- Type Definitions (No Changes Needed) ---
type PersonalInfo = z.infer<typeof personalInfoSchema>;
type EducationData = z.infer<typeof educationSchema>;
type SelectedPackageData = z.infer<typeof packageSelectionSchema>;

interface ApplicationFormData {
  personalInfo: PersonalInfo;
  education: EducationData;
  documents: z.infer<typeof documentsSchema>;
  selectedPackage: SelectedPackageData;
}

interface PaymentDetails {
  id: string;
  status: string;
  amount: number;
  currency: string;
}

interface SendEmailParams {
  formData: ApplicationFormData;
  paymentDetails: PaymentDetails;
  attachments: any[];
}

// --- Nodemailer Transporter (No Changes Needed) ---
if (
  !process.env.EMAIL_HOST ||
  !process.env.EMAIL_PORT ||
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS
) {
  throw new Error("Missing required email environment variables.");
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- UPDATED: sendApplicationEmail function ---
export async function sendApplicationEmail({
  formData,
  paymentDetails,
  attachments,
}: SendEmailParams): Promise<void> {
  const { personalInfo, education, documents, selectedPackage } = formData;

  // --- REBUILD THE FULL HTML CONTENT ---

  // 1. Format Education History
  const educationHtml = education.educationHistory
    .map(
      (edu) => `
    <li style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
      <strong>Institution:</strong> ${edu.institution}, ${edu.country}<br>
      <strong>Degree:</strong> ${edu.degreeType} in ${edu.fieldOfStudy}<br>
      <strong>Period:</strong> ${edu.startYear} - ${edu.endYear}<br>
      ${edu.gpa ? `<strong>GPA:</strong> ${edu.gpa}` : ""}
    </li>
  `
    )
    .join("");

  // 2. The main email body with all sections
  const emailHtml = `
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h1 style="color: #0056b3; font-size: 24px;">New Credential Evaluation Application</h1>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        
        <h2 style="color: #0056b3;">1. Personal Information</h2>
        <ul>
          <li><strong>Name:</strong> ${personalInfo.firstName} ${
    personalInfo.lastName
  }</li>
          <li><strong>Email:</strong> <a href="mailto:${personalInfo.email}">${
    personalInfo.email
  }</a></li>
          <li><strong>Phone:</strong> ${personalInfo.phone}</li>
          <li><strong>Address:</strong> ${personalInfo.address}, ${
    personalInfo.city
  }, ${personalInfo.state || ""} ${personalInfo.zipCode}</li>
          <li><strong>Country of Origin:</strong> ${personalInfo.country}</li>
        </ul>

        <h2 style="color: #0056b3;">2. Education History</h2>
        <ul>
          ${educationHtml || "<li>No education history provided.</li>"}
        </ul>

        <h2 style="color: #0056b3;">3. Package Selection</h2>
        <ul>
          <li><strong>Package:</strong> ${selectedPackage.name}</li>
          <li><strong>Price:</strong> $${selectedPackage.price.toFixed(2)}</li>
          <li><strong>Processing Time:</strong> ${
            selectedPackage.processingTime
          }</li>
        </ul>

        <h2 style="color: #0056b3;">4. Payment Confirmation</h2>
        <ul style="list-style-type: none; padding: 0;">
            <li style="background: #f0f8ff; padding: 10px; border-radius: 5px;">
                <strong>Status:</strong> <span style="color: green; font-weight: bold;">${
                  paymentDetails.status
                }</span><br>
                <strong>Transaction ID:</strong> ${paymentDetails.id}<br>
                <strong>Amount Paid:</strong> $${(
                  paymentDetails.amount / 100
                ).toFixed(2)} ${paymentDetails.currency.toUpperCase()}
            </li>
        </ul>

        <h2 style="color: #0056b3;">5. Documents</h2>
        <p>The following documents are attached to this email for download.</p>
        <ul>
          ${
            documents.files.map((doc) => `<li>${doc.name}</li>`).join("") ||
            "<li>No documents were uploaded.</li>"
          }
        </ul>
      </div>
    </body>
  `;

  // 3. The mail options object, now with the full HTML and correct attachments
  const mailOptions: SendMailOptions = {
    from: `"${personalInfo.firstName} ${personalInfo.lastName}" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: personalInfo.email,
    subject: `New Application: ${personalInfo.firstName} ${personalInfo.lastName}`,
    html: emailHtml, // Use the full HTML body we just created
    attachments: attachments, // This is what actually attaches the files
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Application email sent for ${personalInfo.email} and routed to admin.`
    );
  } catch (error) {
    console.error("Failed to send application email:", error);
    throw new Error("Could not send the application email.");
  }
}

// --- sendUserConfirmationEmail function (No Changes Needed, but showing for completeness) ---
export async function sendUserConfirmationEmail({
  formData,
}: SendEmailParams): Promise<void> {
  const { personalInfo, selectedPackage } = formData;

  const emailHtml = `
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h1 style="color: #0056b3;">Thank You, ${personalInfo.firstName}!</h1>
        <p>We have successfully received your application for the <strong>${selectedPackage.name}</strong> package.</p>
        <p>Your application is now in review. We will process it within the estimated timeframe of ${selectedPackage.processingTime}.</p>
      </div>
    </body>
  `;

  const mailOptions: SendMailOptions = {
    from: `"[Your Company Name]" <${process.env.EMAIL_USER}>`,
    to: personalInfo.email,
    replyTo: process.env.ADMIN_EMAIL,
    subject: "We've Received Your Application!",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(
      `Confirmation email sent successfully to: ${personalInfo.email}`
    );
  } catch (error) {
    console.error(
      `Failed to send confirmation email to ${personalInfo.email}:`,
      error
    );
  }
}
