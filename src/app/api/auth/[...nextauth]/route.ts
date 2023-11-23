import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        mongoose.connect(process.env.MONGO_URL as string);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password!, user.password);
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ],

};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
