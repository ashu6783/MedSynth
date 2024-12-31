import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/lib/actions/user.actions";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Define the NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          const user = await loginUser(credentials.email, credentials.password);
          if (user) {
            return user;
          }
        }
        return null; // Return null if no user is found
      },
    }),
  ],
  session: {
    strategy: "jwt", // Using "jwt" for token-based sessions
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach user ID to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id as string; // Attach token ID to the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env file
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export the HTTP methods explicitly for Next.js route handling
export const GET = handler;
export const POST = handler;
