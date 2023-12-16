import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppProductState, ProductProps } from "../../../../types";
import axios from "axios";
import toast from "react-hot-toast";

export const getProducts: any = createAsyncThunk(
  "menuProductsSlice/getProducts",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/menu-products")).data;
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const postProduct: any = createAsyncThunk(
  "menuProductsSlice/postProduct",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.post("/api/menu-products", item)).data;
      toast.success("Product added");
      console.log("data", data);
      return data;
    } catch (error: any) {
      toast.error("Somethig went wrong try again");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct: any = createAsyncThunk(
  "menuProductsSlice/deleteProduct",
  async (_id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/menu-products?_id=" + _id);
      return _id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAllProducts: any = createAsyncThunk(
  "menuProductsSlice/deleteAllProducts",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/menu-products");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct: any = createAsyncThunk(
  "menuProductsSlice/editProduct",
  async (item: ProductProps, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.put("/api/menu-products", item);
      toast.success("Product updated");
      return item;
    } catch (error: any) {
      toast.error("Something wnt worng try again");
      return rejectWithValue(error.message);
    }
  }
);

const initialState: AppProductState = {
  products: [],
  loading: false,
  error: null,
};

const menuProductsSlice = createSlice({
  name: "menuProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getProducts.pending,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProducts.fulfilled,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        getProducts.rejected,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        postProduct.pending,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        postProduct.fulfilled,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products.push(action.payload);
        }
      )
      .addCase(
        postProduct.rejected,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteProduct.pending,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteProduct.fulfilled,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = state.products.filter(
            (el) => !action.payload.some((xl: string) => el._id === xl)
          );
        }
      )
      .addCase(
        deleteProduct.rejected,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteAllProducts.pending,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteAllProducts.fulfilled,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = [];
        }
      )
      .addCase(
        deleteAllProducts.rejected,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        editProduct.pending,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        editProduct.fulfilled,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = state.products.map((el) =>
            el?._id === action.payload?._id
              ? { ...state.products, ...action.payload }
              : el
          );
        }
      )
      .addCase(
        editProduct.rejected,
        (state: AppProductState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default menuProductsSlice.reducer;
