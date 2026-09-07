import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api"

const API_URL = "/admin";

export const createHomeCategory = createAsyncThunk(
  "homeCategory/createHomeCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/home-category`, categoryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create home category"
      );
    }
  }
);

export const deleteHomeCategory = createAsyncThunk(
  "homeCategory/deleteHomeCategory",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/home-category/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete home category"
      );
    }
  }
);

export const updateHomeCategory = createAsyncThunk(
  "homeCategory/updateHomeCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${API_URL}/home-category/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred while updating the category"
      );
    }
  }
);

export const fetchHomeCategories = createAsyncThunk(
  "homeCategory/fetchHomeCategories",
  async (section, { rejectWithValue }) => {
    try {
      const url = section
        ? `${API_URL}/home-category?section=${section}`
        : `${API_URL}/home-category`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
  categoryUpdated: false,
};

const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {
    clearCategoryUpdated(state) {
      state.categoryUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Home Categories
      .addCase(fetchHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Home Category
      .addCase(createHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Home Category
      .addCase(updateHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.categoryUpdated = false;
      })
      .addCase(updateHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryUpdated = true;

        const index = state.categories.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        } else {
          state.categories.push(action.payload);
        }
      })
      .addCase(updateHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.categoryUpdated = false;
      })

      // Delete Home Category
      .addCase(deleteHomeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHomeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteHomeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategoryUpdated } = homeCategorySlice.actions;

export default homeCategorySlice.reducer;