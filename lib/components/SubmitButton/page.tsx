"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  label: string;
};

export default function Submit({ label }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-black text-white w-full mt-5 rounded py-3"
      aria-disabled={pending}
      type="submit"
    >
      {pending ? "Loading..." : label}
    </button>
  );
}
