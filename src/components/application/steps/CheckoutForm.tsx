"use client";

import { FormEvent, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";

// Define the props interface
interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm = ({ amount }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);
    setErrorMessage(undefined);

    // 1. Trigger form validation and collect data from the PaymentElement.
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);
      return;
    }

    // 2. Confirm the payment on the client side.
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    // This point will only be reached if there is an immediate error.    // Otherwise, the user will be redirected to the `return_url`.
    if (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2 pb-4 border-b">
        <h2 className="text-2xl font-serif font-bold text-gray-900">
          Secure Payment
        </h2>
        <p className="font-semibold text-gray-800 text-lg">
          Amount to Pay:{" "}
          <span className="font-bold text-blue-600">${amount.toFixed(2)}</span>
        </p>
        <p className="text-gray-600">
          Please provide your card details below. Your transaction is secure.
        </p>
      </div>

      <PaymentElement id="payment-element" />

      <Button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full mt-6"
        size="lg"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          `Pay $${amount.toFixed(2)} and Submit`
        )}
      </Button>

      {errorMessage && (
        <div className="mt-4 text-sm text-red-600 text-center">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
