"use server";

import Joi from "joi";
import { HTTPResponse } from "../model/HttpResponse";
import { LoginResponse } from "../model/LoginResponse";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const processAuthorizeTransfer = async (
  prevState: any,
  formData: FormData
) => {
  let redirectPath = null;
  try {
    const schema = Joi.object({
      authorizationCode: Joi.number().required(),
    });
    let rawFormData = {
      authorizationCode: formData.get("authorizationCode"),
    };
    const validation = await schema.validateAsync(rawFormData);

    if (validation.error) {
      return {
        message: validation.error.message,
      };
    }

    const user = cookies().get("user")?.value;
    if (!user) {
      redirectPath = "/";
      throw new Error("REDIRECT");
    }

    const accessToken = JSON.parse(user).access_token;

    const payload = { ...rawFormData, userId: JSON.parse(user).id };

    const res = await fetch("http://localhost:3000/api/v1/payout/transfer", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const json = (await res.json()) as HTTPResponse<LoginResponse>;

    if (!res.ok) {
      if (res.status === 401) {
        redirectPath = "/";
        throw new Error("REDIRECT");
      }
      return { message: json.message };
    }

    return { response: json.message };
  } catch (err: any) {
    if (err.message === "REDIRECT" && redirectPath) {
      redirect(redirectPath);
    }
    return { message: err.message };
  }
};
