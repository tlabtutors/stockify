"use server";

import { prisma } from "@/prisma/prisma";
import { hash } from "bcryptjs";
import { ResetPasswordSchema } from "@/schemas";

export const resetPassword = async (data) => {
  try {
    const { token, newPassword } = ResetPasswordSchema.parse(data);
    const user = await prisma.user.findFirst({
      where: { resetToken: token },
    });

    if (!user || !user.resetTokenExp || user.resetTokenExp < new Date()) {
      return { error: "Invalid or expired reset token" };
    }

    const hashedPassword = await hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    return { success: "Password reset successfully" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while resetting the password." };
  }
};
