// /app/api/upload-document/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase-client"; // NEW: Import our Supabase client
import { randomUUID } from "crypto"; // NEW: To generate unique filenames

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("document") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // NEW: Create a unique path for the file to prevent overwrites
    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `${randomUUID()}.${fileExtension}`;
    const filePath = `user-uploads/${uniqueFilename}`; // A subfolder for organization

    // NEW: Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("attachments") // This is the bucket name you created
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false, // Don't allow overwriting existing files
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      throw new Error(uploadError.message);
    }

    // IMPORTANT CHANGE: Return the `path` of the file, not a public_id.
    // The frontend will need this `path` to tell the finalize endpoint which file to fetch.
    return NextResponse.json(
      {
        message: "Upload successful",
        name: file.name, // The original filename for display purposes
        path: filePath, // The unique path in Supabase Storage
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Backend upload error:", error);
    return NextResponse.json(
      {
        error: "Something went wrong during the upload.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
