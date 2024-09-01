"use client";
import React from "react";
import Submit from "../SubmitButton/page";
import { useFormState } from "react-dom";
import { processInitiateTransfer } from "@/lib/services/initiateTransfer";
import { Bank } from "@/lib/model/Bank";

type Props = {
  banks?: Bank[];
};

export default function InitiatePayoutForm({ banks }: Props) {
  const [state, formAction] = useFormState(processInitiateTransfer, null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form action={formAction}>
      <div className="flex flex-col mt-2">
        <label htmlFor="accountNumber">Account Number</label>
        <input
          className="border-2 p-2 mt-2"
          type="number"
          name="accountNumber"
          id="accountNumber"
          required
        />
      </div>

      <div className="flex flex-col mt-2">
        <label htmlFor="bankCode">Bank</label>
        <select
          className="border-2 p-2 mt-2"
          required
          name="bankCode"
          id="bankCode"
        >
          {banks &&
            banks.map((bank) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col mt-2">
        <label htmlFor="amount">Amount</label>
        <input
          className="border-2 p-2 mt-2"
          type="number"
          name="amount"
          id="amount"
          required
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex flex-col mt-2">
        <Submit label="Initiate Transfer" />
      </div>

      <div aria-live="polite" className="text-red-400 font-medium mt-3">
        {state?.message}
      </div>
    </form>
  );
}
