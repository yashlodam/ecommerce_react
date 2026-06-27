import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";


const API_URL = "/api/coupons";

export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}/apply`,
        null,
        {
          params: {
            apply,
            code,
            orderValue,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("Apply Coupon:", response.data);
      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to apply coupon"
      );
    }
  }
);

const initialState = {
    coupons:[],
    cart:null,
    loading:false,
    error:null,
    couponCreated:false,
    couponApplied:false
}


const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    resetCouponState: (state) => {
      state.loading = false;
      state.error = null;
      state.couponApplied = false;
      state.couponCreated = false;
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

        // Backend should return updated cart
        state.cart = action.payload;
      })

      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.couponApplied = false;
        state.error = action.payload;
      });
  },
});

export const { resetCouponState } = couponSlice.actions;

export default couponSlice.reducer;