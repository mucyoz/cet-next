"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { educationSchema } from "@/lib/schemas";
import { type FormData as MasterFormData } from "../ApplicationFlow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { countries } from "@/data/countries";

// The schema for a SINGLE education entry, derived from the main schema
const singleEducationEntrySchema =
  educationSchema.shape.educationHistory.element;

interface EducationFormProps {
  formData: MasterFormData;
  updateFormData: (data: z.infer<typeof educationSchema>) => void;
}

export function EducationForm({
  formData,
  updateFormData,
}: EducationFormProps) {
  // Initialize internal list state from the props
  const [educationHistory, setEducationHistory] = useState<
    z.infer<typeof singleEducationEntrySchema>[]
  >(() => formData.education?.educationHistory || []);

  const form = useForm<z.infer<typeof singleEducationEntrySchema>>({
    resolver: zodResolver(singleEducationEntrySchema),
    defaultValues: {
      institution: "",
      country: "",
      degreeType: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      gpa: "",
    },
  });

  // WATCH the startYear field to dynamically update the endYear options
  const selectedStartYear = form.watch("startYear");

  // Function to add a new, validated education entry
  const addEducation = (data: z.infer<typeof singleEducationEntrySchema>) => {
    const updatedHistory = [...educationHistory, data];
    setEducationHistory(updatedHistory);
    updateFormData({ educationHistory: updatedHistory });
    form.reset(); // Reset the form fields for the next entry
  };

  // Function to remove an education entry
  const removeEducation = (index: number) => {
    const updatedHistory = educationHistory.filter((_, i) => i !== index);
    setEducationHistory(updatedHistory);
    updateFormData({ educationHistory: updatedHistory });
  };

  // Generate years array in descending order
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 70 }, (_, i) =>
    (currentYear - i).toString()
  );

  // FILTER the options for the End Year dropdown based on the selected start year
  const endYearOptions = selectedStartYear
    ? years.filter((year) => year >= selectedStartYear)
    : years;

  // Good UX: Automatically clear endYear if startYear changes and makes it invalid
  useEffect(() => {
    const currentEndYear = form.getValues("endYear");
    if (currentEndYear && selectedStartYear > currentEndYear) {
      form.setValue("endYear", ""); // Clear the invalid selection
    }
  }, [selectedStartYear, form]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Education History
        </h2>
        <p className="text-gray-600">
          Please provide details about your educational background.
        </p>
      </div>

      {educationHistory.length > 0 && (
        <div className="space-y-4 mb-8">
          <h3 className="font-medium text-gray-900">
            Added Education ({educationHistory.length})
          </h3>
          {educationHistory.map((education, index) => (
            <Card key={index} className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{education.institution}</h4>
                    <p className="text-sm text-gray-600">
                      {education.degreeType} in {education.fieldOfStudy}
                    </p>
                    <p className="text-sm text-gray-600">
                      {education.country} • {education.startYear} -{" "}
                      {education.endYear}
                      {education.gpa && ` • GPA: ${education.gpa}`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-6">
          <h3 className="font-medium text-gray-900 mb-4">
            Add Education Entry
          </h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addEducation)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="institution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter university name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="degreeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree Type *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select degree type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            "High School Diploma",
                            "Associate's",
                            "Bachelor's",
                            "Master's",
                            "Doctorate",
                            "Professional",
                            "Certificate",
                            "Other",
                          ].map((degree) => (
                            <SelectItem key={degree} value={degree}>
                              {degree}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fieldOfStudy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Computer Science"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="startYear" // THE FIX: Corrected name
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Year *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="h-[200px] overflow-y-auto">
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Year *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value} // Use 'value' for controlled behavior
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                          {/* Map over the DYNAMICALLY FILTERED options */}
                          {endYearOptions.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPA (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 3.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="flex items-center mt-4 bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Education Entry
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {educationHistory.length === 0 && (
        <div className="text-center p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 font-medium">
            No education entries added yet
          </p>
          <p className="text-amber-700 text-sm mt-1">
            Please add at least one education entry to continue
          </p>
        </div>
      )}
    </div>
  );
}
