import * as z from "zod";

/**
 * Schema for the Personal Information step.
 * All fields are validated for presence and format.
 */
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  country: z
    .string()
    .min(1, { message: "Please select your country of origin." }),
  address: z.string().min(5, { message: "Please enter your full address." }),
  city: z.string().min(2, { message: "Please enter your city." }),
  state: z.string().optional(),
  zipCode: z
    .string()
    .min(3, { message: "Please enter a valid postal/zip code." }),
});

/**
 * Schema for a single education entry, to be used within an array.
 */
const educationEntrySchema = z.object({
  institution: z.string().min(2, { message: "Institution name is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  degreeType: z.string().min(1, { message: "Degree type is required." }),
  fieldOfStudy: z.string().min(2, { message: "Field of study is required." }),
  startYear: z
    .string()
    .regex(/^\d{4}$/, { message: "A valid start year is required." }),
  endYear: z
    .string()
    .regex(/^\d{4}$/, { message: "A valid end year is required." }),
  gpa: z.string().optional(),
});

/**
 * Schema for the Education History step. The top-level is an object
 * containing the array, ensuring a consistent data structure.
 */
export const educationSchema = z.object({
  educationHistory: z
    .array(educationEntrySchema)
    .min(1, { message: "Please add at least one education entry to proceed." }),
});

// --- THIS IS THE PRIMARY FIX ---
/**
 * Schema for the Document Upload step.
 * Corrected to be an object containing a 'files' array, matching the
 * pattern of the other schemas for consistency.
 */
export const documentsSchema = z.object({
  files: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.string(),
        size: z.number(),
        file: z.string(),
        uploadDate: z.string().datetime(),
        public_id: z.string(),
        resource_type: z.string(),
      })
    )
    .min(1, { message: "Please upload at least one document." }),
});
// -----------------------------

/**
 * Schema for the Package Selection step.
 * Validates that a complete package object has been selected.
 */
export const packageSelectionSchema = z.object({
  id: z.string().min(1, { message: "Please select an evaluation package." }),
  name: z.string(),
  price: z.number(),
  color: z.string(),
  description: z.string(),
  processingTime: z.string(),
  features: z.array(z.string()),
  popular: z.boolean().optional(),
});

/**
 * Schema for the Review & Submit step.
 * Uses .refine to ensure the boolean 'termsAccepted' is true for validation.
 */
export const reviewSchema = z
  .object({
    termsAccepted: z.boolean(),
    paymentId: z.string().optional(),
  })
  .refine((data) => data.termsAccepted === true, {
    message: "You must accept the terms and conditions to submit.",
    path: ["termsAccepted"], // Apply the error message to the checkbox field
  });
