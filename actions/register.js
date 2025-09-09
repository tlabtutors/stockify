"use server";
import { hash } from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { prisma } from "@/prisma/prisma";
import { sendEmail } from "@/utils/emailHelper";
import { generateVerificationToken } from "@/lib/token";

export const register = async (data) => {
  try {
    const validatedData = RegisterSchema.parse(data);
    if (!validatedData) return { error: "Invalid input data" };

    const {
      email,
      name,
      companyName,
      phoneNumber,
      password,
      passwordConfirmation,
    } = validatedData;

    if (password !== passwordConfirmation) {
      return { error: "Password mis-matched!" };
    }

    const lowerCasedEmail = email.toLowerCase();
    const userExists = await prisma.user.findFirst({
      where: { email: lowerCasedEmail },
    });
    if (userExists) return { error: "User already exists" };
    // Step 1: Check if company already exists
    let company = await prisma.company.findFirst({
      where: { name: companyName },
    });

    // Step 2: If not, create company with domain
    if (!company) {
      const domain = `${companyName
        .toLowerCase()
        .replace(/\s+/g, "-")}.stockiffy.com`;

      company = await prisma.company.create({
        data: {
          name: companyName,
          domain,
        },
      });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: lowerCasedEmail,
        password: hashedPassword,
        name,
        phoneNumber,
        companyId: company.id,
        role: "ADMIN",
      },
    });

    const { token, tokenExpiration } = generateVerificationToken();
    const verificationLink = `${process.env.APP_BASE_URL}/auth/verify-email?token=${token}`;

    await prisma.user.update({
      where: { id: user.id },
      data: { verifyToken: token, verifyTokenExp: tokenExpiration },
    });

    await sendEmail({
      from: `Stockiffy Inventory <${process.env.SMTP_EMAIL}>`,
      to: lowerCasedEmail,
      subject: `Stockiffy user account signup notification!`,
      mailheader: `Stockiffy user account signup notification!`,
      mailbody: `Thank you for signing up. Verify your email here: ${verificationLink}`,
    });

    return { success: "Check your email to verify your account!" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
};
