"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { type FormData as MasterFormData } from "../ApplicationFlow";

// Your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Define the props interface for PaymentEntry
interface PaymentEntryProps {
  formData: MasterFormData;
}

export default function PaymentEntry({ formData }: PaymentEntryProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Extract the price from the selected package. Use a default of 0 for safety.
  const amount = formData.selectedPackage?.price ?? 0;

  useEffect(() => {
    // Only fetch if we have a valid amount
    if (amount > 0) {
      setIsLoading(true);
      // Create PaymentIntent as soon as the component loads with the amount
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send the amount to the API
        body: JSON.stringify({ amount: amount }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("API did not return a client secret");
          }
        })
        .catch((error) => {
          console.error("Failed to create payment intent:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [amount]); // Re-run this effect if the amount changes

  // Options for the Stripe Elements provider
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  // Display a loading state or an error if something is wrong
  if (amount <= 0) {
    return (
      <div className="text-center text-red-600">
        <p>Error: No package selected or price is invalid.</p>
        <p>
          Please go back to the &#39;Package &#39; step and select a package.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600">
          Initializing secure payment form...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* The Elements provider should only render when you have the clientSecret */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      )}
    </div>
  );
}
