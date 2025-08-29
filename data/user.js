import { prisma } from "@/prisma/prisma";

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
