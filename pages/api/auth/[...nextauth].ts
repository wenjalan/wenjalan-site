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
    async signIn({ user, account, profile }) {
      console.log(`signIn :: user=${user} account=${account} profile=${profile}`)
      return true
    },

    async session({ session, token }) {
      console.log(`session :: session=${session} token=${token}`)
      return session
    },

    async redirect({ url, baseUrl }) {
      console.log(`redirect :: url=${url} baseUrl=${baseUrl}`)
      return ""
    }
  }
}

export default NextAuth(authOptions)