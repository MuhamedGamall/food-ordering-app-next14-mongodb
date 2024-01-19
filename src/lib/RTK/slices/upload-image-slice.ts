import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppUploadImageState, UplaodImageProps } from "../../../../types";
import axios from "axios";

export const uploadImage: any = createAsyncThunk(
  "uploadImageSlice/uploadImage",
  async (data: UplaodImageProps, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const { image64, publicId, folderName } = data;
      const { data: imageURL } = image64
        ? await axios.post("/api/upload-image", {
            image: {
              image64,
              publicId,
              folderName,
            },
          })
        : { data: "" };
      const values = {
        ...(imageURL && { image: imageURL }),
      };
      return values?.image
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

const initialState: AppUploadImageState = {
  imageURL: "",
  loading: false,
  error: null,
};

const uploadImageSlice = createSlice({
  name: "uploadImageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        uploadImage.pending,
        (state: AppUploadImageState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        uploadImage.fulfilled,
        (state: AppUploadImageState, action: PayloadAction<any>) => {
          state.loading = false;
          state.imageURL = action.payload;

        }
      )
      .addCase(
        uploadImage.rejected,
        (state: AppUploadImageState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default uploadImageSlice.reducer;
