import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5454";

// ================= Fetch Product By Id =================
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/products/${productId}`
      );

      console.log("Fetched Product:", response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// ================= Search Products =================
export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/products/search`,
        {
          params: {
            query,
          },
        }
      );

      console.log("Search Products:", response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// ================= Fetch All Products =================
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/products`,
        {
          params: {
            ...params,
            pageNumber: params?.pageNumber ?? 0,
          },
        }
      );

      console.log("Fetched Products:", response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

// ================= Initial State =================
const initialState = {
  product: null,
  products: [],
  totalPages: 1,
  loading: false,
  error: null,
  searchProducts: [],
};

// ================= Slice =================
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Fetch Product By Id
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch All Products
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Search Products
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProducts = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;