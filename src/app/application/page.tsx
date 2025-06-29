"use client";

import ApplicationFlow from "@/components/application/ApplicationFlow";
import { useRouter } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
// This is the Client Component for the URL: "/application"
export default function ApplicationPage() {
  const router = useRouter();

  // This function tells the form how to go "back" to the homepage
  const handleReturnHome = () => {
    router.push("/");
  };
  const options: StripeElementsOptions = {
    // clientSecret, // This will be set on the checkout page
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <main>
      <Elements stripe={stripePromise} options={options}>
        <ApplicationFlow onBack={handleReturnHome} />
      </Elements>
    </main>
  );
}
