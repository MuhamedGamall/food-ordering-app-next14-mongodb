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
    const user = session?.user;
    const email = user?.email;

    const userInfos: any = await UserInfos.findOne({ email });

    if (!user || !userInfos.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const users: any = await User.find().lean();
    const usersInfos: any = await UserInfos.find().lean();

    // Merge main user and user info data
    const mergedArray = users.map((user: any) => ({
      ...user,
      ...usersInfos.find((info: any) => user.email === info.email),
    }));

    return NextResponse.json(mergedArray);
  } catch (error) {
    console.log("[USERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
