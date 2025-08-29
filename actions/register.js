"use server";
import { hash } from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { prisma } from "@/prisma/prisma";
import { sendEmail } from "@/utils/emailHelper";
import { generateVerificationToken } from "@/lib/token";

export const register = async (data) => {
  try {
    const validatedData = RegisterSchema.parse(data);
    if (!validatedData) {
      return { error: "Invalid input data" };
    }
    const { email, name, password, passwordConfirmation } = validatedData;
    if (password !== passwordConfirmation) {
      return { error: "Password mis-matched!" };
    }
    //const hashPassword = await bcrypt.hash(password, 10);
    const hashPassword = await hash(password, 10);
    // Generate a new token and expiration
    const { token, tokenExpiration } = generateVerificationToken();
    const verificationLink = `${process.env.APP_BASE_URL}/auth/verify-email?token=${token}`;

    const userExists = await prisma.user.findFirst({ where: { email } });
    if (userExists) {
      return { error: "User already exists" };
    }
    const lowerCasedEmail = email.toLocaleLowerCase();
    const user = await prisma.user.create({
      data: {
        email: lowerCasedEmail,
        password: hashPassword,
        name,
      },
    });
    const email_data = {
      from: `AmHosted Inc <${process.env.SMTP_EMAIL}>`,
      to: lowerCasedEmail,
      subject: `Amhosted user account signup notification!`,
      mailheader: `Amhosted user account signup notification!`,
      mailbody: `Thank you for signing up for a user account on AmHosted. Please find the link below to verify your email and activated your AmHosted account <br /><br /> ${verificationLink}  <br /><br />If the link is not clickable, you may copy and paste it into your browser url <br /><br />Thank you for signing up to AmHosted Inc`,
    };
    if (user) {
      // Update the user's verification token
      await prisma.user.update({
        where: { id: user.id },
        data: {
          verifyToken: token,
          verifyTokenExp: tokenExpiration,
        },
      });
      sendEmail(email_data);
      return {
        success: "Check your email to verify your account!",
      };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
};
