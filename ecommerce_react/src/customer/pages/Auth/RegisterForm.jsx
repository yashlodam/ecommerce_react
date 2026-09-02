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
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

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
        .email("Enter valid email")
        .required("Email is required"),
      otp: otpSent
        ? Yup.string()
            .length(6, "OTP must be 6 digits")
            .required("OTP is required")
        : Yup.string(),
      fullName: otpSent
        ? Yup.string().required("Full name is required")
        : Yup.string(),
    }),
    onSubmit: async (values) => {
      setSignupLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        await dispatch(signup(values)).unwrap();
        setSuccessMessage("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        setErrorMessage(
          typeof error === "string" ? error : "Signup failed. Please try again."
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
      setSuccessMessage("OTP sent to your email. Valid for 10 minutes.");
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrorMessage(
        typeof error === "string" ? error : "Unable to send OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Create Account
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Join ShopSphere to explore thousands of verified vendors
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
            label="Email Address"
            placeholder="name@example.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={otpSent}
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
              disabled={loading}
              onClick={handleSendOtp}
              startIcon={
                loading ? (
                  <CircularProgress size={18} color="inherit" />
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
              {loading ? "Sending OTP..." : "Send Verification OTP"}
            </Button>
          ) : (
            <div className="space-y-3">
              <TextField
                fullWidth
                label="Enter 6-Digit OTP"
                placeholder="000000"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Your Full Name"
                placeholder="John Doe"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={signupLoading}
                startIcon={
                  signupLoading ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : (
                    <PersonAddRoundedIcon />
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
                {signupLoading ? "Creating Account..." : "Complete Registration"}
              </Button>

              <div className="text-center pt-1">
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    setOtpSent(false);
                    formik.setFieldValue("otp", "");
                    formik.setFieldValue("fullName", "");
                  }}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Change Email Address
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;