import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// Create Home Categories
export const createHomeCategories = createAsyncThunk(
  "home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories);

      console.log("Home Categories Created:", response.data);

      return response.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.message || "Failed to create home categories"
      );
    }
  }
);



const initialState = {
  homePageData: null,
  homeCategories: [],
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

  },
});

export default homeSlice.reducer;