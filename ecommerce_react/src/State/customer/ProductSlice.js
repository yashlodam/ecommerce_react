import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// ================= Fetch Product By Id =================
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch product details"
      );
    }
  }
);

// ================= Search Products =================
export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/search", {
        params: { query },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to search products"
      );
    }
  }
);

// ================= Fetch All Products =================
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", {
        params: {
          ...params,
          pageNumber: params?.pageNumber ?? 0,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to load marketplace catalog"
      );
    }
  }
);

// ================= Fetch Home Products by Category =================
export const fetchHomeProducts = createAsyncThunk(
  "products/fetchHomeProducts",
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", {
        params: {
          category,
          pageNumber: 0,
        },
      });
      return {
        category,
        products: response.data?.content || (Array.isArray(response.data) ? response.data : []),
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch category products"
      );
    }
  }
);

// ================= Fetch Real Brands =================
export const fetchBrands = createAsyncThunk(
  "products/fetchBrands",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = {};
      if (typeof params === "string") {
        if (params && params !== "all") queryParams.category = params;
      } else if (params && typeof params === "object") {
        if (params.category && params.category !== "all") queryParams.category = params.category;
        if (params.query) queryParams.query = params.query;
      }
      const response = await api.get("/products/brands", { params: queryParams });
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch real brands"
      );
    }
  }
);

// ================= Initial State =================
const initialState = {
  product: null,
  productDetailsLoading: false,
  products: [],
  brands: [],
  totalPages: 1,
  totalElements: 0,
  homeProducts: {
    men: [],
    women: [],
    electronics: [],
    home_furniture: [],
    beauty: [],
  },
  loading: false,
  error: null,
  searchProducts: [],
};

// ================= Slice =================
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Fetch Product By Id
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.productDetailsLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productDetailsLoading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productDetailsLoading = false;
        state.error = action.payload;
      });

    // Fetch All Products
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload?.content || (Array.isArray(action.payload) ? action.payload : []);
        state.totalPages = action.payload?.totalPages ?? action.payload?.page?.totalPages ?? 1;
        state.totalElements = action.payload?.totalElements ?? action.payload?.page?.totalElements ?? (Array.isArray(action.payload?.content) ? action.payload.content.length : (Array.isArray(action.payload) ? action.payload.length : 0));
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Home Products
    builder
      .addCase(fetchHomeProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { category, products } = action.payload;
        state.homeProducts[category] = products;
      })
      .addCase(fetchHomeProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Search Products
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.searchProducts = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Brands
    builder
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brands = action.payload || [];
      })
      .addCase(fetchBrands.rejected, (state) => {
        // Retain current brands if fetch fails
      });
  },
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;