import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  extra_price: String,
});

const FavoriteSchema = new Schema(
  {
    email: String,
    product_id: { type: mongoose.Types.ObjectId },
    image: { type: String },
    title: { type: String },
    description: { type: String },
    category: { category_id: mongoose.Types.ObjectId, title: String },
    base_price: { type: String },
    size: { type: ExtraPriceSchema },
    extra_increases_price: { type: [ExtraPriceSchema] },
    quantity: { type: String, default: '0' }
  },
  { timestamps: true }
);

export const Favorite = models?.Favorite || model<any>("Favorite", FavoriteSchema);
