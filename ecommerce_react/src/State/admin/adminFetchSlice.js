import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const BASE_URL = "/api/admin";

// ================= Fetch All Sellers =================
export const fetchAllSellers = createAsyncThunk(
  "admin/fetchAllSellers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/sellers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sellers"
      );
    }
  }
);

// ============= Update Sellers Account Status =======
export const updateSellerAccountStatus = createAsyncThunk(
  "admin/updateSellerAccountStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${BASE_URL}/sellers/${id}/status/${status}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update seller status"
      );
    }
  }
);

// ================= Fetch All Users =================
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// ================= Ban User =================
export const banUser = createAsyncThunk(
  "admin/banUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`${BASE_URL}/users/${userId}/ban`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to ban user"
      );
    }
  }
);

// ================= Unban User =================
export const unbanUser = createAsyncThunk(
  "admin/unbanUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`${BASE_URL}/users/${userId}/unban`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unban user"
      );
    }
  }
);

// ================= Delete User =================
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.delete(`${BASE_URL}/users/${userId}`);
      return userId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

// ================= Initial State =================
const initialState = {
  sellers: [],
  users: [],
  loading: false,
  error: null,
};

// ================= Slice =================
const adminFetchSlice = createSlice({
  name: "adminFetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sellers
      .addCase(fetchAllSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update seller status
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sellers.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
      })
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Ban user
      .addCase(banUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      // Unban user
      .addCase(unbanUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default adminFetchSlice.reducer;