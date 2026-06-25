import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import { sendLoginSignupOtp,signin } from "../../../State/AuthSlice";
import { useAppDispatch } from "../../../State/Store";
import { fetchSellerProfile } from "../../../State/seller/sellerSlice";

const RESEND_COOLDOWN_SECONDS = 30;

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#fafafa",
    "& fieldset": { borderColor: "#e5e7eb" },
    "&:hover fieldset": { borderColor: "#14b8a6" },
    "&.Mui-focused fieldset": { borderWidth: "2px", borderColor: "#14b8a6" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#14b8a6" },
};

const gradientButtonSx = {
  py: 1.7,
  borderRadius: "16px",
  textTransform: "none",
  fontWeight: 700,
  fontSize: "15px",
  background: "linear-gradient(135deg,#14b8a6,#0f766e)",
  "&:hover": { background: "linear-gradient(135deg,#0f766e,#115e59)" },
  "&.Mui-disabled": { background: "#a7d8d2", color: "#fff" },
};

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
      errors.email = "Enter a valid email";
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

const jwt = localStorage.getItem("jwt");
console.log(jwt);

if (jwt) {
  await dispatch(fetchSellerProfile(jwt));
}

navigate("/seller");
      } catch (err) {
        const message =
          typeof err === "string"
            ? err
            : err?.message || "Invalid or expired OTP. Please try again.";
        setError(message);
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
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Failed to send OTP. Please try again.";
      setError(message);
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
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 480 },
        mx: "auto",
        mt: { xs: 3, md: 5 },
        p: { xs: 3, sm: 4, md: 5 },
        borderRadius: "28px",
        background: "#ffffff",
        border: "1px solid #f1f5f9",
        boxShadow: `0 4px 12px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.08)`,
      }}
    >
      <div className="text-center mb-8">
        <div
          className="mx-auto mb-5 flex items-center justify-center rounded-full"
          style={{
            width: 72,
            height: 72,
            background: "linear-gradient(135deg,#14b8a6,#0f766e)",
          }}
        >
          <EmailOutlinedIcon sx={{ color: "white", fontSize: 34 }} />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Seller Login
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Secure access using Email OTP verification
        </p>
      </div>

      {success && (
        <Alert severity="success" sx={{ borderRadius: 2, mb: 2 }}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ borderRadius: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        {/* 🔥 Changed from space-y-5 to space-y-4 for a tighter, cleaner gap */}
        <div className="space-y-4">
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            autoFocus={!otpSent}
            disabled={otpSent}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={inputStyle}
          />

          {!otpSent ? (
            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={sendingOtp}
              onClick={handleSendOtp}
              sx={gradientButtonSx}
            >
              {sendingOtp ? (
                <CircularProgress size={22} sx={{ color: "#fff" }} />
              ) : (
                "Send OTP"
              )}
            </Button>
          ) : (
            <>
              <div className="text-right">
                <Button
                  variant="text"
                  size="small"
                  onClick={handleChangeEmail}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    color: "#0f766e",
                  }}
                >
                  Change email
                </Button>
              </div>

              <TextField
                fullWidth
                name="otp"
                label="Enter OTP"
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
                      <LockOutlinedIcon sx={{ color: "#64748b" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={verifying}
                sx={{
                  ...gradientButtonSx,
                  mt: 3,
                }}
              >
                {verifying ? (
                  <CircularProgress size={22} sx={{ color: "#fff" }} />
                ) : (
                  "Verify & Login"
                )}
              </Button>

              <Button
                fullWidth
                variant="text"
                disabled={cooldown > 0 || sendingOtp}
                onClick={handleSendOtp}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#0f766e",
                }}
              >
                {cooldown > 0
                  ? `Resend OTP in ${cooldown}s`
                  : "Resend OTP"}
              </Button>
            </>
          )}
        </div>
      </form>
    </Box>
  );
}

export default SellerLoginForm;