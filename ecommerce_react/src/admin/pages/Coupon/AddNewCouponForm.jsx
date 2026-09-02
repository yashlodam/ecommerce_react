import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../State/Store";
import { createCoupon } from "../../../State/customer/CouponSlice";

function AddNewCouponForm({ handleClose, onSuccess }) {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      code: "",
      discountPercentage: 10,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 500,
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required("Coupon code is required")
        .min(3, "Must be at least 3 characters")
        .uppercase(),
      discountPercentage: Yup.number()
        .required("Discount percentage is required")
        .min(1, "Minimum 1%")
        .max(90, "Maximum 90%"),
      minimumOrderValue: Yup.number()
        .required("Minimum order value is required")
        .min(0, "Cannot be negative"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formattedValues = {
        ...values,
        code: values.code.toUpperCase(),
        discountPercentage: Number(values.discountPercentage),
        minimumOrderValue: Number(values.minimumOrderValue),
        validityStartDate: values.validityStartDate
          ? values.validityStartDate.toISOString()
          : new Date().toISOString(),
        validityEndDate: values.validityEndDate
          ? values.validityEndDate.toISOString()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      try {
        await dispatch(createCoupon(formattedValues)).unwrap();
        if (onSuccess) onSuccess();
        if (handleClose) handleClose();
      } catch (error) {
        console.error("Failed to create coupon:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
        Create Promotional Coupon
      </h2>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
        Generate discount vouchers for customer checkouts across the marketplace.
      </p>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="code"
                label="Coupon Code (e.g. SAVE20)"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="discountPercentage"
                label="Discount Percentage (%)"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.discountPercentage &&
                  Boolean(formik.errors.discountPercentage)
                }
                helperText={
                  formik.touched.discountPercentage &&
                  formik.errors.discountPercentage
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity Start Date"
                value={formik.values.validityStartDate}
                onChange={(newValue) =>
                  formik.setFieldValue("validityStartDate", newValue)
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity End Date"
                value={formik.values.validityEndDate}
                onChange={(newValue) =>
                  formik.setFieldValue("validityEndDate", newValue)
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="minimumOrderValue"
                label="Minimum Qualifying Order Value (₹)"
                value={formik.values.minimumOrderValue}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.minimumOrderValue &&
                  Boolean(formik.errors.minimumOrderValue)
                }
                helperText={
                  formik.touched.minimumOrderValue &&
                  formik.errors.minimumOrderValue
                }
              />
            </Grid>

            <Grid item xs={12} className="flex justify-end gap-2 pt-2">
              {handleClose && (
                <Button
                  onClick={handleClose}
                  color="inherit"
                  sx={{ borderRadius: "10px", textTransform: "none" }}
                >
                  Cancel
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={formik.isSubmitting}
                sx={{
                  borderRadius: "10px",
                  fontWeight: 700,
                  textTransform: "none",
                  px: 3,
                }}
              >
                {formik.isSubmitting ? "Creating..." : "Create Coupon"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </LocalizationProvider>
    </div>
  );
}

export default AddNewCouponForm;