import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import { UserInfos } from "@/models/UserInfos";

export async function PATCH(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const { _id, name, email, image, ...otherData } = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;

    // let filter = {};
    // if (_id) {
    //   filter = { _id };
    // } else {
    //   const email = session?.user?.email;
    //   filter = { email };
    // }

    if (!user && !name && name?.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const userData = await User.updateOne(filter, { name, image });
    // const userInfos = await UserInfos.findOneAndUpdate(
    //   { email: user?.email },
    //   otherData,
    //   { upsert: true }
    // );

    const userData = await User.updateOne(
      { email: user?.email },
      { name,image }
    ).lean();

    const userInfos = await UserInfos.updateOne(
      { email: user?.email },
      otherData
    ).lean();

    const fullData = { ...userData, ...userInfos };

    return NextResponse.json(fullData);
  } catch (error) {
    console.log("[EDIT-PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email }).lean()
    const userInfos = await UserInfos.findOne({ email }).lean()
    const fullData = { ...userInfos, ...user};

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    return NextResponse.json(fullData);
  } catch (error) {
    console.log("[EDIT-PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
