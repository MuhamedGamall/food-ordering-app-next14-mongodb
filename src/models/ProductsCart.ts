import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  extra_price: String,
});

const ProductsCartSchema = new Schema(
  {
    product_id: { type: mongoose.Types.ObjectId },
    size: { type: ExtraPriceSchema },
    extra_increases_price: { type: [ExtraPriceSchema] },
    quantity: String,
  },
  { timestamps: true }
);

export const ProductsCart =
  models?.ProductsCart || model("ProductsCart", ProductsCartSchema);
