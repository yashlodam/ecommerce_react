import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircle";

import { useAppDispatch } from "../../../State/Store";
import { sendLoginSignupOtp, signup } from "../../../State/AuthSlice";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email address is required"),
      otp: otpSent
        ? Yup.string()
            .length(6, "OTP must be 6 digits")
            .required("6-digit OTP is required")
        : Yup.string(),
      fullName: otpSent
        ? Yup.string()
            .min(2, "Name must be at least 2 characters")
            .required("Full name is required")
        : Yup.string(),
    }),
    onSubmit: async (values) => {
      setSignupLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        await dispatch(signup(values)).unwrap();
        setSuccessMessage("Account created successfully! Redirecting to shop...");
        setTimeout(() => navigate("/"), 1200);
      } catch (error) {
        setErrorMessage(
          typeof error === "string" ? error : "Registration failed. Please try again."
        );
      } finally {
        setSignupLoading(false);
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
      setSuccessMessage("Verification code sent to your email!");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrorMessage(
        typeof error === "string" ? error : "Unable to send verification code. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {otpSent ? "Complete Your Profile" : "Create Account"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {otpSent ? (
            <span>
              Verifying <strong className="text-slate-800 dark:text-slate-200">{formik.values.email}</strong>
            </span>
          ) : (
            "Join ShopSphere to explore thousands of verified vendors"
          )}
        </p>
      </div>

      {/* Feedback Alerts */}
      <Collapse in={Boolean(successMessage)}>
        <Alert
          severity="success"
          icon={<CheckCircleOutlineIcon fontSize="inherit" />}
          className="rounded-2xl text-xs font-semibold"
          sx={{ py: 0.5 }}
        >
          {successMessage}
        </Alert>
      </Collapse>

      <Collapse in={Boolean(errorMessage)}>
        <Alert
          severity="error"
          className="rounded-2xl text-xs font-semibold"
          sx={{ py: 0.5 }}
        >
          {errorMessage}
        </Alert>
      </Collapse>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
            Email Address
          </label>
          <TextField
            fullWidth
            size="medium"
            placeholder="name@example.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={otpSent || signupLoading}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon sx={{ fontSize: 19, color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                fontSize: "14px",
                bgcolor: "background.paper",
              },
            }}
          />
        </div>

        {/* Action: Send OTP vs Verify Profile */}
        {!otpSent ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleSendOtp}
            startIcon={
              loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <SendRoundedIcon sx={{ fontSize: 17 }} />
              )
            }
            sx={{
              py: 1.3,
              borderRadius: "14px",
              fontWeight: 700,
              textTransform: "none",
              fontSize: "14px",
              boxShadow: "0 4px 14px rgba(0, 146, 124, 0.3)",
            }}
          >
            {loading ? "Sending Verification Code..." : "Send Verification OTP"}
          </Button>
        ) : (
          <div className="space-y-3.5 pt-1">
            {/* OTP Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  6-Digit OTP Code
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    formik.setFieldValue("otp", "");
                    formik.setFieldValue("fullName", "");
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  <ArrowBackIcon sx={{ fontSize: 13 }} />
                  Change Email
                </button>
              </div>

              <TextField
                fullWidth
                size="medium"
                placeholder="••••••"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={signupLoading}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ fontSize: 19, color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    fontSize: "15px",
                    letterSpacing: "0.15em",
                    bgcolor: "background.paper",
                  },
                }}
              />
            </div>

            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <TextField
                fullWidth
                size="medium"
                placeholder="e.g. Yash Lodam"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={signupLoading}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon sx={{ fontSize: 19, color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    fontSize: "14px",
                    bgcolor: "background.paper",
                  },
                }}
              />
            </div>

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={signupLoading}
              startIcon={
                signupLoading ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <PersonAddRoundedIcon sx={{ fontSize: 17 }} />
                )
              }
              sx={{
                py: 1.3,
                borderRadius: "14px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "14px",
                boxShadow: "0 4px 14px rgba(0, 146, 124, 0.3)",
              }}
            >
              {signupLoading ? "Creating Account..." : "Complete Registration"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegisterForm;