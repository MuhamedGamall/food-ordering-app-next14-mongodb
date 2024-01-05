import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(req: Request) {
  const reqBuffer = await req.text();
  const signature = headers().get("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      signature,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET_KEY
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event?.data?.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const orderId = session?.metadata?.orderId;
  const isPaid = session?.payment_status === "paid";

  if (event.type === "checkout.session.completed") {
    if (!userId || !orderId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }
    if (isPaid) {
      await Order.updateOne({ _id: orderId }, { paid: true });
    }
  } else {
    return new NextResponse(
      `Webhook Error: Unhandled event type ${event.type}`,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
