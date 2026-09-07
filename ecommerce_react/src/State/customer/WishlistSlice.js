import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// JWT is auto-attached by the api interceptor

export const getWishlistByUserId = createAsyncThunk(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/wishlist");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const id = typeof arg === "object" && arg !== null ? arg.productId : arg;
      const response = await api.post(
        `/api/wishlist/add-product/${id}`,
        {}
      );
      return response.data;
    } catch (error) {
      dispatch(getWishlistByUserId());
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product to wishlist"
      );
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  "wishlist/removeProductFromWishlist",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      const id = typeof arg === "object" && arg !== null ? arg.productId : arg;
      const response = await api.delete(`/api/wishlist/product/${id}`);
      return response.data;
    } catch (error) {
      dispatch(getWishlistByUserId());
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove product from wishlist"
      );
    }
  }
);

const initialState = {
  wishlist: null,
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetWishlistState: (state) => {
      state.wishlist = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistByUserId.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(getWishlistByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.wishlist = null;
      })

      .addCase(addProductToWishlist.pending, (state, action) => {
        state.error = null;
        if (state.wishlist && Array.isArray(state.wishlist.products) && action.meta?.arg !== undefined) {
          const arg = action.meta.arg;
          const prodId = typeof arg === "object" && arg !== null ? (arg.productId ?? arg.id) : arg;
          const exists = state.wishlist.products.some((p) => p.id === prodId);
          if (exists) {
            state.wishlist.products = state.wishlist.products.filter((p) => p.id !== prodId);
          } else {
            state.wishlist.products.push({ id: prodId });
          }
        }
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeProductFromWishlist.pending, (state, action) => {
        state.error = null;
        if (state.wishlist && Array.isArray(state.wishlist.products) && action.meta?.arg !== undefined) {
          const arg = action.meta.arg;
          const prodId = typeof arg === "object" && arg !== null ? (arg.productId ?? arg.id) : arg;
          state.wishlist.products = state.wishlist.products.filter((p) => p.id !== prodId);
        }
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
        state.loading = false;
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Immediate reset on logout
      .addCase("auth/logout/fulfilled", (state) => {
        state.wishlist = null;
        state.loading = false;
        state.error = null;
      })
      .addCase("auth/logout/pending", (state) => {
        state.wishlist = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;