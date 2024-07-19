"use client";
import { sendEmailCodeValidationAction } from "@/actions/auth.actions";
import ButtonServerAction from "@/components/ui/button-server-action";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
type SendEmailCodeProps = {
  email: string;
};

const TIME_TO_RESEND = 60;

export default function SendEmailCode({ email }: SendEmailCodeProps) {
  const [state, formAction] = useFormState(sendEmailCodeValidationAction, {
    message: "",
    error: false
  });
  const { message, error } = state;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [counterToResend, setCounterToResend] = useState(0);
  const isButtonDisabled = counterToResend > 0;

  useEffect(() => {
    if (message) {
      setCounterToResend(TIME_TO_RESEND);
      const interval = setInterval(() => {
        setCounterToResend((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [message]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;
    params.set("email", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form action={formAction} className="flex items-center space-x-2">
      <div className="grid flex-1 gap-1">
        <Input
          name="email"
          defaultValue={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          type="email"
        />
        {isButtonDisabled && (
          <p className="text-sm text-gray-500">
            Reenviar en {counterToResend.toString().padStart(2, "0")}
          </p>
        )}
        {message && isButtonDisabled && (
          <p
            className={`text-sm ${(!error && message) ? "text-green-500" : "text-red-500"
              }`}
          >
            {message}
          </p>
        )}
      </div>
      <ButtonServerAction disabled={isButtonDisabled}>
        Enviar Codigo
      </ButtonServerAction>
    </form>
  );
}
