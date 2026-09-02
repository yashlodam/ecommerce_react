import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerProfile = createAsyncThunk(
  "sellers/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller profile"
      );
    }
  }
);

export const fetchSellerReport = createAsyncThunk(
  "sellers/fetchSellerReport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/report");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller report"
      );
    }
  }
);

export const createSellers = createAsyncThunk(
  "sellers/createSellers",
  async (sellerData, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers", sellerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create seller account"
      );
    }
  }
);

export const updateSellerProfile = createAsyncThunk(
  "sellers/updateSellerProfile",
  async (sellerData, { rejectWithValue }) => {
    try {
      const response = await api.patch("/sellers", sellerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update seller profile"
      );
    }
  }
);

const initialState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    logoutSeller: (state) => {
      state.profile = null;
      state.selectedSeller = null;
      state.report = null;
      state.error = null;
      state.loading = false;
    },
    clearSellerError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Profile
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Report
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.sellers.push(action.payload);
      })
      .addCase(createSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateSellerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { logoutSeller, clearSellerError } = sellerSlice.actions;
export default sellerSlice.reducer;