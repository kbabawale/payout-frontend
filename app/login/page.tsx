import React from "react";
import LoginForm from "../../lib/components/LoginForm/page";
import { redirect } from "next/navigation";

export default async function Login() {
  const getAuth = async () => {
    const { cookies } = await import("next/headers");
    return cookies().get("user")?.value;
  };

  if (await getAuth()) redirect("/payout");

  return (
    <div className="h-dvh w-full bg-white flex flex-col items-center justify-center">
      <div className="w-1/3">
        <p className="font-medium text-3xl mb-11">Login</p>
        <LoginForm />
      </div>
    </div>
  );
}
