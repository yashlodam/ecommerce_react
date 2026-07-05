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


// ============= Update Sellers Account Status =======

export const updateSellerAccountStatus = createAsyncThunk(
  "admin/updateSellerAccountStatus",
  async ({ jwt, id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${BASE_URL}/sellers/${id}/status/${status}`,
        {}, // request body
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("Seller status updated:", response.data);

      return response.data;
    } catch (error) {
      console.log(error.response);

      return rejectWithValue(
        error.response?.data?.message || "Failed to update seller status"
      );
    }
  }
);

// ================= Fetch All Users =================
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error) {
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
      })

      // uupdate sellers


     .addCase(updateSellerAccountStatus.pending, (state) => {
  state.loading = true;
})

.addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
  state.loading = false;

  const index = state.sellers.findIndex(
    (seller) => seller.id === action.payload.id
  );

  if (index !== -1) {
    state.sellers[index] = action.payload;
  }
})

.addCase(updateSellerAccountStatus.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});


      
  },
});

// ================= Export =================

export default adminFetchSlice.reducer;