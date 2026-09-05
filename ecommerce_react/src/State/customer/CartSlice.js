import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sumCartItemMrpPrice } from "../../Util/sumCartItemMrpPrice";
import { sumCartItemSellingPrice } from "../../Util/sumCartItemSellingPrice";
import { applyCoupon } from "./CouponSlice";
import { api } from "../../config/Api";

const API_URL = "/api/cart";

// JWT is auto-attached by the api interceptor — no manual headers needed

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      // Support both direct payload and wrapped { request, jwt }
      const payload = request?.request ? request.request : request;
      const response = await api.put("/api/cart/add", payload);
      // Refresh cart after adding
      dispatch(fetchUserCart());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteItem",
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      // Support both direct id and object { cartItemId, jwt }
      const cartItemId = typeof arg === "object" && arg !== null ? (arg.cartItemId || arg.id) : arg;
      await api.delete(`/api/cart/item/${cartItemId}`);
      dispatch(fetchUserCart());
      return cartItemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async ({ cartItemId, cartItem }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(
        `/api/cart/item/${cartItemId}`,
        cartItem
      );
      dispatch(fetchUserCart());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update item"
      );
    }
  }
);

const initialState = {
  cart: null,
  loading: false,
  error: null,
  isCartDrawerOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
      state.isCartDrawerOpen = false;
    },
    clearCartError: (state) => {
      state.error = null;
    },
    openCartDrawer: (state) => {
      state.isCartDrawerOpen = true;
    },
    closeCartDrawer: (state) => {
      state.isCartDrawerOpen = false;
    },
    toggleCartDrawer: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.loading = false;
        state.isCartDrawerOpen = true;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item) => item.id !== action.payload
          );
          state.cart.totalMrpPrice = sumCartItemMrpPrice(state.cart.cartItems);
          state.cart.totalSellingPrice = sumCartItemSellingPrice(state.cart.cartItems);
          state.cart.totalItem = state.cart.cartItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
        }
        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          const index = state.cart.cartItems.findIndex(
            (item) => item.id === action.meta.arg.cartItemId
          );
          if (index !== -1) {
            state.cart.cartItems[index] = {
              ...state.cart.cartItems[index],
              ...action.payload,
            };
          }
          state.cart.totalMrpPrice = sumCartItemMrpPrice(state.cart.cartItems);
          state.cart.totalSellingPrice = sumCartItemSellingPrice(state.cart.cartItems);
          state.cart.totalItem = state.cart.cartItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
export const {
  resetCartState,
  clearCartError,
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
} = cartSlice.actions;