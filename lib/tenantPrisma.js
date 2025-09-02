import { prisma } from "@/prisma/prisma";
import { getToken } from "next-auth/jwt";

export async function tenant(model, req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.companyId) throw new Error("Unauthorized: missing companyId");

  const companyId = token.companyId;
  const modelClient = prisma[model];
  if (!modelClient) throw new Error(`Prisma model ${model} not found`);

  return {
    findMany: (args = {}) =>
      modelClient.findMany({
        ...args,
        where: { companyId, ...(args.where || {}) },
      }),
    findUnique: (args) =>
      modelClient.findFirst({
        ...args,
        where: { companyId, ...(args.where || {}) },
      }),
    create: (args) =>
      modelClient.create({
        ...args,
        data: { companyId, ...(args.data || {}) },
      }),
    update: (args) =>
      modelClient.updateMany({
        ...args,
        where: { companyId, ...(args.where || {}) },
        data: args.data,
      }),
    delete: (args) =>
      modelClient.deleteMany({
        ...args,
        where: { companyId, ...(args.where || {}) },
      }),
  };
}
