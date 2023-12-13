import { model, models, Schema } from "mongoose";

const UserInfosSchema = new Schema(
  {
    admin: { type: Boolean, default: false },
    phone: { type: String },
    email: { type: String, required: true },
    street_address: { type: String },
    postal_code: { type: String },
    city: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

export const UserInfos =
  models?.UserInfos || model("UserInfos", UserInfosSchema);
