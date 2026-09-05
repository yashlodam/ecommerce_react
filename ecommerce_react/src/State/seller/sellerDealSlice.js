import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// ─── Seller Deal Thunks ──────────────────────────────────────────────────────

export const fetchSellerDeals = createAsyncThunk(
  "sellerDeal/fetchSellerDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/deals");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller deals"
      );
    }
  }
);

export const createSellerDeal = createAsyncThunk(
  "sellerDeal/createSellerDeal",
  async (dealData, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/deals", dealData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create deal"
      );
    }
  }
);

export const updateSellerDeal = createAsyncThunk(
  "sellerDeal/updateSellerDeal",
  async ({ id, dealData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/sellers/deals/${id}`, dealData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update deal"
      );
    }
  }
);

export const toggleSellerDealStatus = createAsyncThunk(
  "sellerDeal/toggleSellerDealStatus",
  async (dealId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/sellers/deals/${dealId}/status`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle deal status"
      );
    }
  }
);

export const deleteSellerDeal = createAsyncThunk(
  "sellerDeal/deleteSellerDeal",
  async (dealId, { rejectWithValue }) => {
    try {
      await api.delete(`/sellers/deals/${dealId}`);
      return dealId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete deal"
      );
    }
  }
);

// ─── Slice ───────────────────────────────────────────────────────────────────

const initialState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
  dealDeleted: false,
};

const sellerDealSlice = createSlice({
  name: "sellerDeal",
  initialState,
  reducers: {
    resetDealState: (state) => {
      state.dealCreated = false;
      state.dealUpdated = false;
      state.dealDeleted = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Seller Deals
      .addCase(fetchSellerDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchSellerDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Deal
      .addCase(createSellerDeal.pending, (state) => {
        state.loading = true;
        state.dealCreated = false;
        state.error = null;
      })
      .addCase(createSellerDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.dealCreated = true;
        state.deals = [action.payload, ...state.deals];
      })
      .addCase(createSellerDeal.rejected, (state, action) => {
        state.loading = false;
        state.dealCreated = false;
        state.error = action.payload;
      })

      // Update Deal
      .addCase(updateSellerDeal.pending, (state) => {
        state.loading = true;
        state.dealUpdated = false;
        state.error = null;
      })
      .addCase(updateSellerDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.dealUpdated = true;
        const idx = state.deals.findIndex((d) => d.id === action.payload.id);
        if (idx !== -1) {
          state.deals[idx] = action.payload;
        }
      })
      .addCase(updateSellerDeal.rejected, (state, action) => {
        state.loading = false;
        state.dealUpdated = false;
        state.error = action.payload;
      })

      // Toggle Status
      .addCase(toggleSellerDealStatus.fulfilled, (state, action) => {
        const idx = state.deals.findIndex((d) => d.id === action.payload.id);
        if (idx !== -1) {
          state.deals[idx] = action.payload;
        }
      })

      // Delete Deal
      .addCase(deleteSellerDeal.pending, (state) => {
        state.loading = true;
        state.dealDeleted = false;
        state.error = null;
      })
      .addCase(deleteSellerDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.dealDeleted = true;
        state.deals = state.deals.filter((d) => d.id !== action.payload);
      })
      .addCase(deleteSellerDeal.rejected, (state, action) => {
        state.loading = false;
        state.dealDeleted = false;
        state.error = action.payload;
      });
  },
});

export const { resetDealState } = sellerDealSlice.actions;
export default sellerDealSlice.reducer;
