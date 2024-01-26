import { User } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
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

    if (!Object.values(address).every(Boolean) || cart.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const createOrder = await Order.create({
      email,
      ...address,
      cart,
      paid: false,
    });
    // calculator price for one product in all products
    const stripeLineItems = [];
    for (const cartProduct of cart) {
      const productName = cartProduct?.title;
      const productQuantity = +cartProduct?.quantity;
      const productPrice =
        (+cartProduct?.base_price || 0) +
        (+cartProduct?.size?.extra_price || 0) +
        (cartProduct?.extra_increases_price.reduce(
          (a: any, c: any) => a + (+c?.extra_price || 0),
          0
        ) || 0);

      stripeLineItems.push({
        quantity: productQuantity,

        price_data: {
          currency: "USD",
          product_data: {
            name: productName,
          },
          unit_amount: productPrice * 100,
        },
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: email,
      success_url:
        process.env.NEXTAUTH_URL +
        "orders/" +
        createOrder._id.toString() +
        "?success=1",
      cancel_url: process.env.NEXTAUTH_URL + "cart?canceled=1",
      metadata: {
        orderId: createOrder._id.toString(),
        userId: user?._id.toString(),
      },
      payment_intent_data: {
        metadata: {
          orderId: createOrder._id.toString(),
          userId: user?._id.toString(),
        },
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "USD" },
          },
        },
      ],
    });

    return NextResponse.json(stripeSession.url);
  } catch (error) {
    console.log("[CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
