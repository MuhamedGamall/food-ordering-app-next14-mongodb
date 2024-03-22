import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { UserInfos } from "@/models/UserInfos";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/log-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    } as any),
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

  callbacks: {
    async signIn({ user }) {
      try {
        mongoose.connect(process.env.MONGO_URL as string);

        const existingUser = await UserInfos.findOne({ email: user?.email });
        if (!existingUser) await UserInfos.create({ email: user?.email });
        return true;
      } catch (err) {
        console.log(`Error with callback: ${err}`);
        return false;
      }
    },
    async jwt({ token }) {
      mongoose.connect(process.env.MONGO_URL as string);

      const user = await UserInfos.findOne({ email: token?.email });
      const isAdmin = user?.admin;
      token.role = isAdmin ? "admin" : "member";
      return token;
    },
  },
};
