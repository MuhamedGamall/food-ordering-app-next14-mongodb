import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserInfos } from "@/models/UserInfos";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL!);
    const pass = body.password;

    if (!pass?.length || pass.length < 5) {
      new Error("password must be at least 5 characters");
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    const createdUser = await User.create(body);
    const { email } = body;
    await UserInfos.create({ email, admin:false });

    return NextResponse.json(createdUser);
  } catch (error) {
    console.log("[CREATE-ACOUNT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
