// auth.config.js
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "../schemas";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcryptjs";

const authConfig = {
  //trustHost: true, //use on live server
  //useSecureCookies: true, //use on live server
  cookies: {
    sessionToken: {
      //name: "__Secure-authjs.session-token", //use on live server
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        //  secure: true, //use on live server
        //   domain: process.env.COOKIE_DOMAIN, //use on live server
      },
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedData = LoginSchema.safeParse(credentials);
        if (!validatedData.success) return null;

        const { email, password } = validatedData.data;
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user || !user.email || !user.password) return null;

        const passwordMatched = await bcrypt.compare(password, user.password);
        return passwordMatched ? user : null;
      },
    }),
  ],
};

export default authConfig;
