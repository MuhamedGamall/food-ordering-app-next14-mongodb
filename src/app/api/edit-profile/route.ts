import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function PUT(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const { name } = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user = await User.findOne({ email });

    if (!user && !name && name.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      await User.updateOne({ email }, { name });

    }

    return NextResponse.json(true);
  } catch (error) {
    console.log("[EDIT-PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
