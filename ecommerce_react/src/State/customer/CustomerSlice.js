import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// ================= Create Home Categories =================
export const createHomeCategories = createAsyncThunk(
  "home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create home categories"
      );
    }
  }
);

// ================= Fetch Deals (Admin) =================
export const fetchDeals = createAsyncThunk(
  "home/fetchDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/deals");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch deals"
      );
    }
  }
);

// ================= Create Deal (Admin) =================
export const createDeal = createAsyncThunk(
  "home/createDeal",
  async (dealData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", dealData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create deal"
      );
    }
  }
);

// ================= Delete Deal (Admin) =================
export const deleteDeal = createAsyncThunk(
  "home/deleteDeal",
  async (dealId, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/deals/${dealId}`);
      return dealId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete deal"
      );
    }
  }
);

const initialState = {
  homePageData: null,
  homeCategories: [],
  deals: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Home Categories
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })
      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Deals
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Deal
      .addCase(createDeal.fulfilled, (state, action) => {
        state.deals.push(action.payload);
      })

      // Delete Deal
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.deals = state.deals.filter((d) => d.id !== action.payload);
      });
  },
});

export default homeSlice.reducer;