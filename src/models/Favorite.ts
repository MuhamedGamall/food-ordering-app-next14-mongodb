import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  extra_price: String,
});

const FavoriteSchema = new Schema(
  {
    product_id: { type: mongoose.Types.ObjectId },
    size: { type: ExtraPriceSchema },
    extra_increases_price: { type: [ExtraPriceSchema] },
    quantity: String,
  },
  { timestamps: true }
);

export const Favorite = models?.Favorite || model("Favorite", FavoriteSchema);
