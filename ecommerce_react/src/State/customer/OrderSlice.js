import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../config/Api";

const API_URL = "/api/orders";

// ================= Fetch User Orders =================
export const fetchUserOrderHistory = createAsyncThunk(
  "orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch order history"
      );
    }
  }
);

// ================= Fetch Order By Id =================
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async ({ orderId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch order");
    }
  }
);

// ================= Create Order =================
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ address, jwt, paymentGateway }, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, address, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          paymentMethod: paymentGateway,
        },
      });

      if (response.data.payment_link_url) {
        window.location.href = response.data.payment_link_url;
      }

      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create order");
    }
  }
);

// ================= Fetch Order Item =================
export const fetchOrderItemById = createAsyncThunk(
  "orders/fetchOrderItemById",
  async ({ orderItemId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/item/${orderItemId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch order item");
    }
  }
);

// ================= Payment Success =================
export const paymentSuccess = createAsyncThunk(
  "orders/paymentSuccess",
  async ({ paymentId, paymentLinkId, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/payment/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          paymentLinkId,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to process payment");
    }
  }
);

// ================= Cancel Order =================
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }

      return rejectWithValue(
        "An error occurred while cancelling the order"
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
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= Fetch User Orders =================
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

      // ================= Fetch Order By Id =================
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

      // ================= Create Order =================
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

      // ================= Fetch Order Item =================
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

      // ================= Payment Success =================
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

      // ================= Cancel Order =================
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderCanceled = true;

        // Update cancelled order in list
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );

        // Update current order if open
        if (
          state.currentOrder &&
          state.currentOrder.id === action.payload.id
        ) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;