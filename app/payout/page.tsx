import InitiatePayoutForm from "@/lib/components/InitiatePayoutForm/page";
import Logout from "@/lib/components/LogoutButton/page";
import { fetchBanks } from "@/lib/services/fetchBanks";
import { logout } from "@/lib/services/logout";
import { redirect } from "next/navigation";
import React from "react";

const Payout = async () => {
  const getAuth = async () => {
    const { cookies } = await import("next/headers");
    return cookies().get("user")?.value;
  };

  const v = await getAuth();
  if (!v) redirect("/");

  const { response, message } = await fetchBanks();

  return (
    <div className="h-dvh bg-white flex flex-col items-center justify-center">
      <div className="w-1/3">
        <div className="flex items-center justify-between">
          <p className="font-medium text-3xl mb-11 self-center">
            Initiate transfer
          </p>
          <Logout />
        </div>
        {message ? (
          <p className="text-red-500 font-medium">{message}</p>
        ) : (
          <InitiatePayoutForm banks={response} />
        )}
      </div>
    </div>
  );
};

export default Payout;
