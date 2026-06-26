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


export const logout = createAsyncThunk("/auth/logout",
  async(navigate,{rejectWithValue})=>{
    try{
      localStorage.clear()
      console.log("logout sucess")
      navigate("/")
    } catch(e){
      console.log(e)
    }
  }
)


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

const initialState = {
  jwt:null,
  otpSend:false,
  isLoggedIn:false,
  user:null
}


const authSlice = createSlice({
   name:"auth",
   initialState,
   reducers:{},
   extraReducers:{
    
   }
})