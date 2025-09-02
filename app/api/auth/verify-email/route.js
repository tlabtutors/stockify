import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Token is required", status: 400 });
  }

  // Use findUnique since verifyToken is now @unique
  const user = await prisma.user.findFirst({
    where: { verifyToken: token },
  });

  // Check expiration separately
  if (!user || !user.verifyTokenExp || user.verifyTokenExp < new Date()) {
    return NextResponse.json({
      message: "Invalid or expired token",
      status: 400,
    });
  }

  // Update user as verified
  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      verifyToken: null,
      verifyTokenExp: null,
    },
  });

  return NextResponse.json({ message: "Email verified successfully" });
}
