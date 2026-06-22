import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";

function SellerLoginForm() {
  const [otpSent, setOtpSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("Login Data", values);
    },
  });

  const handleSendOtp = () => {
    console.log("Send OTP to:", formik.values.email);

    // Call OTP API here

    setOtpSent(true);
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "#fafafa",

      "& fieldset": {
        borderColor: "#e5e7eb",
      },

      "&:hover fieldset": {
        borderColor: "#14b8a6",
      },

      "&.Mui-focused fieldset": {
        borderWidth: "2px",
        borderColor: "#14b8a6",
      },
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#14b8a6",
    },
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
        boxShadow: `
          0 4px 12px rgba(0,0,0,.04),
          0 12px 32px rgba(0,0,0,.08)
        `,
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="mx-auto mb-5 flex items-center justify-center rounded-full"
          style={{
            width: 72,
            height: 72,
            background:
              "linear-gradient(135deg,#14b8a6,#0f766e)",
          }}
        >
          <EmailOutlinedIcon
            sx={{ color: "white", fontSize: 34 }}
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Seller Login
        </h1>

        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Secure access using Email OTP verification
        </p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          {/* Email Field */}
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email &&
              Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email &&
              formik.errors.email
            }
            sx={inputStyle}
          />

          {!otpSent ? (
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSendOtp}
              sx={{
                py: 1.7,
                borderRadius: "16px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "15px",
                background:
                  "linear-gradient(135deg,#14b8a6,#0f766e)",

                "&:hover": {
                  background:
                    "linear-gradient(135deg,#0f766e,#115e59)",
                },
              }}
            >
              Send OTP
            </Button>
          ) : (
            <>
              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <p className="text-sm text-green-700 font-medium">
                  ✅ OTP sent successfully to your email address
                </p>
              </div>

              {/* OTP Field */}
              <TextField
                fullWidth
                name="otp"
                label="Enter OTP"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.otp &&
                  Boolean(formik.errors.otp)
                }
                helperText={
                  formik.touched.otp &&
                  formik.errors.otp
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon
                        sx={{ color: "#64748b" }}
                      />
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
                sx={{
                  py: 1.7,
                  borderRadius: "16px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "15px",
                  background:
                    "linear-gradient(135deg,#14b8a6,#0f766e)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg,#0f766e,#115e59)",
                  },
                }}
              >
                Verify & Login
              </Button>

              {/* Resend OTP */}
              <Button
                fullWidth
                variant="text"
                onClick={handleSendOtp}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "#0f766e",
                }}
              >
                Resend OTP
              </Button>
            </>
          )}
        </div>
      </form>
    </Box>
  );
}

export default SellerLoginForm;