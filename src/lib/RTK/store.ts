import { configureStore } from "@reduxjs/toolkit";
import uploadImageSlice from "./slices/upload-image-slice";
import menuProductsSlice from "./slices/menu-products-slice";
import categoriesSlice from "./slices/categories-slice";
import usersSlice from "./slices/users-slice";

const store = configureStore({
  reducer: {
    imageURL: uploadImageSlice,
    catygories: categoriesSlice,
    menuProducts: menuProductsSlice,
    usersData: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
