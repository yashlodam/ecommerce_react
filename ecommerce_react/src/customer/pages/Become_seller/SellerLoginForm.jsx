import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
import { useAppDispatch } from "../../../State/Store";
import { fetchSellerProfile } from "../../../State/seller/sellerSlice";
import { toast } from "../../../common/toast";

const RESEND_COOLDOWN_SECONDS = 30;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function SellerLoginForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const otpSentRef = useRef(otpSent);
  useEffect(() => {
    otpSentRef.current = otpSent;
  }, [otpSent]);

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "Enter a valid email address";
    }
    if (otpSentRef.current) {
      if (!values.otp) {
        errors.otp = "OTP is required";
      } else if (!/^\d{6}$/.test(values.otp)) {
        errors.otp = "OTP must be exactly 6 digits";
      }
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    validate,
    onSubmit: async (values) => {
      setError("");
      setSuccess("");
      setVerifying(true);
      try {
        const result = await dispatch(
          signin({
            email: `seller_${values.email.trim()}`,
            otp: values.otp.trim(),
          })
        ).unwrap();

        setSuccess(result?.message || "Login successful.");
        toast.success("Welcome to your Seller Dashboard!");
        if (result?.jwt) {
          await dispatch(fetchSellerProfile(result.jwt));
        }
        navigate("/seller");
      } catch (err) {
        const message =
          typeof err === "string"
            ? err
            : err?.message || "Invalid or expired OTP. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setVerifying(false);
      }
    },
  });

  useEffect(() => {
    if (cooldown <= 0) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  const handleSendOtp = async () => {
    const errors = await formik.validateForm();
    formik.setFieldTouched("email", true, false);
    if (errors.email) return;

    setError("");
    setSuccess("");
    setSendingOtp(true);
    try {
      const result = await dispatch(
        sendLoginSignupOtp(formik.values.email.trim())
      ).unwrap();
      setOtpSent(true);
      setCooldown(RESEND_COOLDOWN_SECONDS);
      setSuccess(result?.message || "OTP sent successfully to your email.");
      toast.info("Verification code sent to your email.");
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Failed to send OTP. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleChangeEmail = () => {
    setOtpSent(false);
    setCooldown(0);
    setError("");
    setSuccess("");
    formik.setFieldValue("otp", "");
    formik.setFieldTouched("otp", false, false);
  };

  const handleOtpChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
    formik.setFieldValue("otp", digitsOnly);
    if (digitsOnly.length === 6 && !verifying) {
      setTimeout(() => formik.submitForm(), 0);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-100 dark:border-teal-800 flex items-center justify-center mx-auto mb-3 text-teal-600 dark:text-teal-400">
          <EmailOutlinedIcon sx={{ fontSize: 24 }} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Seller Portal Login
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Access your seller dashboard with verified email OTP
        </p>
      </div>

      {success && (
        <Alert severity="success" className="mb-4 rounded-xl text-xs font-semibold">
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" className="mb-4 rounded-xl text-xs font-semibold">
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="space-y-4">
          <TextField
            fullWidth
            name="email"
            label="Seller Email Address"
            placeholder="seller@business.com"
            type="email"
            autoFocus={!otpSent}
            disabled={otpSent}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
              size="large"
              disabled={sendingOtp}
              onClick={handleSendOtp}
              sx={{
                py: 1.5,
                borderRadius: "14px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "15px",
              }}
            >
              {sendingOtp ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Send Seller OTP"
              )}
            </Button>
          ) : (
            <>
              <div className="text-right">
                <Button
                  variant="text"
                  size="small"
                  onClick={handleChangeEmail}
                  sx={{ textTransform: "none", fontWeight: 600, fontSize: "12px" }}
                >
                  Change Email
                </Button>
              </div>

              <TextField
                fullWidth
                name="otp"
                label="Enter 6-Digit OTP"
                placeholder="000000"
                autoFocus
                value={formik.values.otp}
                onChange={handleOtpChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                inputProps={{
                  inputMode: "numeric",
                  maxLength: 6,
                  autoComplete: "one-time-code",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={verifying}
                sx={{
                  py: 1.5,
                  borderRadius: "14px",
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "15px",
                }}
              >
                {verifying ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Verify & Access Dashboard"
                )}
              </Button>

              <div className="text-center pt-1">
                <Button
                  variant="text"
                  size="small"
                  disabled={cooldown > 0 || sendingOtp}
                  onClick={handleSendOtp}
                  sx={{ textTransform: "none", fontWeight: 600, fontSize: "13px" }}
                >
                  {cooldown > 0
                    ? `Resend OTP in ${cooldown}s`
                    : "Resend Verification Code"}
                </Button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default SellerLoginForm;