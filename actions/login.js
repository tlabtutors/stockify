"use server";
import { LoginSchema } from "@/schemas";
import { prisma } from "@/prisma/prisma";
import { signIn } from "@/auth/auth";
import { AuthError } from "next-auth";

export const login = async (data) => {
  const validatedData = LoginSchema.parse(data);
  if (!validatedData) {
    return { error: "Invalid input data" };
  }
  const { email, password } = validatedData;
  const userExists = await prisma.user.findUnique({ where: { email } });
  //const userExists = await prisma.user.findFirst({ where: { email } });
  if (!userExists || !userExists.password || !userExists.email) {
    return { error: "User not found!" };
  }
  try {
    await signIn("credentials", {
      email: userExists.email,
      password,
      //redirectTo: "/",
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Email confirmation required to login" };
      }
    }
    throw error;
  }
  return { success: "User logged in successfully" };
};
