import { configureStore } from "@reduxjs/toolkit";
import uploadImageSlice from "./slices/upload-image-slice";
import menuProductsSlice from "./slices/menu-products-slice";
import categoriesSlice from "./slices/categories-slice";
import usersSlice from "./slices/users-slice";
import favoriteSlice from "./slices/favorite-slice";
import cartSlice from "./slices/cart-slice";
import ordersSlice from "./slices/orders-slice";

const store = configureStore({
  reducer: {
    imageURL: uploadImageSlice,
    categories: categoriesSlice,
    menuProducts: menuProductsSlice,
    usersData: usersSlice,
    favoritesData: favoriteSlice,
    productsCart: cartSlice,
    ordersData:ordersSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
