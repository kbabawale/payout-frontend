"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  let redirectPath = null;
  try {
    cookies().delete("user");

    redirectPath = "/";
    throw new Error("REDIRECT");
  } catch (err: any) {
    if (err.message === "REDIRECT" && redirectPath) {
      redirect(redirectPath);
    }
  }
};
