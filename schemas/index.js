import * as z from "zod";
export const RegisterSchema = z.object({
  companyName: z
    .string()
    .min(6, { message: "Please enter your business/company name" }),
  phoneNumber: z.string().min(6, { message: "Please enter your phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(1, { message: "Please enter your name" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  passwordConfirmation: z.string().min(6, { message: "Password mis-matched" }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Incorrect Credentials 2" }),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter the email associated with your account" }),
});

export const ResetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  token: z.string().nonempty("Authentication token is required"),
});
