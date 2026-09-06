import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  LinearProgress,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircle";

import { sendLoginSignupOtp, signin, fetchUserProfile } from "../../../State/AuthSlice";
import { fetchSellerProfile } from "../../../State/seller/sellerSlice";
import { fetchUserCart } from "../../../State/customer/CartSlice";
import { useAppDispatch } from "../../../State/Store";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "../../../common/toast";

const OTP_EXPIRY_SECONDS = 600; // 10 minutes

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

  const timerColor = countdown > 120 ? "primary" : countdown > 30 ? "warning" : "error";

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email address is required"),
      otp: otpSent
        ? Yup.string()
            .length(6, "OTP must be 6 digits")
            .required("6-digit OTP is required")
        : Yup.string(),
    }),
    onSubmit: async (values) => {
      if (otpExpired) {
        setErrorMessage("Your OTP has expired. Please request a fresh one.");
        return;
      }
      setLoginLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      try {
        const response = await dispatch(
          signin({ email: values.email.trim(), otp: values.otp.trim() })
        ).unwrap();

        toast.success("Welcome back to ShopSphere!");
        setSuccessMessage("Login successful! Redirecting...");
        const from = location.state?.from?.pathname;

        // Fetch user profile immediately so navbar and protected routes update instantly
        if (response.role === "ROLE_ADMIN") {
          await dispatch(fetchUserProfile());
          navigate(from || "/admin", { replace: true });
        } else if (response.role === "ROLE_SELLER") {
          await dispatch(fetchSellerProfile());
          navigate(from || "/seller", { replace: true });
        } else {
          await dispatch(fetchUserProfile());
          await dispatch(fetchUserCart());
          navigate(from || "/", { replace: true });
        }
      } catch (error) {
        const errText =
          typeof error === "string" ? error : "Invalid OTP code. Please try again.";
        setErrorMessage(errText);
        toast.error(errText);
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
      const res = await dispatch(sendLoginSignupOtp(formik.values.email.trim())).unwrap();
      setOtpSent(true);
      toast.info("Security code sent to your email!");
      if (res?.otp) {
        setSuccessMessage(`Demo OTP: ${res.otp} (Auto-filled)`);
        formik.setFieldValue("otp", res.otp);
      } else {
        setSuccessMessage("OTP code sent to your email! Valid for 10 minutes.");
        formik.setFieldValue("otp", "");
      }
      setTimeout(() => setSuccessMessage(""), 8000);
    } catch (error) {
      const errText =
        typeof error === "string" ? error : "Failed to send OTP code. Please try again.";
      setErrorMessage(errText);
      toast.error(errText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {otpSent ? "Verify Security Code" : "Welcome Back"}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {otpSent ? (
            <span>
              Code sent to <strong className="text-slate-800 dark:text-slate-200">{formik.values.email}</strong>
            </span>
          ) : (
            "Sign in with secure one-time password to continue"
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
            name="email"
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

        {/* Action: Send OTP vs Verify OTP */}
        {!otpSent ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSendOtp}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size={16} />
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
            {loading ? "Sending Security Code..." : "Send Login OTP"}
          </Button>
        ) : (
          <div className="space-y-4 pt-1">
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
                name="otp"
                placeholder="••••••"
                type={showOtp ? "text" : "password"}
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loginLoading || otpExpired}
                error={(formik.touched.otp && Boolean(formik.errors.otp)) || otpExpired}
                helperText={
                  otpExpired
                    ? "Code expired — please click resend below"
                    : formik.touched.otp && formik.errors.otp
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ fontSize: 19, color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowOtp(!showOtp)}
                        edge="end"
                        aria-label={showOtp ? "Hide OTP" : "Show OTP"}
                      >
                        {showOtp ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "14px",
                    fontSize: "16px",
                    letterSpacing: "0.2em",
                    bgcolor: "background.paper",
                  },
                }}
              />
            </div>

            {/* Countdown timer */}
            {!otpExpired && (
              <div className="space-y-1.5 px-0.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Code Expires In</span>
                  <span className="font-extrabold text-teal-600 dark:text-teal-400">
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

            {/* Verify Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loginLoading || otpExpired}
              startIcon={
                loginLoading ? (
                  <CircularProgress color="inherit" size={16} />
                ) : (
                  <LoginRoundedIcon sx={{ fontSize: 17 }} />
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
              {loginLoading ? "Verifying Credentials..." : "Verify & Sign In"}
            </Button>

            {/* Resend Action */}
            <div className="text-center pt-0.5">
              <Button
                variant="text"
                size="small"
                disabled={loading || loginLoading}
                onClick={handleSendOtp}
                startIcon={
                  loading ? (
                    <CircularProgress size={13} />
                  ) : (
                    <RefreshIcon sx={{ fontSize: 15 }} />
                  )
                }
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "primary.main",
                }}
              >
                {otpExpired ? "Request New Code" : "Resend Code"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginForm;