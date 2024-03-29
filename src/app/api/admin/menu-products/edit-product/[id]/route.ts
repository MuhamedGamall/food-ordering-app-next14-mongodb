import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { MenuProduct } from "@/models/MenuProducts";
import { authOptions } from "@/lib/auth-option";
import { UserInfos } from "@/models/UserInfos";

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const { _id, ...otherData } = await req.json();

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });
    const userInfos: any = await UserInfos.findOne({ email });
    if (!user || !userInfos?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!Object.values(otherData).every(Boolean)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const editProduct = await MenuProduct.findByIdAndUpdate(id, otherData);
    return NextResponse.json(editProduct);
  } catch (error) {
    console.log("[EDIT-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
