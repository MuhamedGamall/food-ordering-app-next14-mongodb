import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";

import { MenuProduct } from "@/models/MenuProducts";
import { UserInfos } from "@/models/UserInfos";

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const product = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    const userInfos: any = await UserInfos.findOne({ email });
    if (!user || !userInfos.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!Object.values({ product }).every(Boolean)) {
      return new NextResponse("Not Found", { status: 404 });
    }
    const createProduct = await MenuProduct.create(product);
    return NextResponse.json(createProduct);
  } catch (error) {
    console.log("[ADD-PRODUCTT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const menuProducts = await MenuProduct.find();

    return NextResponse.json(menuProducts);
  } catch (error) {
    console.log("[EDIT-PRODUCT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const products = await MenuProduct.find();

    const url = new URL(req.url);
    const _ids = url.searchParams.get("_ids")?.split(",");

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    const userInfos: any = await UserInfos.findOne({ email });

    if (!user || !userInfos?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (_ids?.length! > 0) {
      const deleteMenyProducts = await MenuProduct.deleteMany({
        _id: { $in: _ids },
      });
      return NextResponse.json(deleteMenyProducts);
    }
    if (products.length > 0) {
      const deleteAllProducts = await MenuProduct.deleteMany({});
      return NextResponse.json(deleteAllProducts);
    }
  } catch (error) {
    console.log("[MENU-PRODCUTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
