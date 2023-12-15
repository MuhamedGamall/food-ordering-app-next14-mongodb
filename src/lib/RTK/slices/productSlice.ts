// import { AppState, FormValues } from "@/types";
// import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
// // console.log("lolo");

// export const getProducts = createAsyncThunk(
//   "productsSlice/getProducts",
//   async (searchTerm: string, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = await fetch(
//         `api/products/?search=${searchTerm}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return await data.json();
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const postProducts = createAsyncThunk(
//   "productsSlice/postProducts",
//   async (item, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = await fetch("api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ item }),
//       });

//       return await data.json();
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const removeProduct = createAsyncThunk(
//   "productsSlice/removeProduct",
//   async (id, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       await fetch(`/api/products?id=${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const editProduct:any = createAsyncThunk(
//   "productsSlice/editProduct",
//   async (item: FormValues, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = await fetch(`/api/edit/${item.id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ item }),
//       });
//       return await data.json();
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
// export const detailsProduct = createAsyncThunk(
//   "productsSlice/detailsProduct",
//   async (id, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = await fetch(`/api/details/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return await data.json();
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState: AppState = {
//   products: [],
//   product: null,
//   loading: false,
//   error: null,
// };

// const productsSlice = createSlice({
//   name: "productsSlice",
//   initialState,
//   reducers: {
//     cleanUpProduct: (state) => {
//       state.product = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(
//         getProducts.pending,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addCase(
//         getProducts.fulfilled,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.products = action.payload;
//         }
//       )
//       .addCase(
//         getProducts.rejected,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       );
//     builder
//       .addCase(
//         postProducts.pending,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addCase(
//         postProducts.fulfilled,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.products.push(action.payload);
//         }
//       )
//       .addCase(
//         postProducts.rejected,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       );
// builder
//       .addCase(
//         removeProduct.pending,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addCase(
//         removeProduct.fulfilled,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.products = state.products.filter(
//             (el) => el.id !== action.payload
//           );
//         }
//       )
//       .addCase(
//         removeProduct.rejected,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       );
//     builder
//       .addCase(
//         editProduct.pending,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addCase(
//         editProduct.fulfilled,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.product = action.payload;
//         }
//       )
//       .addCase(
//         editProduct.rejected,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       );
//     builder
//       .addCase(
//         detailsProduct.pending,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addCase(
//         detailsProduct.fulfilled,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.product = action.payload;
//         }
//       )
//       .addCase(
//         detailsProduct.rejected,
//         (state: AppState, action: PayloadAction<any>) => {
//           state.loading = false;
//           state.error = action.payload;
//         }
//       );
  
//   },
// });
// export default productsSlice.reducer;
// export const { cleanUpProduct } = productsSlice.actions;
