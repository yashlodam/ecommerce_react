import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../State/Store";
import { createDeal, fetchDeals } from "../../../State/customer/CustomerSlice";

function CreateDealForm({ handleClose, onSuccess }) {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      discount: 20,
      category: "electronics",
    },
    validationSchema: Yup.object({
      discount: Yup.number()
        .required("Discount is required")
        .min(1, "Minimum 1%")
        .max(90, "Maximum 90%"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(
          createDeal({
            discount: Number(values.discount),
            category: { categoryId: values.category },
          })
        ).unwrap();
        dispatch(fetchDeals());
        if (onSuccess) onSuccess();
        if (handleClose) handleClose();
      } catch (err) {
        console.error("Failed to create deal:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      className="p-6 space-y-4"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Create Category Deal
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Feature promotional discount banners across home page categories.
        </p>
      </div>

      <TextField
        fullWidth
        name="discount"
        label="Discount Percentage (%)"
        type="number"
        value={formik.values.discount}
        onChange={formik.handleChange}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />

      <FormControl fullWidth>
        <InputLabel id="deal-cat-label">Target Category</InputLabel>
        <Select
          labelId="deal-cat-label"
          name="category"
          value={formik.values.category}
          label="Target Category"
          onChange={formik.handleChange}
        >
          <MenuItem value="electronics">Electronics & Gadgets</MenuItem>
          <MenuItem value="men_fashion">Men's Fashion & Wear</MenuItem>
          <MenuItem value="women_fashion">Women's Clothing</MenuItem>
          <MenuItem value="home_furniture">Home & Living</MenuItem>
          <MenuItem value="beauty">Beauty & Personal Care</MenuItem>
        </Select>
      </FormControl>

      <div className="flex justify-end gap-2 pt-3">
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
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
          sx={{
            borderRadius: "10px",
            fontWeight: 700,
            textTransform: "none",
            px: 3,
          }}
        >
          {formik.isSubmitting ? "Saving..." : "Create Deal"}
        </Button>
      </div>
    </Box>
  );
}

export default CreateDealForm;