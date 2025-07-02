// /app/api/upload-document/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("document") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result: any = await new Promise((resolve, reject) => {
      // Don't set public_id, let Cloudinary create a unique one
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw", // Keep as 'raw' for private by default
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // --- IMPORTANT CHANGE ---
    // Return the public_id and resource_type, not just the URL
    return NextResponse.json(
      {
        message: "Upload successful",
        // Pass back all the info needed for the next step
        name: file.name, // Keep the original filename for display
        public_id: result.public_id,
        resource_type: result.resource_type,
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
