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
import * as Yup from "yup";
import { sendLoginSignupOtp, verifyLoginSignupOtp } from "../../../State/AuthSlice";
import { useAppDispatch } from "../../../State/Store";

const RESEND_COOLDOWN_SECONDS = 30;

// Styles moved outside to prevent re-creation
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

// Yup schema – OTP field is only validated when otpSent is true
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  otp: Yup.string()
    .when("$otpSent", {
      is: true,
      then: (schema) =>
        schema
          .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
          .required("OTP is required"),
    }),
});

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

  const formik = useFormik({
    initialValues: { email: "", otp: "" },
    validationSchema,
    // Pass the otpSent flag so the schema can conditionally validate OTP
    validationContext: { otpSent },
    onSubmit: async (values) => {
      setError("");
      setSuccess("");
      setVerifying(true);
      try {
        const result = await dispatch(
          verifyLoginSignupOtp({
            email: values.email.trim(),
            otp: values.otp.trim(),
          })
        ).unwrap();
        setSuccess(result?.message || "Login successful. Redirecting...");
        // Small delay so the user sees the success message
        setTimeout(() => {
          navigate("/seller/dashboard");
        }, 1500);
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

  // Cooldown countdown for resend button
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
    // Validate only the email field
    const emailError = await formik.validateField("email");
    formik.setFieldTouched("email", true, false);
    if (emailError) return;

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

  // Auto-submit when OTP reaches 6 digits
  const handleOtpChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
    formik.setFieldValue("otp", digitsOnly);
    if (digitsOnly.length === 6 && !verifying) {
      // Allow formik state to update before submitting
      setTimeout(() => formik.submitForm(), 0);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 480 },
        mx: "auto",
        mt: { xs: 2, md: 5 },
        p: { xs: 3, sm: 4, md: 5 },
        borderRadius: "28px",
        background: "#ffffff",
        border: "1px solid #f1f5f9",
        boxShadow: `0 4px 12px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.08)`,
      }}
    >
      {/* Header */}
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
        <div className="space-y-5">
          {/* Email Field */}
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
              {/* Change Email Link */}
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

              {/* OTP Field */}
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

              {/* Verify Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={verifying}
                sx={gradientButtonSx}
              >
                {verifying ? (
                  <CircularProgress size={22} sx={{ color: "#fff" }} />
                ) : (
                  "Verify & Login"
                )}
              </Button>

              {/* Resend OTP */}
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