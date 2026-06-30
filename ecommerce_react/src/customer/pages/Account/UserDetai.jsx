import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../../State/AuthSlice";

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

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter a valid mobile number")
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
    <div className="max-w-5xl mx-auto">
      {/* Success Snackbar */}
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

      {/* Error Snackbar */}
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled">
          Failed to update profile.
        </Alert>
      </Snackbar>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your personal information and account preferences.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-teal-600 to-cyan-500" />

        <div className="px-8 pb-8">
          {/* Avatar */}
          <div className="-mt-14 flex flex-col md:flex-row md:items-end gap-5">
            <Avatar
              sx={{
                width: 110,
                height: 110,
                fontSize: 40,
                border: "4px solid white",
                bgcolor: "#14b8a6",
                fontWeight: "bold",
              }}
            >
              {formik.values.fullName.charAt(0).toUpperCase() || "U"}
            </Avatar>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {formik.values.fullName}
              </h2>

              <p className="text-gray-500">
                {formik.values.email}
              </p>
            </div>

            {!isEditing ? (
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  bgcolor: "#0f766e",
                }}
                onClick={() => setIsEditing(true)}
              >
                Update Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  onClick={() => {
                    formik.resetForm();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    bgcolor: "#0f766e",
                  }}
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 gap-5 mt-10">
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
              onChange={isEditing ? formik.handleChange : undefined}
              onBlur={formik.handleBlur}
              disabled={!isEditing}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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
    </div>
  );
}

export default UserDetai;