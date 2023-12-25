import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getProfile: any = createAsyncThunk(
  "profileSlice/getProfile",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/edit-profile")).data;

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProfile: any = createAsyncThunk(
  "profileSlice/editProfile",
  async (values: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      (await axios.patch("/api/edit-profile", values)).data;
      toast.success("Profile updated");
      return values;
    } catch (error: any) {
      toast.error("Something wnt worng try again");
      return rejectWithValue(error.message);
    }
  }
);

const initialState: any = {
  profile: {},
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state: any, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProfile.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.profile = action.payload;        }
      )
      .addCase(
        getProfile.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        editProfile.pending,
        (state: any, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        editProfile.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.profile = { ...state.profile, ...action.payload };
        }
      )
      .addCase(
        editProfile.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default profileSlice.reducer;
