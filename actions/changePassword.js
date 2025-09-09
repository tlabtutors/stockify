"use server";
import { prisma } from "@/prisma/prisma";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { ChangePasswordSchema } from "@/schemas";

export const changePassword = async (data) => {
  try {
    const { currentPassword, newPassword, token } =
      ChangePasswordSchema.parse(data);

    if (!token) {
      return { error: "Not authenticated." };
    }

    // decode JWT to get user ID
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    const userId = decoded.sub || decoded.id;

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) return { error: "User not found." };

    const isValid = await compare(currentPassword, user.password);
    if (!isValid) return { error: "Current password is incorrect." };

    const hashedPassword = await hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { success: "Password updated successfully. Please log in again." };
  } catch (error) {
    console.error("Change password error:", error);
    return { error: "An error occurred while updating the password." };
  }
};
