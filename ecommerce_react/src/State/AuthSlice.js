import { createAsyncThunk } from "@reduxjs/toolkit";
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