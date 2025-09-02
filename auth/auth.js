import NextAuth from "next-auth";
import { TenantPrismaAdapter } from "./tenant-prisma-adapter";
import { prisma } from "@/prisma/prisma";
import authConfig from "./auth.config.js";
import { getUserById } from "../data/user.js";
import { getAccountById } from "../data/account.js";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: TenantPrismaAdapter(prisma),

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      if (!user.id) return false;

      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) {
        return false;
      }
      return true;
    },

    async jwt({ token, user }) {
      // When user first signs in
      if (user) {
        token.id = user.id;
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountById(existingUser.id);

      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      token.role = existingUser.role;
      token.companyId = existingUser.companyId; // 👈 store tenant id

      return token;
    },

    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOauth: token.isOauth,
          role: token.role,
          companyId: token.companyId,
          email: token.email,
          name: token.name,
          image: token.image,
        },
      };
    },
  },
});
