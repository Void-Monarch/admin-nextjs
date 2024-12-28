// @ts-nocheck
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";


const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        if (user) {
          return true;
        }
        return false;
      }
      catch {
        return false;
      }
    },
    async session({ session }) {

      return session;
    },

  }
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
