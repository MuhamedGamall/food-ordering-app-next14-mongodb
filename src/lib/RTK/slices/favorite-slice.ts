import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getFavorites: any = createAsyncThunk(
  "favoritesSlice/getFavorites",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/favorite")).data;
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const postFavorite: any = createAsyncThunk(
  "favoritesSlice/postFavorite",
  async (item: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.post("/api/favorite", item)).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFavorite: any = createAsyncThunk(
  "favoritesSlice/deleteFavorite",
  async (id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/favorite?productId=" + id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteAllProductsFromFavorites: any = createAsyncThunk(
  "favoritesSlice/deleteAllProductsFromFavorites",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/favorite");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: any = {
  favorites: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favoritesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getFavorites.pending,
        (state: any, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getFavorites.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.favorites = action.payload;
        }
      )
      .addCase(
        getFavorites.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        postFavorite.pending,
        (state: any, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        postFavorite.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.favorites.push(action.payload);
        }
      )
      .addCase(
        postFavorite.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteFavorite.pending,
        (state: any, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteFavorite.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.favorites = state.favorites.filter(
            (el: any) => el._id !== action.payload
          );
        }
      )
      .addCase(
        deleteFavorite.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteAllProductsFromFavorites.pending,
        (state: any, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteAllProductsFromFavorites.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.favorites = [];
        }
      )
      .addCase(
        deleteAllProductsFromFavorites.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default favoritesSlice.reducer;
