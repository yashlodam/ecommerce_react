import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";

export const sendLoginSignupOtp = createAsyncThunk(
  "/auth/sendLoginSignupOtp",
  async (email) => {
    try {
      const response = await api.post(
        "/auth/sent/login-signup-otp",
        {
          email: email,
        }
      );

      console.log("Login otp is", response.data);

      return response.data;
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Full Error:", error);

      throw error;
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        otp,
      });

      localStorage.setItem("jwt", response.data.jwt);
      
      console.log("Login successful", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed"
      );
    }
  }
);



export const signup = createAsyncThunk(
  "auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);

      if (response.data.jwt) {
        localStorage.setItem("jwt", response.data.jwt);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Signup failed"
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "/auth/fetchUserProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("User Profile:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

export const logout = createAsyncThunk("/auth/logout",
  async(navigate, {rejectWithValue})=>{
    try{
      localStorage.clear()
      console.log("logout sucess")
      navigate("/")
    } catch(error){
      console.log("error.......",error)
    }
  }
)


export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ userData, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        "/api/users/profile/update",
        userData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("Profile updated successfully", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update profile"
      );
    }
  }
);

export const fetchCurrentRole = createAsyncThunk(
  "auth/fetchCurrentRole",
  async (jwt, { rejectWithValue }) => {
    try {

      const response = await api.get("/auth/current-role", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data.role;

    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch role"
      );
    }
  }
);



const initialState = {
  jwt: localStorage.getItem("jwt"),
  role: null,
  otpSend: false,
  isLoggedIn: !!localStorage.getItem("jwt"),
  user: null,
  loading: false,
  error: null,
};


const authSlice = createSlice({
   name:"auth",
   initialState,
   reducers:{},
  extraReducers: (builder) => {
  builder

    // ===================== SEND OTP =====================
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

    .addCase(fetchCurrentRole.fulfilled,(state,action)=>{
    state.role = action.payload;
})

    // ===================== SIGN IN =====================
    .addCase(signin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      state.error = null;
    })
    .addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    })

    // ===================== SIGN UP =====================
    .addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload.jwt;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      state.error = null;
    })
    .addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ===================== FETCH USER PROFILE =====================
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

    // ===================== UPDATE USER PROFILE =====================
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

    // ===================== LOGOUT =====================
    .addCase(logout.fulfilled, (state) => {
      state.jwt = null;
      state.role = null;
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.otpSend = false;
    });
}
})

export default authSlice.reducer