import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfos } from "@/models/UserInfos";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);

  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user: any = await User.findOne({ email });
    const userInfos: any = await UserInfos.findOne({ email });

    if (!user || !userInfos.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const users: any = await User.find();
    const usersInfos: any = await UserInfos.find();

    // Merge user data
    const mergedArray = users.map((user: any) => ({
      ...user._doc,
      ...(usersInfos.find((info: any) => user.email === info.email)._doc || {}),
    }));

    return NextResponse.json(mergedArray);
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
