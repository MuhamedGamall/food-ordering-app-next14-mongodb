import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState, FormValues } from "../../../../types";
import axios from "axios";
import toast from "react-hot-toast";

export const getCategories: any = createAsyncThunk(
  "categoriesSlice/getCategories",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/categories")).data;
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const postCategory: any = createAsyncThunk(
  "categoriesSlice/postCategory",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.post("/api/categories", item)).data;
      toast.success("Category added");
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory: any = createAsyncThunk(
  "categoriesSlice/deleteCategory",
  async (_ids: string[], thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete(
        "/api/categories?_ids=" + _ids
      );
      return _ids;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCategory: any = createAsyncThunk(
  "categoriesSlice/editCategory",
  async (item: FormValues, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.put("/api/categories", {
        _id: item?._id,
        title: item?.title,
      });
      toast.success("Category updated");
      return item;
    } catch (error: any) {
      toast.error("Something wnt worng try again");
      return rejectWithValue(error.message);
    }
  }
);

const initialState: AppState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getCategories.pending,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getCategories.fulfilled,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        getCategories.rejected,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        postCategory.pending,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        postCategory.fulfilled,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories.push(action.payload);
        }
      )
      .addCase(
        postCategory.rejected,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteCategory.pending,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = state.categories.filter(
            (el: any) => el._id !== action.payload
          );
        }
      )
      .addCase(
        deleteCategory.rejected,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        editCategory.pending,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        editCategory.fulfilled,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = state.categories.map((el) =>
            el?.id === action.payload?.id
              ? { ...state.categories, ...action.payload }
              : el
          );
        }
      )
      .addCase(
        editCategory.rejected,
        (state: AppState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default categoriesSlice.reducer;
