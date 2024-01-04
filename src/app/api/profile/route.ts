import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserInfos } from "@/models/UserInfos";

export async function PATCH(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const { _id, name, email, image, ...otherData } = await req.json();

    let filter = {};
    if (_id) {
      filter = { _id };
    } else {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      filter = { email };
    }

    const user = await User.findOne(filter);

    if (!user && !name && name?.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userData = await User.updateOne(filter, { name, image });
    const userInfos = await UserInfos.findOneAndUpdate(
      { email: user.email },
      otherData,
      { upsert: true }
    );
    
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
    const user = await User.find({ email });
    const userInfos = await UserInfos.findOne({ email }).lean();
    const fullData = {  ...userInfos,...user?.[0]?._doc };

    if (!fullData) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log(fullData);

    return NextResponse.json(fullData);
  } catch (error) {
    console.log("[EDIT-PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
