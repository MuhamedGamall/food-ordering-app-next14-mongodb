import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  extra_price: String,
});

const FavoriteSchema = new Schema(
  {
    _id: { type: mongoose.Types.ObjectId },
  },
  { timestamps: true }
);

export const Favorite = models?.Favorite || model("Favorite", FavoriteSchema);
