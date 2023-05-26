import prisma from "@/lib/server/client";
import type { DefaultSession, ISODateString, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";

declare module "next-auth" {
  export interface Session {
    user?: DefaultSession["user"] & { id?: string };
    expires: ISODateString;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (session?.user) session.user.id = user.id;

      return session;
    },
  },
  session: {
    maxAge: 60 * 60 * 24, // 세션 유효 기간 설정 (예: 1일)
  },
  secret: process.env.SECRET as string,
};
export default NextAuth(authOptions);
