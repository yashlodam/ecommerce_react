import React, { useEffect, useState, useCallback } from "react";
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

const OTP_EXPIRY_SECONDS = 600; // Must match backend OTP_EXPIRY_MINUTES (10 min)

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

  // ─── OTP Countdown Timer ─────────────────────────────────────────────────────
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

        // Redirect to the page the user was trying to reach, or role-based default
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

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "#f8fafc",
      "&:hover": { backgroundColor: "#f1f5f9" },
      "&.Mui-focused": {
        backgroundColor: "#ffffff",
        boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.1)",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0" },
  };

  const primaryButtonStyles = {
    height: 54,
    borderRadius: "16px",
    textTransform: "none",
    fontWeight: 700,
    fontSize: "1rem",
    boxShadow: "none",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(25,118,210,0.25)",
    },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        p: { xs: 4, sm: 5 },
        borderRadius: "24px",
        border: "1px solid #f1f5f9",
        background: "#ffffff",
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" align="center" fontWeight={800} gutterBottom>
          Welcome Back
        </Typography>
        <Typography align="center" color="text.secondary" variant="body2" sx={{ fontSize: "15px" }}>
          Login to continue shopping
        </Typography>
      </Box>

      <Collapse in={Boolean(successMessage)}>
        <Alert severity="success" sx={{ mb: 2, borderRadius: "12px" }}>
          {successMessage}
        </Alert>
      </Collapse>

      <Collapse in={Boolean(errorMessage)}>
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {errorMessage}
        </Alert>
      </Collapse>

      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            placeholder="Enter your email"
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
                  <CircularProgress color="inherit" size={18} />
                ) : (
                  <SendRoundedIcon />
                )
              }
              sx={{ ...primaryButtonStyles, mt: 2 }}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          ) : (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                name="otp"
                label="Enter OTP"
                placeholder="6-digit OTP"
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
                sx={textFieldStyles}
              />

              {/* Countdown timer */}
              {!otpExpired && (
                <Box>
                  <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="caption" color="text.secondary">
                      OTP expires in
                    </Typography>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      color={`${timerColor}.main`}
                    >
                      {formatTime(countdown)}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(countdown / OTP_EXPIRY_SECONDS) * 100}
                    color={timerColor}
                    sx={{ borderRadius: 4, height: 5 }}
                  />
                </Box>
              )}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loginLoading || otpExpired}
                startIcon={
                  loginLoading ? (
                    <CircularProgress color="inherit" size={18} />
                  ) : (
                    <LoginRoundedIcon />
                  )
                }
                sx={primaryButtonStyles}
              >
                {loginLoading ? "Verifying..." : "Login"}
              </Button>

              {/* Resend OTP */}
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
                  width: "fit-content",
                  mx: "auto",
                  textTransform: "none",
                  fontWeight: 600,
                  color: otpExpired ? "error.main" : "text.secondary",
                  "&:hover": { color: "primary.main", background: "transparent" },
                }}
              >
                {otpExpired ? "Request New OTP" : "Resend OTP"}
              </Button>
            </Box>
          )}
        </Box>
      </form>
    </Paper>
  );
}

export default LoginForm;