import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Category } from "@/models/Categories";
export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const { title } = await req.json();

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });

    if (!user && !user?.admin && !title && title?.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const createCategory = Category.create({ title });
    return NextResponse.json(createCategory);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const { _id, title } = await req.json();

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });

    if (!user && !user?.admin && !title && title?.length === 0) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const editCategory = await Category.updateOne({ _id }, { title });
    return NextResponse.json(editCategory);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const url = new URL(req.url);
    const _ids = url.searchParams.get("_ids")?.split(',')


    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });

    if (!user && !user?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (_ids?.length! > 0) {
      const deleteMenyCategories = await Category.deleteMany({
        _id: { $in: _ids},
      });
      return NextResponse.json(deleteMenyCategories);
    }

    // const deleteCategory = await Category.deleteOne({ _id: _ids?.[0] });

    // return NextResponse.json(deleteCategory);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user: any = await User.findOne({ email });

    if (!user && !user?.admin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const categories = await Category.find()
      .sort([["createdAt", -1]])
      .exec();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
