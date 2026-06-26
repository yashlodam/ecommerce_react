import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";

import { useAppDispatch } from "../../../State/Store";
import { sendLoginSignupOtp } from "../../../State/AuthSlice";


function RegisterForm() {
  const dispatch = useAppDispatch();

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
    // await dispatch(signup(values)).unwrap();

    setSuccessMessage("Account created successfully.");

  } catch (error) {
    setErrorMessage("Signup failed.");
  } finally {
    setSignupLoading(false);
  }
}
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
    await dispatch(sendLoginSignupOtp(formik.values.email)).unwrap();

    setOtpSent(true);
    setSuccessMessage("OTP sent successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (error) {
    setErrorMessage("Unable to send OTP.");
  } finally {
    setLoading(false);
  }
};

  const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#f8fafc",
    transition: ".25s",

    "&:hover": {
      backgroundColor: "#f1f5f9",
    },

    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "0 0 0 4px rgba(25,118,210,.10)",
    },
  },

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e2e8f0",
  },
};
const primaryButtonStyles = {
  height: 54,
  borderRadius: "16px",
  textTransform: "none",
  fontWeight: 700,
  fontSize: "1rem",
  boxShadow: "none",

  transition: ".25s",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 30px rgba(25,118,210,.25)",
  },

  "&:disabled": {
    background: "#e2e8f0",
    color: "#94a3b8",
  },
};

  return (
    <Paper
  elevation={0}
  sx={{
    width: "100%",
    maxWidth: 430,
    mx: "auto",
    p: { xs: 4, sm: 5 },
    borderRadius: "24px",
    border: "1px solid #f1f5f9",
    background: "#fff",
    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06)",
  }}
>
<Box sx={{ mb: 4 }}>
  <Typography
    variant="h4"
    align="center"
    fontWeight={800}
    gutterBottom
  >
    Create Account
  </Typography>

  <Typography
    align="center"
    color="text.secondary"
    sx={{ fontSize: 15 }}
  >
    Join us and start shopping today
  </Typography>
</Box>

<Collapse in={Boolean(successMessage)}>
  <Alert
    severity="success"
    sx={{
      mb: 3,
      borderRadius: "12px",
      fontWeight: 600,
    }}
  >
    {successMessage}
  </Alert>
</Collapse>

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

      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>

          {/* Email */}
          <TextField
            fullWidth
            sx={textFieldStyles}
            label="Email"
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
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          {!otpSent ? (
            <Button
    fullWidth
    variant="contained"
    sx={{...primaryButtonStyles,mt:3}}
    disabled={loading}
    startIcon={
        loading
            ? <CircularProgress size={18} color="inherit"/>
            : <SendRoundedIcon/>
    }
>
    {loading ? "Sending OTP..." : "Send OTP"}
</Button>
          ) : (
            <>
              {/* OTP */}
              <TextField
                fullWidth
                sx={{...textFieldStyles,mt:2}}
                label="Enter OTP"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Full Name */}
              <TextField
              sx={{...textFieldStyles,mt:2}}
                fullWidth
                label="Full Name"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName &&
                  Boolean(formik.errors.fullName)
                }
                helperText={
                  formik.touched.fullName &&
                  formik.errors.fullName
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Signup Button */}
             <Button
    fullWidth
    type="submit"
    variant="contained"
    disabled={signupLoading}
    sx={{...primaryButtonStyles,mt:2}}
    startIcon={
        signupLoading
            ? <CircularProgress size={18} color="inherit"/>
            : <PersonAddRoundedIcon/>
    }
>
    {signupLoading
        ? "Creating Account..."
        : "Create Account"}
</Button>

              {/* Change Email */}
              <Button
                variant="text"
                onClick={() => {
                  setOtpSent(false);
                  formik.setFieldValue("otp", "");
                  formik.setFieldValue("fullName", "");
                }}
              >
                Change Email
              </Button>
            </>
          )}
        </Box>
      </form>
    </Paper>
  );
}

export default RegisterForm;