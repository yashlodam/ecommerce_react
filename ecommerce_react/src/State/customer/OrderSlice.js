import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const API_URL = "/api/orders";

// ================= Fetch User Orders =================
export const fetchUserOrderHistory = createAsyncThunk(
  "orders/fetchUserOrderHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/user`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order history"
      );
    }
  }
);

// ================= Fetch Order By Id =================
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (arg, { rejectWithValue }) => {
    try {
      const orderId =
        typeof arg === "object" && arg !== null
          ? arg.orderId || arg.id
          : arg;
      const response = await api.get(`${API_URL}/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch order"
      );
    }
  }
);

// ================= Create Order =================
// paymentGateway: "RAZORPAY" | "COD"
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ address, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, address, {
        params: { paymentMethod: paymentGateway },
      });

      // For online payment — redirect to Razorpay immediately
      if (response.data.payment_link_url) {
        window.location.href = response.data.payment_link_url;
      }

      return response.data;
    } catch (error) {
      // Extract meaningful error message from backend
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data ||
        "Failed to create order";

      return rejectWithValue(backendMessage);
    }
  }
);

// ================= Fetch Order Item =================
export const fetchOrderItemById = createAsyncThunk(
  "orders/fetchOrderItemById",
  async (arg, { rejectWithValue }) => {
    try {
      const orderItemId =
        typeof arg === "object" && arg !== null
          ? arg.orderItemId || arg.id
          : arg;
      const response = await api.get(`${API_URL}/item/${orderItemId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to fetch order item"
      );
    }
  }
);

// ================= Payment Success =================
// Called after Razorpay redirect back to frontend.
// Backend: GET /api/payment/{paymentId}?paymentLinkId=xxx
export const paymentSuccess = createAsyncThunk(
  "orders/paymentSuccess",
  async ({ paymentId, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/payment/${paymentId}`, {
        params: { paymentLinkId },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment confirmation failed"
      );
    }
  }
);

// ================= Cancel Order =================
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (arg, { rejectWithValue }) => {
    try {
      const orderId =
        typeof arg === "object" && arg !== null
          ? arg.orderId || arg.id
          : arg;
      // JWT is auto-attached by the api interceptor
      const response = await api.put(`${API_URL}/${orderId}/cancel`, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "An error occurred while cancelling the order"
      );
    }
  }
);

// ================= Add Address =================
export const addUserAddress = createAsyncThunk(
  "user/addUserAddress",
  async (address, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/add-address", address);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address"
      );
    }
  }
);

// ================= Delete Address =================
export const deleteUserAddress = createAsyncThunk(
  "user/deleteUserAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/users/address/${addressId}`);
      return { addressId, user: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

// ================= Initial State =================
const initialState = {
  orders: [],
  currentOrder: null,
  orderItem: null,
  paymentOrder: null,
  orderCanceled: false,
  loading: false,
  error: null,
};

// ================= Slice =================
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    resetOrderCanceled: (state) => {
      state.orderCanceled = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch User Orders
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCanceled = false;
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Order By Id
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Order Item
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Payment Success
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentOrder = action.payload;
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderCanceled = true;
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError, resetOrderCanceled } = orderSlice.actions;
export default orderSlice.reducer;