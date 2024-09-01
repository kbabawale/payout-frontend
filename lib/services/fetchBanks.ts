import { cookies } from "next/headers";
import { HTTPResponse } from "../model/HttpResponse";
import { Bank } from "../model/Bank";
import { redirect } from "next/navigation";

export const fetchBanks = async () => {
  try {
    const user = cookies().get("user")?.value;
    if (!user) {
      redirect("/");
    }

    const accessToken = JSON.parse(user).access_token;

    const res = await fetch("http://localhost:3000/api/v1/payout/bank", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const json = (await res.json()) as HTTPResponse<Bank[]>;

    if (!res.ok) {
      return { message: json.message };
    }

    return {
      response: json.data,
    };
  } catch (err: any) {
    return { message: err.message };
  }
};
