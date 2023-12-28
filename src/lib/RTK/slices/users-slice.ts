import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getUsers: any = createAsyncThunk(
  "usersSlice/getUsers",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/admin/users")).data;
      console.log('data',data);
      return data || [];
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.message);
    }
  }
);
export const getProfile: any = createAsyncThunk(
  "usersSlice/getProfile",
  async (_, thunkApi) => {

    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/profile")).data;

      return data || [];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProfile: any = createAsyncThunk(
  "usersSlice/editProfile",
  async (values: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      (await axios.patch("/api/profile", values)).data;
      toast.success("Profile updated");
      return values;
    } catch (error: any) {
      toast.error("Something wnt worng try again");
      return rejectWithValue(error.message);
    }
  }
);

const initialState: any = {
  users: [],
  profile: {},
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state: any, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state: any, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProfile.pending, (state: any, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProfile.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.profile = action.payload;
        }
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
export default usersSlice.reducer;
