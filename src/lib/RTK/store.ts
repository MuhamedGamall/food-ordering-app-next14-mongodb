import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./slices/categories-slice";


const store = configureStore({
  reducer: {
    catygories: categoriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
