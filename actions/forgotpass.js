"use server";
import { ForgotpassSchema } from "@/schemas";
import { prisma } from "@/prisma/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const forgotpass = async (data) => {
  const validatedData = ForgotpassSchema.parse(data);
  if (!validatedData) {
    return { error: "Invalid email" };
  }
  const { email } = validatedData;
  const userExists = await prisma.user.findFirst({ where: { email } });
  if (!userExists || !userExists.email) {
    return { error: "User with the email not found" };
  }
  try {
    await signIn("credentials", {
      email: userExists.email,
      password: password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Please confirm your email" };
      }
    }
    throw error;
  }
  return { success: "User logged in successfully" };
};
