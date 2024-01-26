import { authOptions } from "@/lib/auth-option";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { UserInfos } from "@/models/UserInfos";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    const userInfos: any = await UserInfos.findOne({ email });
    const admin = userInfos?.admin;
    const url = new URL(req.url);
    const _id = url.searchParams.get("order_id");

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // order
    if (_id) {
      const order = await Order.findById(_id);
      return NextResponse.json(order);
    }

    // orders for admin
    if (admin) {
      const orders = await Order.find({ paid: true });
      return NextResponse.json(orders);
    }

    // orders for all users admin or normal user
    if (email) {
      const orders = await Order.find({ email });
      return NextResponse.json(orders);
    }
  } catch (error) {
    console.log("[ORDERS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
