import bcrypt from "bcryptjs";
import { supabase } from "./supabase-client"; // Import our new Supabase client

const OTP_EXPIRATION_MINUTES = 10;

/**
 * Generates a random 6-digit OTP.
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Hashes an OTP and stores it in the Supabase database.
 * @param email - The user's email.
 * @param plainOtp - The plain 6-digit OTP.
 */
// In lib/otp-utils.ts

export async function storeOTP(email: string, plainOtp: string): Promise<void> {
  const saltRounds = 10;
  const hashed_otp = await bcrypt.hash(plainOtp, saltRounds);

  const expires_at = new Date();
  expires_at.setMinutes(expires_at.getMinutes() + OTP_EXPIRATION_MINUTES);

  const { error } = await supabase.from("otp_verifications").upsert(
    {
      email: email.toLowerCase(),
      hashed_otp,
      expires_at: expires_at.toISOString(),
    },
    { onConflict: "email" }
  );

  if (error) {
    // MODIFICATION: Log the full error object for better debugging
    console.error(
      "Supabase error storing OTP:",
      JSON.stringify(error, null, 2)
    );
    throw new Error(`Database error: ${error.message}`); // Pass the actual message
  }

  console.log(`Stored/Updated OTP for ${email}`);
}

/**
 * Verifies a submitted OTP against the one in the Supabase database.
 * @param email - The user's email.
 * @param submittedOtp - The plain OTP from the user.
 * @returns boolean - True if valid, false otherwise.
 */
export async function verifyStoredOTP(
  email: string,
  submittedOtp: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from("otp_verifications")
    .select("hashed_otp, expires_at")
    .eq("email", email.toLowerCase())
    .single(); // .single() gets one row or returns an error if not found/multiple found

  if (error || !data) {
    console.log(`No OTP found for ${email} or Supabase error:`, error?.message);
    return false; // OTP not found or another error occurred
  }

  // Check if the OTP has expired
  if (new Date(data.expires_at) < new Date()) {
    console.log(`OTP for ${email} has expired.`);
    // Clean up the expired entry
    await supabase
      .from("otp_verifications")
      .delete()
      .eq("email", email.toLowerCase());
    return false;
  }

  const isValid = await bcrypt.compare(submittedOtp, data.hashed_otp);

  if (isValid) {
    // Clean up the used entry to prevent reuse
    await supabase
      .from("otp_verifications")
      .delete()
      .eq("email", email.toLowerCase());
  }

  return isValid;
}
