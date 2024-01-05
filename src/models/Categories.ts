import { model, models, Schema } from "mongoose";

const CategorySchema = new Schema(
  { title: { type: String, required: true }, image: String },
  { timestamps: true }
);

export const Category = models?.Category || model("Category", CategorySchema);
