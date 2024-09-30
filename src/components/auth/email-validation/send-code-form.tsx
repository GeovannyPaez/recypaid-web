"use client";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import ButtonServerAction from "@/components/ui/button-server-action";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { verifyEmailCodeAction } from "@/actions/auth.actions";
type SendCodeFormProps = {
  email: string;
  isAppMobile: boolean;
};
export default function SendCodeForm({ email, isAppMobile }: SendCodeFormProps) {
  const [state, formAction] = useFormState(verifyEmailCodeAction, {
    message: "",
    error: false
  });
  const router = useRouter();

  const { message, error } = state;
  const [isCompleted, setIsCompleted] = useState(false);
  const isButtonDisabled = email === "" || !isCompleted;
  useEffect(() => {
    if (!error && message) {
      if (isAppMobile) {
        window.location.href = `recypaid://email-verified`;
        return;
      }
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, message]);

  return (
    <form action={formAction} className="pt-4">
      <div className="grid gap-2 w-full">
        <input type="hidden" name="email" value={email} />
        <Label htmlFor="verificationCode">Verificación de codigo</Label>
        <InputOTP
          onComplete={() => setIsCompleted(true)}
          name="code"
          id="verificationCode"
          maxLength={5}
          pattern="^[0-9]+$"
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
        </InputOTP>
        {message && (
          <p
            className={`text-sm ${(!error && message) ? "text-green-500" : "text-red-500"
              }`}
          >
            {message}
          </p>
        )}
      </div>
      <ButtonServerAction disabled={isButtonDisabled} className="mt-2">
        Verificar Codigo
      </ButtonServerAction>
    </form>
  );
}
