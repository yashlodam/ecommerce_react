import React, { useState } from "react";
import { Avatar, Button, TextField, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserProfile, updateUserProfile } from "../../../State/AuthSlice";

function UserDetai() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
        .required("Mobile number is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(
          updateUserProfile({
            userData: values,
            jwt: localStorage.getItem("jwt"),
          })
        ).unwrap();

        await dispatch(fetchUserProfile(localStorage.getItem("jwt")));
        setOpenSuccess(true);
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        setOpenError(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-4xl">
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Profile updated successfully.
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          Failed to update profile. Please try again.
        </Alert>
      </Snackbar>

      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Personal Information
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your personal details, email address, and verified phone number.
        </p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <Avatar
              sx={{
                width: 72,
                height: 72,
                fontSize: 26,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontWeight: "bold",
                border: "3px solid rgba(255,255,255,0.2)",
              }}
            >
              {formik.values.fullName?.charAt(0).toUpperCase() || "U"}
            </Avatar>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {formik.values.fullName || "User"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formik.values.email}
              </p>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
                Customer Account
              </span>
            </div>
          </div>

          <div>
            {!isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
                sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700 }}
              >
                Edit Details
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  onClick={() => {
                    formik.resetForm();
                    setIsEditing(false);
                  }}
                  sx={{ textTransform: "none", borderRadius: "10px" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting}
                  sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700 }}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
          <TextField
            fullWidth
            name="fullName"
            label="Full Name"
            value={formik.values.fullName}
            onChange={isEditing ? formik.handleChange : undefined}
            onBlur={formik.handleBlur}
            disabled={!isEditing}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          <TextField
            fullWidth
            name="email"
            label="Email Address"
            value={formik.values.email}
            disabled
            helperText="Email address is linked to your authentication login"
          />

          <TextField
            fullWidth
            name="mobile"
            label="Phone Number"
            value={formik.values.mobile}
            onChange={isEditing ? formik.handleChange : undefined}
            onBlur={formik.handleBlur}
            disabled={!isEditing}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
        </div>
      </div>
    </div>
  );
}

export default UserDetai;