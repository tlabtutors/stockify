import { prisma } from "@/prisma/prisma";

export const getAccountById = async (userId) => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId },
    });
    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
};
