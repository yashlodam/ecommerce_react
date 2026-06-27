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
  "/auth/signin",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        otp,
      });

      console.log(email,otp);

      const jwt = response.data.jwt;
      localStorage.setItem("jwt",jwt);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed"
      );
    }
  }
);



export const signup = createAsyncThunk(
  "/auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);

      console.log("registered suceesfully",response.data)

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed"
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



const initialState = {
  jwt:null,
  otpSend:false,
  isLoggedIn: !!localStorage.getItem("jwt"),
  user:null
}


const authSlice = createSlice({
   name:"auth",
   initialState,
   reducers:{},
   extraReducers:(builder)=>{
           builder.addCase(signin.fulfilled,(state,action)=>{
            state.jwt = action.payload;
            state.isLoggedIn = true
           })
           builder.addCase(signup.fulfilled,(state,action)=>{
             state.jwt = action.payload
             state.isLoggedIn = true
           })
           builder.addCase(fetchUserProfile.fulfilled,(state,action)=>{
            state.user = action.payload
            state.isLoggedIn=true
           })
           builder.addCase(logout.fulfilled,(state)=>{
            state.jwt = null
            state.isLoggedIn = false
            state.user=null
           })
   }
})

export default authSlice.reducer