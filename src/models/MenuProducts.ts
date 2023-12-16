import mongoose, {model, models, Schema} from "mongoose";

// const ExtraPriceSchema = new Schema({
//   name: String,
//   price: Number,
// });

const MenuProductSchema = new Schema({
  image: {type: String},
  title: {type: String},
  description: {type: String},
  category: {type: mongoose.Types.ObjectId},
  base_price: {type: Number},
  // sizes: {type:[ExtraPriceSchema]},
  // extraIngredientPrices: {type:[ExtraPriceSchema]},
}, {timestamps: true});

export const MenuProduct = models?.MenuProduct || model('MenuProduct', MenuProductSchema);