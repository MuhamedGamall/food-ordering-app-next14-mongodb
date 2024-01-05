import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { UserInfos } from "@/models/UserInfos";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user: any = await User.findOne({ email });
    const userInfos: any = await UserInfos.findOne({ email });
    const admin = userInfos?.admin;
    const url = new URL(req.url);
    const _id = url.searchParams.get("order_id");

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // order
    if (_id) {
      return NextResponse.json(await Order.findById(_id));
    }

    // orders for admin
    if (admin) {
      const orders = await Order.find();
      return NextResponse.json(orders);
    }

    // orders for all users admin or normal user
    if (email) {
      return NextResponse.json(await Order.find({ email }));
    }
  } catch (error) {
    console.log("[ORDERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
