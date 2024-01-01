import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { Favorite } from "@/models/Favorite";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get("productId");

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user = await User.findOne({ email });

    if (!productId) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const addToFavorite = await Favorite.create({ _id: productId });
    return NextResponse.json(addToFavorite);
  } catch (error) {
    console.log("[FAVORITE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get("productId");

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const removeFavorite = await Favorite.deleteOne({ _id: productId });
    return NextResponse.json(removeFavorite);
  } catch (error) {
    console.log("[FAVORITE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user: any = await User.findOne({ email });
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const favorites = await Favorite.find();
    return NextResponse.json(favorites);
  } catch (error) {
    console.log("[FAVORITE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
