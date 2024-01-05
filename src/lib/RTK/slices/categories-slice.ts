import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppCategoryState, FormCategoryValues } from "../../../../types";
import axios from "axios";
import toast from "react-hot-toast";

export const getCategories: any = createAsyncThunk(
  "categoriesSlice/getCategories",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/admin/categories")).data;
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
      const data = (await axios.post("/api/admin/categories", item)).data;
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
      await axios.delete("/api/admin/categories?_ids=" + _ids);
      return _ids;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAllCategories: any = createAsyncThunk(
  "categoriesSlice/deleteAllCategories",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/admin/categories");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCategory: any = createAsyncThunk(
  "categoriesSlice/editCategory",
  async (item: FormCategoryValues, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.put("/api/admin/categories" , item);
      toast.success("Category updated");
      return item;
    } catch (error: any) {
      toast.error("Something wnt worng try again");
      return rejectWithValue(error.message);
    }
  }
);

const initialState: AppCategoryState = {
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
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getCategories.fulfilled,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        getCategories.rejected,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        postCategory.pending,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        postCategory.fulfilled,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories.push(action.payload);
        }
      )
      .addCase(
        postCategory.rejected,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteCategory.pending,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = state.categories.filter(
            (el) => !action.payload.some((xl: string) => el._id === xl)
          );
        }
      )
      .addCase(
        deleteCategory.rejected,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteAllCategories.pending,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteAllCategories.fulfilled,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = [];
        }
      )
      .addCase(
        deleteAllCategories.rejected,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        editCategory.pending,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        editCategory.fulfilled,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = state.categories.map((el) =>
            el?._id === action.payload?._id
              ? { ...state.categories, ...action.payload }
              : el
          );
        }
      )
      .addCase(
        editCategory.rejected,
        (state: AppCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default categoriesSlice.reducer;
