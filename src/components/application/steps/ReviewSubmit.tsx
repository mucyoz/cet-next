"use client";

import { useState } from "react";
import { type FormData as MasterFormData } from "../ApplicationFlow"; // 1. Import master FormData type
import { reviewSchema } from "@/lib/schemas"; // Import schema for type inference
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Clock,
  FileText,
  FileCheck,
  User,
  School,
  Package,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

interface ReviewSubmitProps {
  formData: MasterFormData; // 2. Expect the full FormData object
  updateFormData: (data: z.infer<typeof reviewSchema>) => void;
}

export function ReviewSubmit({ formData, updateFormData }: ReviewSubmitProps) {
  // 3. Initialize internal state from the correct slice of the prop
  const [termsAccepted, setTermsAccepted] = useState(
    () => formData.reviewData?.termsAccepted || false
  );

  const handleTermsChange = (checked: boolean) => {
    setTermsAccepted(checked);
    // When updating, we only send back the data for this specific step
    updateFormData({ termsAccepted: checked });
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 Bytes";
    if (bytes < 1024) return bytes + " Bytes";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Use the clean "Explicit Variable" pattern for readability and safety
  const personalInfo = formData.personalInfo;
  const educationHistory = formData.education?.educationHistory;
  const uploadedDocuments = formData.documents?.files;
  const selectedPackage = formData.selectedPackage;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Review Your Application
        </h2>
        <p className="text-gray-600">
          Please review your information before submitting. You can go back to
          any section to make changes.
        </p>
      </div>

      {/* Personal Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium">Personal Information</h3>
            </div>
            {personalInfo && Object.keys(personalInfo).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm ml-7">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p>
                    {personalInfo.firstName} {personalInfo.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p>{personalInfo.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p>{personalInfo.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">Country of Origin</p>
                  <p>{personalInfo.country}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-500">Address</p>
                  <p>{`${personalInfo.address}, ${personalInfo.city}, ${
                    personalInfo.state || ""
                  } ${personalInfo.zipCode}`}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 ml-7">
                No personal information provided.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Education History Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <School className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-lg font-medium">Education History</h3>
            </div>
            <div className="space-y-4 ml-7">
              {educationHistory && educationHistory.length > 0 ? (
                educationHistory.map((edu: any, index: number) => (
                  <div
                    key={index}
                    className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                  >
                    <h4 className="font-medium">{edu.institution}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
                      <div>
                        <p className="text-gray-500">Degree</p>
                        <p>
                          {edu.degreeType} in {edu.fieldOfStudy}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Years</p>
                        <p>
                          {edu.startYear} - {edu.endYear}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No education history provided.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Uploaded Documents Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="text-lg font-medium">Uploaded Documents</h3>
            </div>
            <div className="space-y-3 ml-7">
              {/* 4. FIX: Access the .files property */}
              {uploadedDocuments && uploadedDocuments.length > 0 ? (
                uploadedDocuments.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <FileCheck className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{doc.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatFileSize(doc.size)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No documents uploaded.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Selected Package Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Package className="h-5 w-5 text-purple-500 mr-2" />
              <h3 className="text-lg font-medium">Selected Package</h3>
            </div>
            {selectedPackage && selectedPackage.id ? (
              <div className="ml-7">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-lg">
                    {selectedPackage.name}
                  </h4>
                  <span className="font-bold text-xl">
                    ${selectedPackage.price}
                  </span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{selectedPackage.processingTime} processing</span>
                </div>
                <Separator className="my-4" />
                <ul className="space-y-2">
                  {selectedPackage.features?.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-gray-500 ml-7">No package selected.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Terms and Conditions Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="font-medium">Terms and Conditions</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                By submitting this application, you agree to our terms of
                service and privacy policy. You certify that all information
                provided is accurate and complete.
              </p>
              <p>
                Processing times are estimates and may vary. We will notify you
                if there are any delays.
              </p>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) =>
                  handleTermsChange(checked as boolean)
                }
                className="mt-1"
              />
              <div>
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  I agree to the terms and conditions *
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Required: I understand that my information will be processed
                  according to the privacy policy
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {!termsAccepted && (
        <div className="text-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 font-medium">
            Please accept the terms and conditions to proceed
          </p>
          <p className="text-amber-700 text-sm mt-1">
            You must agree to the terms before submitting your application
          </p>
        </div>
      )}
    </div>
  );
}
