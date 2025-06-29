"use client";

import { useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// A simple spinner component
const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
  </div>
);

// Define the status types for clarity
type VerificationStatus = "loading" | "success" | "processing" | "error";

const PaymentStatusVerifier = () => {
  const stripe = useStripe();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState(
    "Verifying your payment, please wait..."
  );

  useEffect(() => {
    // We create an async function inside useEffect to handle the logic
    const finalizeApplication = async () => {
      // Exit early if Stripe.js has not loaded yet
      if (!stripe) {
        return;
      }

      // Retrieve the 'payment_intent_client_secret' from the URL
      const clientSecret = searchParams.get("payment_intent_client_secret");
      if (!clientSecret) {
        setStatus("error");
        setMessage(
          "Error: Payment details not found in URL. Please contact support."
        );
        return;
      }

      // *** NEW STEP: Retrieve form data from localStorage ***
      const storedFormData = localStorage.getItem("applicationFormData");
      if (!storedFormData) {
        setStatus("error");
        setMessage(
          "Critical Error: Application data not found. Your payment might have been processed. Please contact support immediately with your payment details."
        );
        return;
      }

      // Retrieve the PaymentIntent from Stripe to confirm its status
      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      switch (paymentIntent?.status) {
        case "succeeded":
          // The payment is confirmed by Stripe. Now, submit the application to our backend.
          setMessage(
            "Payment successful! Finalizing your application submission..."
          );

          try {
            const response = await fetch("/api/finalize-application", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentIntentId: paymentIntent.id,
                formData: JSON.parse(storedFormData),
              }),
            });

            if (!response.ok) {
              // The backend API returned an error
              const errorResult = await response.json();
              throw new Error(
                errorResult.message || "Backend submission failed."
              );
            }

            // --- ALL-AROUND SUCCESS ---
            setStatus("success");
            setMessage(
              "Success! Your application has been submitted. We've received your application and will contact you shortly."
            );

            // Clean up localStorage only after a successful backend submission
            localStorage.removeItem("applicationFormData");
          } catch (error: any) {
            // This error is if our own API fails
            setStatus("error");
            setMessage(
              `Submission Failed: ${error.message}. Your payment was successful, but we could not save your application. Please contact support.`
            );
            console.error("Backend submission error:", error);
          }
          break;

        case "processing":
          setStatus("processing");
          setMessage(
            "Your payment is processing. We'll update you when it's complete."
          );
          break;

        case "requires_payment_method":
          setStatus("error");
          setMessage(
            "Your payment failed. Please try again with another payment method."
          );
          break;

        default:
          setStatus("error");
          setMessage("An unexpected error occurred. Please contact support.");
          break;
      }
    };

    finalizeApplication();
  }, [stripe, searchParams]); // Rerun this effect if stripe or searchParams change

  const renderIcon = () => {
    switch (status) {
      case "loading":
        return <Spinner />;
      case "success":
        // Using an inline SVG for the checkmark for better control and no external dependencies
        return (
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        );
      case "processing":
        return <div className="text-6xl text-gray-500">...</div>;
      case "error":
        // Using an inline SVG for the cross for better control
        return (
          <svg
            className="w-16 h-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        );
    }
  };

  const renderTitle = () => {
    switch (status) {
      case "loading":
        return "Verifying Payment";
      case "success":
        return "Application Submitted!";
      case "processing":
        return "Payment Processing";
      case "error":
        return "An Error Occurred";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-6 flex justify-center">{renderIcon()}</div>
        <h1 className="text-2xl font-bold mb-2">{renderTitle()}</h1>
        <p className="text-gray-600 mb-8">{message}</p>

        {status === "success" && (
          <Link
            href="/"
            className="inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded hover:bg-blue-600 transition-colors"
          >
            Return to Homepage
          </Link>
        )}

        {status === "error" && (
          <Link
            href="/application" // Link back to the main application form
            className="inline-block bg-red-500 text-white font-bold py-3 px-6 rounded hover:bg-red-600 transition-colors"
          >
            Return to Application
          </Link>
        )}
      </div>
    </div>
  );
};
export default PaymentStatusVerifier;
