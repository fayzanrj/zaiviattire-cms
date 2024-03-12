import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// User interface
interface UserProps {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      // @ts-ignore
      async authorize(credentials, req) {
        // destructuring data
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_HOST}/api/user/login`,
            { username, password },
            {
              headers: {
                "Content-Type": "application/json",
                accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
              },
            }
          );

          const userDetails = response.data.user as UserProps;
          const accessToken = response.data.accessToken;

          // Setting user object to return
          const user = {
            ...userDetails,
            accessToken,
          };

          // Returing
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {}
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
