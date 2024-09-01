import Logout from "@/lib/components/LogoutButton/page";
import OTPForm from "@/lib/components/OTPForm/page";
import { redirect } from "next/navigation";
import React from "react";

export default async function OTP() {
  const getAuth = async () => {
    const { cookies } = await import("next/headers");
    return cookies().get("user")?.value;
  };

  const v = await getAuth();
  if (!v) redirect("/");
  return (
    <div className="h-dvh bg-white flex flex-col items-center justify-center">
      <div className="w-1/3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="font-medium text-3xl mb-11 self-center">
              Authorize transfer
            </p>
            <p className="font-normal text-xs self-center">
              Kindly provide OTP sent to your email
            </p>
          </div>
          <Logout />
        </div>

        <OTPForm />
      </div>
    </div>
  );
}
