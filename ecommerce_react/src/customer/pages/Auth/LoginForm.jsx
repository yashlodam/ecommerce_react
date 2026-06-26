import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";

import { useAppDispatch } from "../../../State/Store";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // FIXED: Added missing states for errorMessage and loginLoading
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false); // Used for sending OTP
  const [loginLoading, setLoginLoading] = useState(false); // Used for submitting OTP
  const [showOtp, setShowOtp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),

      otp: otpSent
        ? Yup.string()
            .length(6, "OTP must be 6 digits")
            .required("OTP is required")
        : Yup.string(),
    }),

    onSubmit: async (values) => {
      setLoginLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        await dispatch(
          signin({
            email: values.email.trim(),
            otp: values.otp.trim(),
          })
        ).unwrap();

        setSuccessMessage("Login successful.");
        navigate("/");
      } catch (error) {
        setErrorMessage(
          typeof error === "string" ? error : "Invalid OTP. Please try again."
        );
      } finally {
        setLoginLoading(false);
      }
    },
  });

  const handleSendOtp = async () => {
    if (!formik.values.email.trim()) {
      formik.setFieldTouched("email", true);
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await dispatch(sendLoginSignupOtp(formik.values.email.trim())).unwrap();

      setOtpSent(true);
      setSuccessMessage("OTP sent successfully to your email.");

      // Hide after 4 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      console.error(error);
      // FIXED: Actually display the error to the user if sending OTP fails
      setErrorMessage(
        typeof error === "string" ? error : "Failed to send OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Reusable styling for TextFields to keep code clean
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "#f8fafc", // Soft background color
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: "#f1f5f9",
      },
      "&.Mui-focused": {
        backgroundColor: "#ffffff",
        boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.1)", // Modern focus ring
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e2e8f0",
    },
  };

  // Reusable styling for Primary Buttons
  const primaryButtonStyles = {
    height: 54,
    borderRadius: "16px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "1rem",
    boxShadow: "none",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(25,118,210,0.25)",
      backgroundColor: "primary.dark",
    },
    "&:disabled": {
      backgroundColor: "#e2e8f0",
      color: "#94a3b8",
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        p: { xs: 4, sm: 5 }, // Responsive padding
        borderRadius: "24px",
        border: "1px solid #f1f5f9",
        background: "#ffffff",
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)", // Softer, more modern shadow
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          align="center"
          fontWeight={800}
          color="text.primary"
          gutterBottom
        >
          Welcome Back
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          variant="body2"
          sx={{ fontSize: "15px" }}
        >
          Login to continue shopping
        </Typography>
      </Box>

      {/* Success Alert */}
      <Collapse in={Boolean(successMessage)}>
        <Alert
          severity="success"
          sx={{
            mb: 2,
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          {successMessage}
        </Alert>
      </Collapse>

      {/* Error Alert */}
      <Collapse in={Boolean(errorMessage)}>
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          {errorMessage}
        </Alert>
      </Collapse>

      {/* FIXED: Removed the duplicate, empty <form> tag that was here */}
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={4}>
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={otpSent || loginLoading} // Added loginLoading disable
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon color={otpSent ? "disabled" : "primary"} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          {!otpSent ? (
            <Button
              fullWidth
              variant="contained"
              onClick={handleSendOtp}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress color="inherit" size={18} thickness={5} />
                ) : (
                  <SendRoundedIcon />
                )
              }
              sx={{
                ...primaryButtonStyles,
                mt: 5,
              }}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          ) : (
            <Box display="flex" flexDirection="column" gap={3} mt={1}>
              <TextField
                fullWidth
                name="otp"
                label="Enter OTP"
                placeholder="Enter 6 digit OTP"
                type={showOtp ? "text" : "password"}
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loginLoading} // Added loginLoading disable
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowOtp(!showOtp)}
                        edge="end"
                        sx={{ color: "text.secondary" }}
                      >
                        {showOtp ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ ...textFieldStyles, mt: 2 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loginLoading} // Added loginLoading disable
                startIcon={
                  loginLoading ? (
                    <CircularProgress color="inherit" size={18} thickness={5} />
                  ) : (
                    <LoginRoundedIcon />
                  )
                }
                sx={{ ...primaryButtonStyles, mt: 2 }}
              >
                {loginLoading ? "Verifying..." : "Login"}
              </Button>

              <Button
                variant="text"
                disabled={loginLoading} // Added loginLoading disable
                onClick={() => {
                  setOtpSent(false);
                  setShowOtp(false);
                  setErrorMessage(""); // Clear old errors
                  setSuccessMessage(""); // Clear old success 
                  formik.setFieldValue("otp", "");
                }}
                sx={{
                  width: "fit-content",
                  mx: "auto",
                  textTransform: "none",
                  fontWeight: 600,
                  color: "text.secondary",
                  "&:hover": {
                    color: "primary.main",
                    background: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Change Email Address
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </Paper>
  );
}

export default LoginForm;