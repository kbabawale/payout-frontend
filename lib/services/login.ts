"use server";
import Joi from "joi";
import { HTTPResponse } from "../model/HttpResponse";
import { LoginResponse } from "../model/LoginResponse";
import { cookies } from "next/headers";

export async function processLogin(prevState: any, formData: FormData) {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    });
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const validation = await schema.validateAsync(rawFormData);

    if (validation.error) {
      return {
        message: validation.error.message,
      };
    }

    const res = await fetch(`${process.env.API_HOST}/payout/login`, {
      method: "POST",
      body: JSON.stringify(rawFormData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = (await res.json()) as HTTPResponse<LoginResponse>;

    if (!res.ok) {
      return { message: json.message };
    }

    //save token in cookie
    cookies().set(
      "user",
      JSON.stringify({
        access_token: json.data.access_token,
        id: json.data.id,
        name: json.data.userName,
      }),
      {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 3600 * 1000), //1h
        sameSite: "lax",
        path: "/",
      }
    );
  } catch (err: any) {
    return { message: err.message };
  }
}
