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
// This is the updated function for your lib/emailService.ts file

export async function sendApplicationEmail({
  formData,
  paymentDetails,
  documentLinks,
}: EmailParams) {
  // Destructure for easier access to all parts of the form data
  const { personalInfo, education, selectedPackage } = formData;

  // --- 1. Generate HTML for each section based on the schema ---

  // Personal Information Section (including optional 'state')
  const personalInfoHtml = `
    <h2 style="color: #0056b3;">1. Personal Information</h2>
    <ul>
      <li><strong>Name:</strong> ${personalInfo.firstName} ${
    personalInfo.lastName
  }</li>
      <li><strong>Email:</strong> <a href="mailto:${personalInfo.email}">${
    personalInfo.email
  }</a></li>
      <li><strong>Phone:</strong> ${personalInfo.phone}</li>
      <li><strong>Country of Origin:</strong> ${personalInfo.country}</li>
      <li><strong>Address:</strong> ${personalInfo.address}, ${
    personalInfo.city
  }, ${personalInfo.state || "N/A"}, ${personalInfo.zipCode}</li>
    </ul>
  `;

  // Education History Section (loops through array and handles optional 'gpa')
  const educationHtml = `
    <h2 style="color: #0056b3;">2. Education History</h2>
    <ul>
      ${
        education.educationHistory
          .map(
            (edu: any) => `
        <li style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">
          <strong>Institution:</strong> ${edu.institution}, ${edu.country}<br>
          <strong>Degree:</strong> ${edu.degreeType} in ${edu.fieldOfStudy}<br>
          <strong>Period:</strong> ${edu.startYear} - ${edu.endYear}<br>
          ${
            edu.gpa
              ? `<strong>GPA:</strong> ${edu.gpa}`
              : "<strong>GPA:</strong> Not Provided"
          }
        </li>
      `
          )
          .join("") || "<li>No education history was provided.</li>"
      }
    </ul>
  `;

  // Package Selection Section (includes all details from the schema)
  const packageHtml = `
    <h2 style="color: #0056b3;">3. Package Selection</h2>
    <ul>
      <li><strong>Package Name:</strong> ${selectedPackage.name}</li>
      <li><strong>Price:</strong> $${selectedPackage.price.toFixed(2)}</li>
      <li><strong>Processing Time:</strong> ${
        selectedPackage.processingTime
      }</li>
      <li><strong>Package Features:</strong>
        <ul>${selectedPackage.features
          .map((feature: string) => `<li>${feature}</li>`)
          .join("")}</ul>
      </li>
    </ul>
  `;

  // Payment Confirmation Section
  const paymentHtml = `
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
  `;

  // Documents Section (using secure links)
  const documentsHtml = `
    <h2 style="color: #0056b3;">5. Documents (Secure Download Links)</h2>
    <p>The following documents are available for secure download for the next 30 days.</p>
    <ul>
      ${
        documentLinks && documentLinks.length > 0
          ? documentLinks
              .map(
                (doc) =>
                  `<li><a href="${doc.url}" style="color: #0056b3;">${doc.name}</a></li>`
              )
              .join("")
          : "<li>No documents were uploaded.</li>"
      }
    </ul>
  `;

  // --- 2. Assemble the final email body ---
  const emailHtml = `
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h1 style="color: #0056b3; font-size: 24px;">New Credential Evaluation Application</h1>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        ${personalInfoHtml}
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        ${educationHtml}
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        ${packageHtml}
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        ${paymentHtml}
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        ${documentsHtml}
      </div>
    </body>
  `;

  // --- 3. Send the email using the configured transporter ---
  try {
    await transporter.sendMail({
      from: `"${personalInfo.firstName} ${personalInfo.lastName}" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: personalInfo.email,
      subject: `New Application: ${personalInfo.firstName} ${personalInfo.lastName}`,
      html: emailHtml,
    });

    console.log(
      `Application email sent for ${personalInfo.email} and routed to admin.`
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
// This is the updated function for your lib/emailService.ts file

export async function sendUserConfirmationEmail({
  formData,
  paymentDetails,
}: EmailParams) {
  // Destructure for easier access
  const { personalInfo, selectedPackage } = formData;

  // --- Construct the new, beautifully formatted HTML body ---
  const emailHtml = `
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        
        <h1 style="color: #0056b3; font-size: 24px;">Thank You, ${
          personalInfo.firstName
        }!</h1>
        
        <p>We've successfully received your application. This email confirms your order and what to expect next.</p>
        
        <div style="background: #f0f8ff; padding: 15px; border: 1px solid #ddeeff; border-radius: 5px; margin-top: 20px; margin-bottom: 20px;">
          <h2 style="margin-top:0; color: #0056b3; font-size: 18px;">Your Order Summary</h2>
          
          <p style="margin-bottom: 5px;">
            <strong>Package Purchased:</strong><br>
            ${selectedPackage.name}
          </p>
          
          <p style="margin-bottom: 5px;">
            <strong>Estimated Processing Time:</strong><br>
            <span style="font-weight: bold;">${
              selectedPackage.processingTime
            }</span>
          </p>
          
          <p style="margin-bottom: 5px;">
            <strong>Amount Paid:</strong><br>
            $${(paymentDetails.amount / 100).toFixed(
              2
            )} ${paymentDetails.currency.toUpperCase()}
          </p>
          
          <p style="margin-bottom: 0;">
            <strong>Transaction ID:</strong><br>
            ${paymentDetails.id}
          </p>
        </div>
        
        <p>Our team will now begin reviewing your documents. We will contact you if any additional information is required. You can expect your evaluation to be completed within the processing time stated above.</p>
        
        <p>If you have any questions, feel free to reply directly to this email.</p>
        
        <br>
        <p>Sincerely,</p>
        <p><strong>The Team at [Your Company Name]</strong></p>
        
      </div>
    </body>
  `;

  // --- The rest of the function remains the same ---
  try {
    await transporter.sendMail({
      from: `"[Your Company Name]" <${process.env.EMAIL_USER}>`,
      to: personalInfo.email, // Send to the applicant
      replyTo: process.env.ADMIN_EMAIL,
      subject: "We've Received Your Application!",
      html: emailHtml,
    });

    console.log(
      `User confirmation email sent successfully to ${personalInfo.email}.`
    );
  } catch (error) {
    // It's often acceptable to just log an error for the user confirmation
    // without failing the entire API request.
    console.warn(
      `Failed to send user confirmation email to ${personalInfo.email}:`,
      error
    );
  }
}
