import React, { useState } from "react";
import { Avatar, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserProfile, updateUserProfile, deleteCustomerAccount } from "../../../State/AuthSlice";
import { toast } from "../../../common/toast";
import ConfirmDialog from "../../../common/dialog/ConfirmDialog";

function UserDetai() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

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
            fullName: values.fullName,
            mobile: values.mobile,
          })
        ).unwrap();

        await dispatch(fetchUserProfile());
        toast.success("Profile updated successfully.");
        setIsEditing(false);
      } catch (error) {
        console.error(error);
        toast.error(error || "Failed to update profile. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      await dispatch(deleteCustomerAccount()).unwrap();
      toast.success("Your account has been deleted successfully.");
      setConfirmDeleteOpen(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error || "Failed to delete account. Please try again.");
    } finally {
      setDeletingAccount(false);
    }
  };

  return (
    <div className="max-w-4xl">

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

      {/* Danger Zone: Account Deletion */}
      <div className="mt-8 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-rose-900 dark:text-rose-200">
              Delete Customer Account
            </h3>
            <p className="text-xs sm:text-sm text-rose-700/80 dark:text-rose-400 mt-1 max-w-xl">
              Permanently delete your ShopSphere customer account and remove all personal details, saved delivery addresses, and active shopping cart. This action cannot be reversed.
            </p>
          </div>

          <Button
            variant="outlined"
            color="error"
            disabled={deletingAccount}
            onClick={() => setConfirmDeleteOpen(true)}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              fontWeight: 700,
              px: 3,
              py: 1,
              whiteSpace: "nowrap",
            }}
          >
            {deletingAccount ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDeleteOpen}
        title="Delete Customer Account"
        message="Are you sure you want to permanently delete your ShopSphere account? All your saved addresses, cart items, and wishlist will be permanently cleared. You will not be able to log back into this account."
        confirmText="Yes, Delete My Account"
        confirmSeverity="danger"
        onConfirm={handleDeleteAccount}
        onCancel={() => setConfirmDeleteOpen(false)}
      />
    </div>
  );
}

export default UserDetai;