"use client";

import { useState, useCallback, useEffect } from "react"; // Added useEffect for debugging
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { PersonalInfoForm } from "./steps/PersonalInfoForm";
import { EducationForm } from "./steps/EducationForm";
import { DocumentUpload } from "./steps/DocumentUpload";
import { PackageSelection } from "./steps/PackageSelection";
import { ReviewSubmit } from "./steps/ReviewSubmit";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import * as z from "zod";

import {
  personalInfoSchema,
  educationSchema,
  documentsSchema,
  packageSelectionSchema,
  reviewSchema,
} from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import PaymentEntry from "./steps/PaymentEntry";
import { EmailVerificationDialog } from "./EmailVerificationDialog";

export interface FormData {
  personalInfo: Partial<z.infer<typeof personalInfoSchema>>;
  education: Partial<z.infer<typeof educationSchema>>;
  documents: Partial<z.infer<typeof documentsSchema>>;
  selectedPackage: Partial<z.infer<typeof packageSelectionSchema>>;
  reviewData: Partial<z.infer<typeof reviewSchema>>;
}

const steps = [
  {
    id: 1,
    name: "Personal Info",
    component: PersonalInfoForm,
    key: "personalInfo",
    schema: personalInfoSchema,
  },
  {
    id: 2,
    name: "Education",
    component: EducationForm,
    key: "education",
    schema: educationSchema,
  },
  {
    id: 3,
    name: "Documents",
    component: DocumentUpload,
    key: "documents",
    schema: documentsSchema,
  },
  {
    id: 4,
    name: "Package",
    component: PackageSelection,
    key: "selectedPackage",
    schema: packageSelectionSchema,
  },
  {
    id: 5,
    name: "Review",
    component: ReviewSubmit,
    key: "reviewData",
    schema: reviewSchema,
  },
  {
    id: 6,
    name: "Payment",
    component: PaymentEntry,
    key: "reviewData",
    schema: reviewSchema,
  },
];

export default function ApplicationFlow({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {},
    education: { educationHistory: [] },
    documents: { files: [] },
    selectedPackage: {},
    reviewData: { termsAccepted: false },
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationPopupOpen, setIsVerificationPopupOpen] = useState(false);

  // *** DEBUG CHECKPOINT #3 ***
  // This will run WHENEVER the isVerificationPopupOpen state changes.
  useEffect(() => {
    console.log(
      `CHECKPOINT 3: Popup state changed. New value is: ${isVerificationPopupOpen}`
    );
  }, [isVerificationPopupOpen]);

  const updateFormData = useCallback((stepKey: keyof FormData, data: any) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
  }, []);

  const currentStepData = steps.find((step) => step.id === currentStep);
  const currentStepKey = currentStepData?.key as keyof FormData;
  const [isNavigating, setIsNavigating] = useState(false);

  const updateCurrentStepData = useCallback(
    (data: any) => {
      if (currentStepKey) {
        updateFormData(currentStepKey, data);
      }
    },
    [currentStepKey, updateFormData]
  );

  const validateCurrentStep = (): boolean => {
    if (!currentStepData) return false;
    const dataToValidate = formData[currentStepData.key as keyof FormData];
    const result = currentStepData.schema.safeParse(dataToValidate);
    if (!result.success) {
      toast.error("Incomplete Information", {
        description: result.error.errors[0].message,
      });
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      return;
    }
    setIsNavigating(true);

    // *** Email Verification Logic with Better Error Handling ***
    if (currentStep === 1 && !isEmailVerified) {
      // 1. Immediately open the dialog and disable the 'Next' button
      setIsVerificationPopupOpen(true);
      setIsNavigating(true);

      try {
        // 2. Start the API call in the background.
        // We can show a toast here to let them know something is happening.
        toast.info("Sending verification code to your email...");

        const response = await fetch("/api/send-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.personalInfo.email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to send verification code."
          );
        }

        // 3. On success, show a success toast. The dialog is already open.
        toast.success("Code sent! Please check your inbox.");
      } catch (error: any) {
        // 4. If it fails, show an error toast and CLOSE the dialog
        //    so the user isn't stuck on a popup for a failed action.
        console.error(
          "A critical error occurred while sending the code:",
          error
        );
        toast.error("Failed to Send Email", {
          description: error.message || "Please try again or contact support.",
        });
        setIsVerificationPopupOpen(false); // Close the dialog on failure
      } finally {
        // 5. No matter what, re-enable the main 'Next' button.
        setIsNavigating(false);
      }

      return; // Stop execution here until the user verifies inside the dialog.
    }
    // *** End of updated logic ***

    if (currentStep === 5) {
      try {
        localStorage.setItem("applicationFormData", JSON.stringify(formData));
      } catch (error) {
        console.error("Could not save form data to localStorage:", error);
        toast.error("An error occurred. Please try again.");
        setIsNavigating(false);
        return;
      }
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
    setIsNavigating(false);
  };

  const handleVerificationSuccess = () => {
    toast.success("Email Verified!");
    setIsEmailVerified(true);
    setIsVerificationPopupOpen(false);
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  if (!currentStepData) return null;
  const CurrentStepComponent = currentStepData.component;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* The rest of your JSX remains the same */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="font-serif text-xl font-bold text-center text-gray-900">
              Credential Evaluation Application
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="mt-8 flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center",
                  step.id === currentStep
                    ? "text-blue-600"
                    : step.id < currentStep
                    ? "text-green-500"
                    : "text-gray-400"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                    step.id === currentStep
                      ? "bg-blue-100 border-2 border-blue-600"
                      : step.id < currentStep
                      ? "bg-green-100"
                      : "bg-gray-100"
                  )}
                >
                  {step.id < currentStep ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <span className="text-xs md:text-sm text-center">
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8"
          >
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateCurrentStepData}
            />
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleBack} className="px-6">
            {currentStep === 1 ? "Return to Home" : "Previous Step"}
          </Button>
          {currentStep < steps.length && (
            <Button
              onClick={handleNext}
              disabled={isNavigating}
              className="bg-blue-600 hover:bg-blue-700 px-6"
            >
              <span className="flex items-center">
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          )}
        </div>
      </div>
      <EmailVerificationDialog
        isOpen={isVerificationPopupOpen}
        onClose={() => setIsVerificationPopupOpen(false)}
        email={formData.personalInfo.email || ""}
        onVerified={handleVerificationSuccess}
      />
    </div>
  );
}
