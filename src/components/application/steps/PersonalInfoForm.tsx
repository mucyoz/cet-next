"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { personalInfoSchema } from "@/lib/schemas"; // 1. Import from central schema file
import { type FormData } from "../ApplicationFlow"; // 2. Import master FormData type
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
import { countries } from "@/data/countries";

interface PersonalInfoFormProps {
  formData: FormData; // 3. Expect the full FormData object
  updateFormData: (data: z.infer<typeof personalInfoSchema>) => void;
}

export function PersonalInfoForm({
  formData,
  updateFormData,
}: PersonalInfoFormProps) {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    // 4. Read from the correct slice for default values
    // This pre-fills the form when the user navigates back to this step
    defaultValues: {
      firstName: formData.personalInfo?.firstName || "",
      lastName: formData.personalInfo?.lastName || "",
      email: formData.personalInfo?.email || "",
      phone: formData.personalInfo?.phone || "",
      country: formData.personalInfo?.country || "",
      address: formData.personalInfo?.address || "",
      city: formData.personalInfo?.city || "",
      state: formData.personalInfo?.state || "",
      zipCode: formData.personalInfo?.zipCode || "",
    },
  });

  // This `useEffect` hook is the "engine" that sends data up to the parent.
  // It watches for any change in this form's state and calls the update function.
  useEffect(() => {
    const subscription = form.watch((value) => {
      // We know the value is valid for this slice of the form
      updateFormData(value as z.infer<typeof personalInfoSchema>);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormData]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Personal Information
        </h2>
        <p className="text-gray-600">
          Please provide your personal details for the credential evaluation.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 5. Use the cleaner <FormField> now that Input forwards its ref */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Origin *</FormLabel>
                {/* For shadcn Select, we use value and onValueChange */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country of origin" />
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

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Address *</FormLabel>
                <FormControl>
                  <Input placeholder="Street address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="State or province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal/Zip Code *</FormLabel>
                  <FormControl>
                    <Input placeholder="Postal or zip code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
