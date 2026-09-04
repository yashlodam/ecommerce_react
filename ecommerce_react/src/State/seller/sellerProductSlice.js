import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// JWT is auto-attached by the api interceptor

// ─── Product thunks ───────────────────────────────────────────────────────────

export const fetchSellerProduct = createAsyncThunk(
  "sellerProduct/fetchSellerProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller products"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "sellerProduct/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/products", product);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const updateSellerProduct = createAsyncThunk(
  "sellerProduct/updateSellerProduct",
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/sellers/products/${productId}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteSellerProduct = createAsyncThunk(
  "sellerProduct/deleteSellerProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`/sellers/products/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

// ─── Variant thunks ───────────────────────────────────────────────────────────

/** Fetch all variants for a product (public) */
export const fetchProductVariants = createAsyncThunk(
  "sellerProduct/fetchProductVariants",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${productId}/variants`);
      return { productId, variants: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch variants"
      );
    }
  }
);

/** Create a new variant for a seller's product */
export const createVariant = createAsyncThunk(
  "sellerProduct/createVariant",
  async ({ productId, variant }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/sellers/products/${productId}/variants`,
        variant
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create variant"
      );
    }
  }
);

/** Update an existing variant */
export const updateVariant = createAsyncThunk(
  "sellerProduct/updateVariant",
  async ({ variantId, variant }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/sellers/products/variants/${variantId}`,
        variant
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update variant"
      );
    }
  }
);

/** Delete a variant */
export const deleteVariant = createAsyncThunk(
  "sellerProduct/deleteVariant",
  async (variantId, { rejectWithValue }) => {
    try {
      await api.delete(`/sellers/products/variants/${variantId}`);
      return variantId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete variant"
      );
    }
  }
);

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState = {
  products: [],
  // variants for the product currently being edited
  variants: [],
  variantLoading: false,
  loading: false,
  error: null,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const sellerProductSlice = createSlice({
  name: "SellerProduct",
  initialState,
  reducers: {
    clearSellerProductError: (state) => {
      state.error = null;
    },
    clearVariants: (state) => {
      state.variants = [];
    },
  },
  extraReducers: (builder) => {
    // ── Product thunks ────────────────────────────────────────────
    builder
      .addCase(fetchSellerProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.products.push(action.payload);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSellerProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.id) {
          const index = state.products.findIndex((p) => p.id === action.payload.id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        }
      })
      .addCase(updateSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteSellerProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSellerProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteSellerProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ── Variant thunks ─────────────────────────────────────────────
    builder
      .addCase(fetchProductVariants.pending, (state) => {
        state.variantLoading = true;
      })
      .addCase(fetchProductVariants.fulfilled, (state, action) => {
        state.variantLoading = false;
        state.variants = action.payload.variants;
      })
      .addCase(fetchProductVariants.rejected, (state) => {
        state.variantLoading = false;
      })

      .addCase(createVariant.pending, (state) => {
        state.variantLoading = true;
        state.error = null;
      })
      .addCase(createVariant.fulfilled, (state, action) => {
        state.variantLoading = false;
        state.variants.push(action.payload);
      })
      .addCase(createVariant.rejected, (state, action) => {
        state.variantLoading = false;
        state.error = action.payload;
      })

      .addCase(updateVariant.pending, (state) => {
        state.variantLoading = true;
        state.error = null;
      })
      .addCase(updateVariant.fulfilled, (state, action) => {
        state.variantLoading = false;
        const idx = state.variants.findIndex((v) => v.id === action.payload.id);
        if (idx !== -1) state.variants[idx] = action.payload;
      })
      .addCase(updateVariant.rejected, (state, action) => {
        state.variantLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteVariant.pending, (state) => {
        state.variantLoading = true;
      })
      .addCase(deleteVariant.fulfilled, (state, action) => {
        state.variantLoading = false;
        state.variants = state.variants.filter((v) => v.id !== action.payload);
      })
      .addCase(deleteVariant.rejected, (state, action) => {
        state.variantLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSellerProductError, clearVariants } = sellerProductSlice.actions;
export default sellerProductSlice.reducer;