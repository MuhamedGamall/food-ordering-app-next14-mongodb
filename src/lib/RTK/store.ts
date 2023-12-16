import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./slices/categories-slice";
import uploadImageSlice from "./slices/upload-image-slice";
import menuProductsSlice from "./slices/menu-products-slice";

const store = configureStore({
  reducer: {
    imageURL: uploadImageSlice,
    catygories: categoriesSlice,
    menuProducts: menuProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
