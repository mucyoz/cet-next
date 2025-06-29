// /app/api/upload-document/route.ts

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your credentials from .env
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("document") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file was uploaded." },
        { status: 400 }
      );
    }

    // Convert the file into a buffer (a sequence of bytes)
    const buffer = Buffer.from(await file.arrayBuffer());

    // To upload a buffer, we stream it to Cloudinary.
    // The modern way is to use a Promise-based approach.
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          // You can specify a folder in your Cloudinary account
          folder: "application_documents",
          // We are uploading documents, which might not be images
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    // Type guard to ensure the result is valid
    if (
      typeof uploadResult !== "object" ||
      uploadResult === null ||
      !("secure_url" in uploadResult)
    ) {
      throw new Error("Cloudinary upload failed to return a valid result.");
    }

    console.log(
      "File successfully uploaded to Cloudinary:",
      uploadResult.secure_url
    );

    // Return the secure URL of the uploaded file
    return NextResponse.json({
      message: "File uploaded successfully",
      path: uploadResult.secure_url, // The final public URL from Cloudinary
    });
  } catch (error: any) {
    console.error("Cloudinary Upload API Error:", error);
    return NextResponse.json(
      { error: "Failed to upload file.", details: error.message },
      { status: 500 }
    );
  }
}
