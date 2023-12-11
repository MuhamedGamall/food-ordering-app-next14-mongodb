import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function PATCH(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const values = await req.json();

    const session = await getServerSession(authOptions);

    const email = session?.user?.email;
    const user = await User.findOne({ email });

    if (
      !user &&
      (!values?.name || !values?.image) &&
      values?.name.length === 0
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    } else {
      const result = await User.updateOne({ email }, values);

      return NextResponse.json(result);
    }
  } catch (error) {
    console.log("[EDIT-PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    mongoose.connect(process.env.MONGO_URL!);

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return Response.json(user);
  } catch (error) {
    console.log("[EDIT-PROFILE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
