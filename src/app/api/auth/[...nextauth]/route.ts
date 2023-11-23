import { User } from "@/models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
// interface Credentials{
//   email: {
//       label: string;
//       type: string;
//       placeholder: string;
//   };
// password: {
//     label: string;
//     type: string;
// }
// }
const handler = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        mongoose.connect(process.env.MONGODB_URL as string);
        const email = credentials?.email;
        const password = credentials?.password;
        const user = await User.findOne({ email });
        const passwordOk =
          user && bcrypt.compareSync(password as string, user.password);
        if (passwordOk) {
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
