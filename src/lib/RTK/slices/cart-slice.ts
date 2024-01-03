import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getCart: any = createAsyncThunk(
  "cartSlice/getCart",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/products-cart")).data;
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const postProductToCart: any = createAsyncThunk(
  "cartSlice/postProductToCart",
  async (item: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.post("/api/products-cart", item)).data;
      toast.success("Product added to cart");

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductFromCart: any = createAsyncThunk(
  "cartSlice/deleteProductFromCart",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/products-cart?productId=" + id);
      toast.success("Product removed");
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAllProductsFromCart: any = createAsyncThunk(
  "cartSlice/deleteAllProductsFromCart",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/products-cart");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: any = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state: any, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(
        postProductToCart.pending,
        (state: any, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        postProductToCart.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.cart.push(action.payload);
        }
      )
      .addCase(
        postProductToCart.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteProductFromCart.pending,
        (state: any, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteProductFromCart.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.cart = state.cart.filter(
            (el: any) => el._id !== action.payload
          );
        }
      )
      .addCase(
        deleteProductFromCart.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteAllProductsFromCart.pending,
        (state: any, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteAllProductsFromCart.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.cart = [];
        }
      )
      .addCase(
        deleteAllProductsFromCart.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default cartSlice.reducer;
