"use client";

import { useState } from "react";
import { packageSelectionSchema } from "@/lib/schemas";
import { type FormData as MasterFormData } from "../ApplicationFlow";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, CheckCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PackageSelectionProps {
  formData: MasterFormData;
  updateFormData: (data: z.infer<typeof packageSelectionSchema>) => void;
}

// CORRECTED: The packages array now includes all required properties.
const packages = [
  {
    id: "essential-document",
    name: "Essential Document Evaluation",
    price: 149,
    color: "blue",
    description:
      "Perfect for employment, immigration, and community college admission.",
    processingTime: "7-10 business days",
    features: [
      "Document-by-document evaluation",
      "U.S. career roadmap",
      "LinkedIn profile optimization guide",
      "Insights into U.S. workplace culture and hiring practices",
      "30-minute career success consultation",
      "Digital copy of evaluation",
      "Job search resources toolkit",
    ],
    popular: false,
  },
  {
    id: "professional-plus",
    name: "Professional Plus (Course-By-Course)",
    price: 229,
    color: "indigo",
    description:
      "Detailed academic analysis for university admissions and licensing.",
    processingTime: "5-7 business days",
    features: [
      "Course-by-course evaluation",
      "Detailed academic analysis",
      "Guidance to align your skills & experience with U.S. job market demands",
      "Digital + hard copy reports",
      "Career pathway overview",
      "Professional licensing roadmap",
      "Premium success resources toolkit",
    ],
    popular: false,
  },
  {
    id: "career-success",
    name: "Career Success Package",
    price: 349,
    color: "amber",
    description: "Complete course evaluation with extensive career support.",
    processingTime: "3-5 business days",
    popular: true,
    features: [
      "Complete course-by-course evaluation",
      "Career pathway roadmap",
      "Industry-specific guidance",
      "Job search strategy consultation",
      "Resume optimization tips",
      "Recommendations for in-demand certifications",
      "3 professional network introductions",
      "6-month email support access",
    ],
  },
  {
    id: "premium-transition",
    name: "Premium Career Transition",
    price: 499,
    color: "purple",
    description: "Everything plus personalized coaching and premium support.",
    processingTime: "1-2 business days",
    features: [
      "Everything in Career Success Package",
      "1-on-1 career consultation (30 minutes)",
      "Personalized education transition plan",
      "Industry networking guidance",
      "Follow-up support (60 days)",
      "Help with interview prep, and job search strategies",
      "Skills gap analysis & certificate recommendations",
      "VIP document handling",
    ],
    popular: false,
  },
];

export function PackageSelection({
  formData,
  updateFormData,
}: PackageSelectionProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>( // Allow null
    () => formData.selectedPackage?.id || null // Default to null
  );

  const handlePackageChange = (packageId: string) => {
    setSelectedPackageId(packageId);
    const packageData = packages.find((pkg) => pkg.id === packageId);
    if (packageData) {
      updateFormData(packageData);
    }
  };

  const selectedPackageObject = packages.find(
    (p) => p.id === selectedPackageId
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Select Your Package
        </h2>
        <p className="text-gray-600">
          Choose the package that best fits your goals.
        </p>
      </div>

      <RadioGroup
        value={selectedPackageId}
        onValueChange={handlePackageChange}
        className="space-y-4"
      >
        {packages.map((pkg) => {
          const isSelected = selectedPackageId === pkg.id;
          const colorClasses = {
            blue: "border-blue-200 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50",
            indigo:
              "border-indigo-200 data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-50",
            amber:
              "border-amber-200 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-50",
            purple:
              "border-purple-200 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-50",
          };

          return (
            <div key={pkg.id} className="relative">
              {pkg.popular && (
                <div className="absolute -top-3 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  MOST POPULAR
                </div>
              )}
              <Label
                htmlFor={pkg.id}
                className={cn(
                  "flex cursor-pointer rounded-lg border-2 p-4 transition-all",
                  colorClasses[pkg.color as keyof typeof colorClasses],
                  isSelected
                    ? `ring-2 ring-offset-2 ring-${pkg.color}-500`
                    : `border-${pkg.color}-200`
                )}
              >
                <RadioGroupItem
                  value={pkg.id}
                  id={pkg.id}
                  className="sr-only"
                />
                <motion.div
                  className="grid gap-2 md:grid-cols-3 w-full"
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center",
                          isSelected
                            ? `bg-${pkg.color}-500 text-white`
                            : "border border-gray-300"
                        )}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <span className="font-medium text-lg">{pkg.name}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">${pkg.price}</span>
                      <span className="text-gray-500 ml-1">one-time</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span>Processing: {pkg.processingTime}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3.5 w-3.5 ml-1 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Time from document submission to receiving your
                                evaluation.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      {pkg.description}
                    </p>
                  </div>
                  <div className="col-span-2 mt-4 md:mt-0">
                    <h4 className="font-medium mb-2">Package Includes:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CheckCircle
                            className={`h-5 w-5 mr-2 flex-shrink-0 text-${pkg.color}-500`}
                          />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">
          Selected Package Summary
        </h4>
        {selectedPackageObject && (
          <div className="text-blue-700">
            <p className="font-medium">{selectedPackageObject.name}</p>
            <p className="text-sm">
              ${selectedPackageObject.price} •{" "}
              {selectedPackageObject.processingTime}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
