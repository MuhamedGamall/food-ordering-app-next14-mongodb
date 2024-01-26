import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { Favorite } from "@/models/Favorite";
import { authOptions } from "@/lib/auth-option";
export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const product = await req.json();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    if (!product) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const addToFavorite = await Favorite.create({ ...product });
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
    const _id = url.searchParams.get("_id");

    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!_id) {
      const removeAllFavorites = await Favorite.deleteMany({ email });
      return NextResponse.json(removeAllFavorites);
    } else {
      const removeFavorite = await Favorite.deleteOne({ _id, email });
      return NextResponse.json(removeFavorite);
    }
  } catch (error) {
    console.log("[FAVORITE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const email = user?.email;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const favorites = await Favorite.find({ email });
    return NextResponse.json(favorites);
  } catch (error) {
    console.log("[FAVORITE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
