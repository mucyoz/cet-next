// app/payment-success/page.tsx
"use client";

import { Suspense } from "react";
import { Elements } from "@stripe/react-stripe-js";
import PaymentStatusVerifier from "./verify/PaymentVerifier";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
// The page component now wraps the verifier in a Suspense boundary
// This is best practice for components that use `useSearchParams`
const PaymentSuccessPage = () => {
  const options: StripeElementsOptions = {
    // clientSecret, // This will be set on the checkout page
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <Suspense
        fallback={
          <div className="flex w-screen h-screen items-center justify-center ">
            Loading...
          </div>
        }
      >
        <PaymentStatusVerifier />
      </Suspense>
    </Elements>
  );
};

export default PaymentSuccessPage;
