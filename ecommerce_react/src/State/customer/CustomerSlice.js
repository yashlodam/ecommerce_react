import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// ================= Fetch Home Page Data (Public for Customers) =================
export const fetchHomePageData = createAsyncThunk(
  "home/fetchHomePageData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/home/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch homepage data"
      );
    }
  }
);

// ================= Create Home Categories (Admin Seed) =================
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

// ================= Fetch Active Deals (Public for Storefront) =================
export const fetchActiveDeals = createAsyncThunk(
  "home/fetchActiveDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/deals/active");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch active deals"
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

// ================= Update Deal (Admin) =================
export const updateDeal = createAsyncThunk(
  "home/updateDeal",
  async ({ id, deal }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/deals/${id}`, deal);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update deal"
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

// ================= Toggle Deal Status (Admin) =================
export const toggleAdminDealStatus = createAsyncThunk(
  "home/toggleAdminDealStatus",
  async (dealId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/deals/${dealId}/status`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle deal status"
      );
    }
  }
);

const initialState = {
  homePageData: null,
  homeCategories: null,
  deals: [],
  activeDeals: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearHomeError: (state) => {
      state.error = null;
    },
    resetHomeState: (state) => {
      state.homePageData = null;
      state.homeCategories = null;
      state.deals = [];
      state.activeDeals = [];
      state.loading = false;
      state.error = null;
    },
    setDeals: (state, action) => {
      state.deals = Array.isArray(action.payload) ? action.payload : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // ================= fetchHomePageData =================
      .addCase(fetchHomePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomePageData.fulfilled, (state, action) => {
        state.loading = false;
        state.homePageData = action.payload || null;
        state.homeCategories = action.payload || null;
        const incomingDeals = Array.isArray(action.payload?.deals)
          ? action.payload.deals
          : [];
        state.deals = incomingDeals;
        state.activeDeals = incomingDeals;
      })
      .addCase(fetchHomePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch homepage data";
      })

      // ================= createHomeCategories =================
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload || null;
        state.homePageData = action.payload || null;
        if (Array.isArray(action.payload?.deals)) {
          state.deals = action.payload.deals;
          state.activeDeals = action.payload.deals;
        }
      })
      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create home categories";
      })

      // ================= fetchActiveDeals (Public) =================
      .addCase(fetchActiveDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveDeals.fulfilled, (state, action) => {
        state.loading = false;
        const dealList = Array.isArray(action.payload) ? action.payload : [];
        state.activeDeals = dealList;
        if (!state.deals || state.deals.length === 0) {
          state.deals = dealList;
        }
        if (state.homeCategories) {
          state.homeCategories.deals = dealList;
        }
        if (state.homePageData) {
          state.homePageData.deals = dealList;
        }
      })
      .addCase(fetchActiveDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch active deals";
      })

      // ================= fetchDeals (Admin) =================
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        const dealList = Array.isArray(action.payload) ? action.payload : [];
        state.deals = dealList;
        if (state.homeCategories) {
          state.homeCategories.deals = dealList;
        }
        if (state.homePageData) {
          state.homePageData.deals = dealList;
        }
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch deals";
      })

      // ================= createDeal (Admin) =================
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        const deal = action.payload;
        if (!deal) return;

        if (!Array.isArray(state.deals)) {
          state.deals = [];
        }
        const idx = state.deals.findIndex((d) => d?.id === deal.id);
        if (idx !== -1) {
          state.deals[idx] = deal;
        } else {
          state.deals.unshift(deal);
        }

        if (!Array.isArray(state.activeDeals)) {
          state.activeDeals = [];
        }
        const activeIdx = state.activeDeals.findIndex((d) => d?.id === deal.id);
        if (activeIdx !== -1) {
          state.activeDeals[activeIdx] = deal;
        } else {
          state.activeDeals.unshift(deal);
        }

        if (state.homeCategories && Array.isArray(state.homeCategories.deals)) {
          const hcIdx = state.homeCategories.deals.findIndex((d) => d?.id === deal.id);
          if (hcIdx !== -1) {
            state.homeCategories.deals[hcIdx] = deal;
          } else {
            state.homeCategories.deals.unshift(deal);
          }
        }

        if (state.homePageData && Array.isArray(state.homePageData.deals)) {
          const hpIdx = state.homePageData.deals.findIndex((d) => d?.id === deal.id);
          if (hpIdx !== -1) {
            state.homePageData.deals[hpIdx] = deal;
          } else {
            state.homePageData.deals.unshift(deal);
          }
        }
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create deal";
      })

      // ================= updateDeal (Admin) =================
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        const deal = action.payload;
        if (!deal) return;

        if (Array.isArray(state.deals)) {
          const idx = state.deals.findIndex((d) => d?.id === deal.id);
          if (idx !== -1) state.deals[idx] = deal;
        }
        if (Array.isArray(state.activeDeals)) {
          const activeIdx = state.activeDeals.findIndex((d) => d?.id === deal.id);
          if (activeIdx !== -1) state.activeDeals[activeIdx] = deal;
        }
        if (state.homeCategories && Array.isArray(state.homeCategories.deals)) {
          const hcIdx = state.homeCategories.deals.findIndex((d) => d?.id === deal.id);
          if (hcIdx !== -1) state.homeCategories.deals[hcIdx] = deal;
        }
        if (state.homePageData && Array.isArray(state.homePageData.deals)) {
          const hpIdx = state.homePageData.deals.findIndex((d) => d?.id === deal.id);
          if (hpIdx !== -1) state.homePageData.deals[hpIdx] = deal;
        }
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update deal";
      })

      // ================= deleteDeal (Admin) =================
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        if (Array.isArray(state.deals)) {
          state.deals = state.deals.filter((d) => d?.id !== id);
        }
        if (Array.isArray(state.activeDeals)) {
          state.activeDeals = state.activeDeals.filter((d) => d?.id !== id);
        }
        if (state.homeCategories && Array.isArray(state.homeCategories.deals)) {
          state.homeCategories.deals = state.homeCategories.deals.filter((d) => d?.id !== id);
        }
        if (state.homePageData && Array.isArray(state.homePageData.deals)) {
          state.homePageData.deals = state.homePageData.deals.filter((d) => d?.id !== id);
        }
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete deal";
      })

      // ================= toggleAdminDealStatus (Admin) =================
      .addCase(toggleAdminDealStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleAdminDealStatus.fulfilled, (state, action) => {
        state.loading = false;
        const deal = action.payload;
        if (!deal) return;

        if (Array.isArray(state.deals)) {
          const idx = state.deals.findIndex((d) => d?.id === deal.id);
          if (idx !== -1) state.deals[idx] = deal;
        }
        if (Array.isArray(state.activeDeals)) {
          const activeIdx = state.activeDeals.findIndex((d) => d?.id === deal.id);
          if (activeIdx !== -1) {
            if (deal.active === false || deal.status === "INACTIVE") {
              state.activeDeals.splice(activeIdx, 1);
            } else {
              state.activeDeals[activeIdx] = deal;
            }
          } else if (deal.active !== false && deal.status !== "INACTIVE") {
            state.activeDeals.unshift(deal);
          }
        }
        if (state.homeCategories && Array.isArray(state.homeCategories.deals)) {
          const hcIdx = state.homeCategories.deals.findIndex((d) => d?.id === deal.id);
          if (hcIdx !== -1) state.homeCategories.deals[hcIdx] = deal;
        }
        if (state.homePageData && Array.isArray(state.homePageData.deals)) {
          const hpIdx = state.homePageData.deals.findIndex((d) => d?.id === deal.id);
          if (hpIdx !== -1) state.homePageData.deals[hpIdx] = deal;
        }
      })
      .addCase(toggleAdminDealStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to toggle deal status";
      });
  },
});

export const { clearHomeError, resetHomeState, setDeals } = homeSlice.actions;
export default homeSlice.reducer;