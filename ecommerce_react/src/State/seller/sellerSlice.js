import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerProfile = createAsyncThunk(
  "sellers/fetchSellerProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch seller profile"
      );
    }
  }
);

export const createSellers = createAsyncThunk(
  "sellers/createSellers",
  async (sellerData, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers", sellerData);

      console.log("create seller", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create seller"
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
    logout: (state) => {
      state.profile = null;
      state.selectedSeller = null;
      state.report = null;
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Seller Profile
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

      // Create Seller
      .addCase(createSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createSellers.fulfilled, (state, action) => {
        state.loading = false;

        // Save created seller
        state.profile = action.payload;

        // Optional: keep list updated
        state.sellers.push(action.payload);
      })

      .addCase(createSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = sellerSlice.actions;

export default sellerSlice.reducer;