"use client";
import { useState, useCallback } from "react";
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

// Import your centralized schemas
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

// --- Type Definitions ---
type PersonalInfoData = z.infer<typeof personalInfoSchema>;
type EducationData = z.infer<typeof educationSchema>;
type DocumentsData = z.infer<typeof documentsSchema>;
type PackageData = z.infer<typeof packageSelectionSchema>;
type ReviewData = z.infer<typeof reviewSchema>;

// Export this interface so child components can use it for their props
export interface FormData {
  personalInfo: Partial<PersonalInfoData>;
  education: Partial<EducationData>;
  documents: Partial<DocumentsData>;
  selectedPackage: Partial<PackageData>;
  reviewData: Partial<ReviewData>;
}

// --- Steps Configuration ---
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
  // --- STATE AND HOOKS (All at the top level) ---
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {},
    education: { educationHistory: [] },
    documents: { files: [] },
    selectedPackage: {},
    reviewData: { termsAccepted: false },
  });

  const currentStepData = steps.find((step) => step.id === currentStep);
  const currentStepKey = currentStepData?.key as keyof FormData;
  // const [isSubmitting , setIsSubmitting ] = useState()
  const updateFormData = useCallback((stepKey: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: data,
    }));
  }, []);

  const updateCurrentStepData = useCallback(
    (data: any) => {
      if (currentStepKey) {
        updateFormData(currentStepKey, data);
      }
    },
    [currentStepKey, updateFormData]
  );

  // --- DERIVED STATE AND CONSTANTS ---
  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  // --- VALIDATION AND EVENT HANDLERS ---
  const validateCurrentStep = (): boolean => {
    if (!currentStepData) return false;
    const dataToValidate = formData[currentStepData.key as keyof FormData];
    const result = currentStepData.schema.safeParse(dataToValidate);

    if (!result.success) {
      const errorMessage = result.error.errors[0].message;
      toast.error("Incomplete Information", { description: errorMessage });
      return false;
    }
    return true;
  };

  // const handleNext = async () => {
  //   if (!validateCurrentStep()) {
  //     return;
  //   }

  //   if (currentStep < totalSteps) {
  //     setCurrentStep(currentStep + 1);
  //     window.scrollTo(0, 0);
  //   } else {
  //     // Final submission logic
  //     setIsSubmitting(true);
  //     console.log("Submitting final data:", formData);
  //     try {
  //       // Simulate API call
  //       await new Promise((resolve) => setTimeout(resolve, 2000));

  //       toast("Application Submitted Successfully!", {
  //         description:
  //           "We've received your application and will contact you shortly.",
  //         duration: 5000,
  //       });

  //       // Redirect after a delay
  //       setTimeout(() => onBack(), 3000);
  //     } catch (error) {
  //       console.error("Submission error:", error);
  //       toast("Submission Error", {
  //         description:
  //           "There was an error submitting your application. Please try again.",
  //       });
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   }
  // };
  const handleNext = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    // *** NEW: Save data before going to the payment step ***
    if (currentStep === 5) {
      try {
        // Save the complete form data to localStorage
        localStorage.setItem("applicationFormData", JSON.stringify(formData));
        console.log("Form data saved to localStorage before payment.");
      } catch (error) {
        console.error("Could not save form data to localStorage:", error);
        toast.error(
          "An error occurred preparing for payment. Please try again."
        );
        return; // Stop if we can't save
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // The final submission will now happen on the /payment-success page
      // This 'else' block can be removed or left empty
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      // If on the first step, use the onBack prop to go home
      onBack();
    }
  };

  // --- RENDER LOGIC ---
  if (!currentStepData) {
    return null; // Safety guard clause
  }

  const CurrentStepComponent = currentStepData.component;

  return (
    <div className="min-h-screen bg-gray-50">
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
            <div className="w-20"></div> {/* Spacer for centering */}
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
          {currentStep < totalSteps && (
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 px-6"
            >
              <span className="flex items-center">
                Next Step <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
