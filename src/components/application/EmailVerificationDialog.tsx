"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EmailVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerified: () => void; // Callback to run on successful verification
}

export function EmailVerificationDialog({
  isOpen,
  onClose,
  email,
  onVerified,
}: EmailVerificationDialogProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    // --- DIALOG DEBUG LOG ---
    console.log(
      `DIALOG: Clicking "Verify". Sending email: "${email}", code: "${code}"`
    );

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("DIALOG: API returned an error.", data);
        throw new Error(data.message || "Verification failed.");
      }

      console.log("DIALOG: API returned success. Calling onVerified().");
      onVerified();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendCode = async () => {
    toast.info("Sending a new verification code...");
    try {
      await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      toast.success("A new code has been sent to your email.");
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to send new code. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verify Your Email</DialogTitle>
          <DialogDescription>
            We&#39;ve sent a 6-digit code to <strong>{email}</strong>. Please
            enter it below to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <DialogFooter className="sm:flex-col sm:space-y-2">
          <Button
            type="button"
            onClick={handleVerify}
            disabled={isLoading || code.length < 6}
            className="w-full"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify & Continue
          </Button>
          <Button
            variant="link"
            size="sm"
            onClick={handleResendCode}
            className="text-xs"
          >
            Didn`&#39;t receive a code? Resend
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
