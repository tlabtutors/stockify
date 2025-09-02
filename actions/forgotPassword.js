"use server";

import { prisma } from "@/prisma/prisma";
import { ForgotPasswordSchema } from "@/schemas";
import { sendEmail } from "@/utils/emailHelper";
import { generateVerificationToken } from "@/lib/token";

export const forgotPassword = async (data) => {
  try {
    // Validate input
    const validatedData = ForgotPasswordSchema.safeParse(data);
    if (!validatedData.success) {
      return { success: false, message: "Invalid input data" };
    }

    const { email } = validatedData.data;
    console.log("EMAIL: ", email);

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Generate token + expiration
    const { token, tokenExpiration } = generateVerificationToken();
    const resetLink = `${process.env.APP_BASE_URL}/auth/reset-password?token=${token}`;

    // Save reset token to DB
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExp: tokenExpiration,
      },
    });

    // Prepare email
    const emailData = {
      from: `Stockiffy Inventory <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Password Reset Request",
      mailheader: `Stockiffy user account Password reset link!`,
      mailbody: `
        <p>Hello ${user.name || "User"},</p>
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    };

    await sendEmail(emailData);

    return { success: true, message: "Reset link sent to your email" };
  } catch (error) {
    console.error("ForgotPassword Error:", error);
    return {
      success: false,
      message: "An error occurred while requesting password reset",
    };
  }
};
