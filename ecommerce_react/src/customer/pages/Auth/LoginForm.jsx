import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RefreshIcon from "@mui/icons-material/Refresh";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
import { useAppDispatch } from "../../../State/Store";
import { useNavigate, useLocation } from "react-router-dom";

const OTP_EXPIRY_SECONDS = 600; // 10 min

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(OTP_EXPIRY_SECONDS);
  const [otpExpired, setOtpExpired] = useState(false);

  useEffect(() => {
    if (!otpSent) return;

    setCountdown(OTP_EXPIRY_SECONDS);
    setOtpExpired(false);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setOtpExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const timerColor = countdown > 120 ? "success" : countdown > 30 ? "warning" : "error";

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
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
      if (otpExpired) {
        setErrorMessage("Your OTP has expired. Please request a new one.");
        return;
      }
      setLoginLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      try {
        const response = await dispatch(
          signin({ email: values.email.trim(), otp: values.otp.trim() })
        ).unwrap();

        setSuccessMessage("Login successful!");
        const from = location.state?.from?.pathname;

        if (response.role === "ROLE_ADMIN") {
          navigate(from || "/admin");
        } else if (response.role === "ROLE_SELLER") {
          navigate(from || "/seller");
        } else {
          navigate(from || "/");
        }
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
      setSuccessMessage("OTP sent to your email. Valid for 10 minutes.");
      formik.setFieldValue("otp", "");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrorMessage(
        typeof error === "string" ? error : "Failed to send OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Welcome Back
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Sign in via secure OTP to continue shopping
        </p>
      </div>

      <Collapse in={Boolean(successMessage)}>
        <Alert severity="success" className="mb-4 rounded-xl text-xs font-semibold">
          {successMessage}
        </Alert>
      </Collapse>

      <Collapse in={Boolean(errorMessage)}>
        <Alert severity="error" className="mb-4 rounded-xl text-xs font-semibold">
          {errorMessage}
        </Alert>
      </Collapse>

      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-4">
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            placeholder="name@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={otpSent || loginLoading}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon color={otpSent ? "disabled" : "primary"} />
                </InputAdornment>
              ),
            }}
          />

          {!otpSent ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSendOtp}
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress color="inherit" size={18} />
                ) : (
                  <SendRoundedIcon />
                )
              }
              sx={{
                py: 1.5,
                borderRadius: "14px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "15px",
              }}
            >
              {loading ? "Sending OTP..." : "Send Login OTP"}
            </Button>
          ) : (
            <div className="space-y-3">
              <TextField
                fullWidth
                name="otp"
                label="Enter 6-Digit OTP"
                placeholder="000000"
                type={showOtp ? "text" : "password"}
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loginLoading || otpExpired}
                error={
                  (formik.touched.otp && Boolean(formik.errors.otp)) ||
                  otpExpired
                }
                helperText={
                  otpExpired
                    ? "OTP expired — please request a new one"
                    : formik.touched.otp && formik.errors.otp
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordOutlinedIcon color={otpExpired ? "error" : "primary"} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowOtp(!showOtp)} edge="end">
                        {showOtp ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Countdown timer */}
              {!otpExpired && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">OTP Expires In</span>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      {formatTime(countdown)}
                    </span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={(countdown / OTP_EXPIRY_SECONDS) * 100}
                    color={timerColor}
                    sx={{ borderRadius: 4, height: 4 }}
                  />
                </div>
              )}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loginLoading || otpExpired}
                startIcon={
                  loginLoading ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : (
                    <LoginRoundedIcon />
                  )
                }
                sx={{
                  py: 1.5,
                  borderRadius: "14px",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "15px",
                }}
              >
                {loginLoading ? "Verifying..." : "Verify & Sign In"}
              </Button>

              <div className="text-center pt-1">
                <Button
                  variant="text"
                  disabled={loading || loginLoading}
                  onClick={handleSendOtp}
                  startIcon={
                    loading ? (
                      <CircularProgress size={14} />
                    ) : (
                      <RefreshIcon fontSize="small" />
                    )
                  }
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "13px",
                  }}
                >
                  {otpExpired ? "Request New OTP" : "Resend OTP"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;