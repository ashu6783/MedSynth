import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string; // Add the id property to Session
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Add the id property to JWT
  }
}
