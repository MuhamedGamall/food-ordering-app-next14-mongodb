import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    admin: { type: Boolean, default: false },
    email: String,
    phone: String,
    street_address: String,
    postal_code: String,
    city: String,
    country: String,
    cart: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);
