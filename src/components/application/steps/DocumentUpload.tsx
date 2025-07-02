"use client";

import { useState } from "react";
import { type FormData as MasterFormData } from "../ApplicationFlow";
import { documentsSchema } from "@/lib/schemas"; // Your source of truth
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, File, Upload, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DocumentUploadProps {
  formData: MasterFormData;
  updateFormData: (data: z.infer<typeof documentsSchema>) => void;
}

// --- FIX 1: INFER THE TYPE FROM THE SCHEMA ---
// This ensures your component's type is always in sync with your validation schema.
type DocumentFile = z.infer<typeof documentsSchema>["files"][0];

export function DocumentUpload({
  formData,
  updateFormData,
}: DocumentUploadProps) {
  // --- FIX 2: THE INITIAL STATE ASSIGNMENT NOW WORKS ---
  // Because DocumentFile and the schema type are identical, TypeScript is happy.
  const [documents, setDocuments] = useState<DocumentFile[]>(
    () => (formData.documents?.files as DocumentFile[]) || []
  );

  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!documentType) {
      alert("Please select a document type first.");
      return;
    }

    setIsUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("document", file);

    try {
      const response = await fetch("/api/upload-document", {
        method: "POST",
        body: uploadFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || result.error || "Upload failed");
      }

      // --- FIX 3: CREATE THE OBJECT MATCHING THE NEW SCHEMA ---
      const newDocument: DocumentFile = {
        id: result.public_id, // Use the unique public_id for the React key
        name: documentName || result.name,
        type: documentType,
        size: file.size,
        uploadDate: new Date().toISOString(),
        public_id: result.public_id,
        resource_type: result.resource_type,
        file: "",
      };

      const updatedDocuments = [...documents, newDocument];
      setDocuments(updatedDocuments);

      // The updateFormData call is now valid because `updatedDocuments` matches the schema
      updateFormData({ files: updatedDocuments });

      setDocumentType("");
      setDocumentName("");
    } catch (error: any) {
      console.error("File upload process error:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const removeDocument = (id: string) => {
    const updatedDocuments = documents.filter((doc) => doc.id !== id);
    setDocuments(updatedDocuments);
    // The updateFormData call is also valid here
    updateFormData({ files: updatedDocuments });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 Bytes";
    if (bytes < 1024) return bytes + " Bytes";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      {/* ... The rest of your JSX remains exactly the same ... */}
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Document Upload
        </h2>
        <p className="text-gray-600">
          Please upload all relevant educational documents. All documents must
          be in PDF, JPG, or PNG format.
        </p>
      </div>
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-medium">Important</p>
          <p>
            Documents not in English must be accompanied by certified
            translations.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="documentType">Document Type *</Label>
          <Select
            value={documentType}
            onValueChange={setDocumentType}
            disabled={isUploading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diploma">
                Diploma/Degree Certificate
              </SelectItem>
              <SelectItem value="transcript">Academic Transcript</SelectItem>
              <SelectItem value="id">Government ID</SelectItem>
              <SelectItem value="translation">Certified Translation</SelectItem>
              <SelectItem value="resume">Resume/CV</SelectItem>
              <SelectItem value="other">Other Document</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="documentName">Document Name (Optional)</Label>
          <Input
            id="documentName"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            placeholder="e.g., Bachelor's Degree"
            disabled={isUploading}
          />
        </div>
      </div>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center",
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
          "transition-colors duration-200 relative"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
            <p className="mt-4 font-medium text-blue-600">Uploading...</p>
          </div>
        )}
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload
            className={cn(
              "h-12 w-12",
              dragActive ? "text-blue-500" : "text-gray-400"
            )}
          />
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              {dragActive
                ? "Drop your file here"
                : "Drag and drop your file here"}
            </h3>
            <p className="text-sm text-gray-500">
              Supported formats: PDF, JPG, PNG (max 10MB)
            </p>
          </div>
          <span className="text-sm text-gray-500">or</span>
          <label htmlFor="fileUpload">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("fileUpload")?.click()}
              className="cursor-pointer"
              disabled={!documentType || isUploading}
            >
              Select File
            </Button>
            <Input
              id="fileUpload"
              type="file"
              className="hidden"
              onChange={handleFileInput}
              accept=".pdf,.jpg,.jpeg,.png"
              disabled={!documentType || isUploading}
            />
          </label>
        </div>
      </div>
      {documentType === "" && !isUploading && (
        <p className="text-sm text-amber-600 mt-2">
          Please select a document type before uploading
        </p>
      )}
      {documents.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="font-medium text-gray-900">
            Uploaded Documents ({documents.length})
          </h3>
          <AnimatePresence>
            {documents.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-gray-50">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <File className="h-5 w-5 text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-gray-500">
                          {doc.type} • {formatFileSize(doc.size)} •{" "}
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(doc.id)}
                      className="text-gray-500 hover:text-red-500"
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      {documents.length === 0 && (
        <div className="text-center p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 font-medium">
            No documents uploaded yet
          </p>
          <p className="text-amber-700 text-sm mt-1">
            Please upload at least one document to continue
          </p>
        </div>
      )}
    </div>
  );
}
