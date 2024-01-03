import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import totalCartPrice from "@/utils/total-cart-price";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(req: NextRequest) {
  try {
    const { cart, address } = await req.json();
    mongoose.connect(process.env.MONGO_URL!);

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    const user = await User.findOne({ email });

    if (Object.values({ address }).every(Boolean) || cart.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const createOrder = await Order.create({
      userEamil: email,
      ...address,
      cart,
      paid: false,
    });

    const stripeLineItems = [];
    for (const cartProduct of cart) {
      const productName = cartProduct?.title;
      const productPrice =
        (+cartProduct?.base_price +
          +cartProduct?.size?.extra_price +
          (cartProduct?.extra_increases_price.reduce(
            (a: any, c: any) => a + +c?.extra_price,
            0
          ) || 0)) *
        +cartProduct?.quantity;
      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: productName,
          },
          // unit_amount: productPrice * 100,
        },
      });
    }

    const stripeSession = await stripe.checkout.session.create({
      line_items: [],
      mode: "payment",
      customer_email: email,
      success_url: process.env.NEXTAUTH_URL + "cart?success=1",
      cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
      metadata: { orderId: createOrder._id },
      shopping_options: [
        {
          dispaly_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: {
            currency: "USD",
            amount: 500,
          },
        },
      ],
    });
    // await UserInfos.create({ email, admin: false });

    // return NextResponse.json(createdUser);
  } catch (error) {
    console.log("[CREATE-ACOUNT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}