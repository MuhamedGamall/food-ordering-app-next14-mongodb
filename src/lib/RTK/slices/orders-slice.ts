import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getOrders: any = createAsyncThunk(
  "ordersSlice/getOrders",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/orders")).data;
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const getOrder: any = createAsyncThunk(
  "ordersSlice/getOrder",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/orders?order_id=" + id)).data;
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState: any = {
  orders: [],
  order: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "ordersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state: any, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOrders.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(getOrders.rejected, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getOrder.pending, (state: any, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default ordersSlice.reducer;
