import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
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
  // callbacks: {
  //   async jwt({ token, account, profile }) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin
  //     if (account) {
  //       token.accessToken = account.access_token
  //       token.id = profile.id
  //     }
  //     return token
  //   },
  //   async session({ session, token, user }) {
  //     // Send properties to the client, like an access_token and user id from a provider.
  //     session.accessToken = token.accessToken
  //     session.user.id = token.id

  //     return session
  //   }
  // },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
