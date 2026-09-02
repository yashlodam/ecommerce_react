import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const API_URL = "/api/coupons";

// ================= Apply Coupon (Customer) =================
export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async ({ apply, code, orderValue }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/apply`, null, {
        params: { apply, code, orderValue },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid coupon code"
      );
    }
  }
);

// ================= Fetch All Coupons (Admin) =================
export const fetchAllCoupons = createAsyncThunk(
  "coupon/fetchAllCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/admin/all`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch coupons"
      );
    }
  }
);

// ================= Create Coupon (Admin) =================
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/admin/create`, couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create coupon"
      );
    }
  }
);

// ================= Delete Coupon (Admin) =================
export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (couponId, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/admin/delete/${couponId}`);
      return couponId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete coupon"
      );
    }
  }
);

const initialState = {
  coupons: [],
  cart: null,
  loading: false,
  error: null,
  couponApplied: false,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetCouponState: (state) => {
      state.loading = false;
      state.error = null;
      state.couponApplied = false;
    },
    clearCouponError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply Coupon
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.couponApplied = false;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.couponApplied = true;
        state.cart = action.payload;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.couponApplied = false;
        state.error = action.payload;
      })

      // Fetch All Coupons
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Coupon
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
      })

      // Delete Coupon
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter((c) => c.id !== action.payload);
      });
  },
});

export const { resetCouponState, clearCouponError } = couponSlice.actions;
export default couponSlice.reducer;