import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  extra_price: String,
});

const MenuProductSchema = new Schema(
  {
    image: { type: String },
    title: { type: String },
    description: { type: String },
    category: { category_id: mongoose.Types.ObjectId, title: String },
    base_price: { type: String },
    sizes: { type: [ExtraPriceSchema] },
    extra_increases_price: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

export const MenuProduct =
  models?.MenuProduct || model<any>("MenuProduct", MenuProductSchema);
