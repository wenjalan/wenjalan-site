import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

if (!process.env.GOOGLE_OAUTH2_CLIENT_ID) {
  throw new Error("Please define the GOOGLE_OAUTH2_CLIENT_ID environment variable inside .env.local")
}

if (!process.env.GOOGLE_OAUTH2_CLIENT_SECRET) {
  throw new Error("Please define the GOOGLE_OAUTH2_CLIENT_SECRET environment variable inside .env.local")
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session }) {
      return session
    },
  }
}

export default NextAuth(authOptions)