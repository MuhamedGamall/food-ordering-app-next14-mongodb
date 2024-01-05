import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { ProductsCart } from "@/models/ProductsCart";
export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const product = await req.json();

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user = await User.findOne({ email });

    if (!product?.product_id) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const addToCart = await ProductsCart.create({ ...product });
    return NextResponse.json(addToCart);
  } catch (error) {
    console.log("[PRODUCTS-CART]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGO_URL!);
  try {
    const url = new URL(req.url);
    const product_id = url.searchParams.get("productId");
    console.log(product_id);

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!product_id) {
      const removeAllProductFromCart = await ProductsCart.deleteMany();

      return NextResponse.json(removeAllProductFromCart);
    } else {
      const removeProductFromCart = await ProductsCart.deleteOne({_id:product_id});

      return NextResponse.json(removeProductFromCart);
    }
  } catch (error) {
    console.log("[PRODUCTS-CART]", error);
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

    const productsCart = await ProductsCart.find();
    return NextResponse.json(productsCart);
  } catch (error) {
    console.log("[PRODUCTS-CART]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
