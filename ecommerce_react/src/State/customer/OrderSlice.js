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

      const data = response.data;
      return {
        ...data,
        paymentLinkUrl: data.payment_link_url || data.paymentLinkUrl,
        paymentLinkId: data.payment_link_id || data.paymentLinkId,
        razorpayOrderId: data.razorpay_order_id || data.razorpayOrderId || data.payment_link_id,
        keyId: data.key_id || data.keyId,
        paymentOrderId: data.payment_order_id || data.paymentOrderId,
        amount: data.amount,
        currency: data.currency || "INR",
      };
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
  async (arg, { rejectWithValue }) => {
    try {
      const payload =
        arg && typeof arg.address === "object" && arg.address !== null
          ? arg.address
          : arg;
      const response = await api.post("/api/users/add-address", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address"
      );
    }
  }
);

// ================= Update Address =================
export const updateUserAddress = createAsyncThunk(
  "user/updateUserAddress",
  async ({ addressId, address }, { rejectWithValue }) => {
    try {
      const id =
        typeof addressId === "object" && addressId !== null
          ? addressId.addressId || addressId.id
          : addressId;
      const payload =
        address && typeof address.address === "object" && address.address !== null
          ? address.address
          : address;
      const response = await api.put(`/api/users/address/${id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update address"
      );
    }
  }
);

// ================= Delete Address =================
export const deleteUserAddress = createAsyncThunk(
  "user/deleteUserAddress",
  async (arg, { rejectWithValue }) => {
    try {
      const addressId =
        typeof arg === "object" && arg !== null
          ? arg.addressId || arg.id
          : arg;
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