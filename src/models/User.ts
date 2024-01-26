import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

export const User = models?.User || model<any>("User", UserSchema);
