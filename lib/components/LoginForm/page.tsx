"use client";

import React from "react";
import { useFormState } from "react-dom";
import Submit from "../SubmitButton/page";
import { processLogin } from "@/lib/services/login";

export default function LoginForm() {
  const [state, formAction] = useFormState(processLogin, null);

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
        <label htmlFor="email">Email</label>
        <input
          className="border-2 p-2 mt-2"
          type="email"
          name="email"
          id="email"
          required
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="password">Password</label>
        <input
          className="border-2 p-2 mt-2"
          type="password"
          name="password"
          id="password"
          required
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <Submit label="Login" />
      </div>

      <div aria-live="polite" className="text-red-400 font-medium mt-3">
        {state?.message}
      </div>
    </form>
  );
}
