import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/api"; // Change path according to your project

const BASE_URL = "/api/admin";

// ================= Fetch All Sellers =================

export const fetchAllSellers = createAsyncThunk(
  "admin/fetchAllSellers",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/sellers`,
        {
            headers:{
                Authorization: `Bearer ${jwt}`
            }
        }
      );

      console.log("Sellers:", response.data);

      return response.data;
    } catch (error) {
      console.log(error.response);

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sellers"
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

      console.log("Users:", response.data);

      return response.data;
    } catch (error) {
      console.log(error.response);

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
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
  name: "admin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= Sellers =================

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

      // ================= Users =================

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
      });
  },
});

// ================= Export =================

export default adminFetchSlice.reducer;