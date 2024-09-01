"use client";
import React, { useEffect } from "react";
import Submit from "../SubmitButton/page";
import { useFormState } from "react-dom";
import { processAuthorizeTransfer } from "@/lib/services/authorizeTransfer";
import { useRouter } from "next/navigation";

export default function OTPForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(processAuthorizeTransfer, null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  useEffect(() => {
    if (state?.response) {
      setTimeout(() => {
        router.push("/payout");
      }, 2000);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="flex mt-2">
        <input
          className="border-2 p-2 mt-2"
          type="text"
          name="authorizationCode"
          id="authorizationCode"
          required
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex flex-col mt-2">
        <Submit label="Authorize Transfer" />
      </div>

      <div aria-live="polite" className="text-red-500 font-medium mt-3">
        {state?.message}
      </div>
      <div aria-live="polite" className="text-green-600 font-medium mt-3">
        {state?.response}
      </div>
    </form>
  );
}
