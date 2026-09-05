import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, executeSilentRefresh } from "../config/Api";

// ─── ASYNC THUNKS ────────────────────────────────────────────────────────────

export const sendLoginSignupOtp = createAsyncThunk(
  "auth/sendLoginSignupOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", {
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Failed to send OTP. Please try again."
      );
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      // Backend sets HttpOnly refresh token cookie and returns short-lived access token
      const response = await api.post("/auth/login", { email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Invalid OTP. Please try again."
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      // Backend sets HttpOnly refresh token cookie and returns short-lived access token
      const response = await api.post("/auth/signup", signupRequest);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Signup failed. Please try again."
      );
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      // Uses the shared single-flight executeSilentRefresh to eliminate concurrent refresh races
      const data = await executeSilentRefresh();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Session expired. Please login again."
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (navigate) => {
    try {
      // Revoke refresh token and clear cookie on the server
      await api.post("/auth/logout");
    } catch {
      // Ignore network errors during logout
    }
    // Clean up any remaining legacy localStorage tokens
    localStorage.removeItem("jwt");
    if (navigate) navigate("/");
    return null;
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        "/api/users/profile/update",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
);

export const fetchCurrentRole = createAsyncThunk(
  "auth/fetchCurrentRole",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/current-role");
      return response.data.role;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch role"
      );
    }
  }
);

// ─── INITIAL STATE ───────────────────────────────────────────────────────────

const initialState = {
  jwt: null, // Short-lived access token kept strictly in frontend memory
  role: null,
  otpSend: false,
  isLoggedIn: false,
  user: null,
  loading: false,
  authChecking: true, // true while checking silent refresh on initial app load
  error: null,
};

// ─── SLICE ───────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    resetOtpState: (state) => {
      state.otpSend = false;
    },
    setAccessToken: (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = !!action.payload;
      state.authChecking = false;
    },
    setAuthChecking: (state, action) => {
      state.authChecking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendLoginSignupOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginSignupOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSend = true;
      })
      .addCase(sendLoginSignupOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Current Role
      .addCase(fetchCurrentRole.fulfilled, (state, action) => {
        state.role = action.payload;
      })

      // Sign In
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.isLoggedIn = true;
        state.authChecking = false;
        state.error = null;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.authChecking = false;
      })

      // Sign Up
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.isLoggedIn = true;
        state.authChecking = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authChecking = false;
      })

      // Silent Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.isLoggedIn = true;
        state.authChecking = false;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.loading = false;
        state.jwt = null;
        state.role = null;
        state.isLoggedIn = false;
        state.authChecking = false;
      })

      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role;
        state.isLoggedIn = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.role = action.payload.role;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.jwt = null;
        state.role = null;
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.authChecking = false;
        state.error = null;
        state.otpSend = false;
      });
  },
});

export const { clearAuthError, resetOtpState, setAccessToken, setAuthChecking } = authSlice.actions;
export default authSlice.reducer;