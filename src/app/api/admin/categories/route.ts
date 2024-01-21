import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Category } from "@/models/Categories";
import { UserInfos } from "@/models/UserInfos";
export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const { title, image } = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user
    const email = user?.email;

    const userInfos: any = await UserInfos.findOne({ email });

    if (!title || !image) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (!user || !userInfos?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const createCategory = await Category.create({ title, image });
    return NextResponse.json(createCategory);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const { _id, title, image } = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user
    const email = user?.email;

    const userInfos: any = await UserInfos.findOne({ email });

    if (!title && !image) {
      return new NextResponse("Not Found", { status: 404 });
    }
    if (!user || !userInfos?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const editCategory = await Category.updateOne({ _id }, { title, image });
    return NextResponse.json(editCategory);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user
    const email = user?.email;

    const category = await Category.find();

    const url = new URL(req.url);
    const _ids = url.searchParams.get("_ids")?.split(",");



    const userInfos: any = await UserInfos.findOne({ email });

    if (!user || !userInfos?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (_ids?.length! > 0) {
      const deleteMenyCategories = await Category.deleteMany({
        _id: { $in: _ids },
      });
      return NextResponse.json(deleteMenyCategories);
    }
    if (category.length > 0) {
      const deleteAllCategories = await Category.deleteMany({});
      return NextResponse.json(deleteAllCategories);
    }
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const categories = await Category.find()
      .sort([["createdAt", -1]])
      .exec();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
