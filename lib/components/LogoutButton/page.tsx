"use client";

import { logout } from "@/lib/services/logout";
import React from "react";

export default function Logout() {
  return (
    <button
      onClick={() => logout()}
      className="bg-red-400 text-white rounded p-2"
      type="button"
    >
      Logout
    </button>
  );
}
