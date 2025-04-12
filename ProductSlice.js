import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "./ProductService"; 
import axios from "../api/axios"

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const getProducts = createAsyncThunk('product-list/getAll', async (_, thunkAPI) => {
  try {
    const response = await ProductService.getAll();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const ProductSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || []
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ProductSlice.reducer;
