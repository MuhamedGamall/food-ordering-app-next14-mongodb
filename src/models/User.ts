import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String },
    street_address: { type: String },
    postal_code: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
