import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  createDeal,
  fetchDeals,
  fetchHomePageData,
} from "../../../State/customer/CustomerSlice";
import { fetchHomeCategories } from "../../../State/admin/adminSlice";
import { toast } from "../../../common/toast";

function CreateDealForm({ handleClose, onSuccess }) {
  const dispatch = useAppDispatch();
  const homeCategoryState = useAppSelector(
    (store) => store.homeCategory || store.admin
  );
  const categories = homeCategoryState?.categories || [];
  const categoriesLoading = homeCategoryState?.loading || false;

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchHomeCategories());
    }
  }, [dispatch, categories.length]);

  const formik = useFormik({
    initialValues: {
      dealType: "CATEGORY",
      title: "",
      description: "",
      discountType: "PERCENTAGE",
      discountValue: 20,
      categoryId: "",
      productIds: "",
      sellerId: "",
      minOrderAmount: "",
      maxDiscountAmount: "",
      startAt: "",
      endAt: "",
      usageLimit: "",
    },
    validationSchema: Yup.object({
      dealType: Yup.string().required("Deal scope is required"),
      discountType: Yup.string().required(),
      discountValue: Yup.number()
        .required("Discount value is required")
        .positive("Must be greater than 0")
        .when("discountType", {
          is: "PERCENTAGE",
          then: (schema) =>
            schema.max(100, "Percentage discount cannot exceed 100%"),
          otherwise: (schema) => schema,
        }),
      categoryId: Yup.mixed().when("dealType", {
        is: "CATEGORY",
        then: (schema) => schema.required("Target category is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      productIds: Yup.string().when("dealType", {
        is: "PRODUCT",
        then: (schema) =>
          schema.required("At least one Product ID is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      sellerId: Yup.mixed().when("dealType", {
        is: "SELLER",
        then: (schema) =>
          schema.required("Seller ID is required for seller-store promotions"),
        otherwise: (schema) => schema.notRequired(),
      }),
      minOrderAmount: Yup.number().when("dealType", {
        is: "ORDER",
        then: (schema) =>
          schema
            .required("Minimum order amount is required")
            .positive("Must be greater than 0"),
        otherwise: (schema) => schema.notRequired(),
      }),
      endAt: Yup.string().test(
        "endAt-after-startAt",
        "End date must be after start date",
        function (val) {
          const { startAt } = this.parent;
          if (!val || !startAt) return true;
          return new Date(val) > new Date(startAt);
        }
      ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setErrorMessage("");
      setSuccessMessage("");
      try {
        const payload = {
          title: values.title?.trim() || undefined,
          description: values.description?.trim() || undefined,
          dealType: values.dealType,
          discountType: values.discountType,
          discountValue: Number(values.discountValue),
          discount:
            values.discountType === "PERCENTAGE"
              ? Math.round(Number(values.discountValue))
              : undefined,
          startAt: values.startAt ? values.startAt : undefined,
          endAt: values.endAt ? values.endAt : undefined,
          usageLimit: values.usageLimit ? Number(values.usageLimit) : undefined,
        };

        if (values.dealType === "CATEGORY") {
          payload.categoryId = Number(values.categoryId);
          const selectedCat = categories.find(
            (c) => c.id === Number(values.categoryId)
          );
          if (selectedCat) {
            payload.categorySlug = selectedCat.categoryId;
            if (!payload.title) {
              payload.title = `${selectedCat.name || selectedCat.categoryId} Flash Promotion`;
            }
          }
        } else if (values.dealType === "ORDER") {
          payload.minOrderAmount = Number(values.minOrderAmount);
          if (values.maxDiscountAmount) {
            payload.maxDiscountAmount = Number(values.maxDiscountAmount);
          }
          if (!payload.title) {
            payload.title = `Orders Over ₹${values.minOrderAmount} Special`;
          }
        } else if (values.dealType === "PRODUCT") {
          const ids = values.productIds
            ? values.productIds
                .split(",")
                .map((s) => Number(s.trim()))
                .filter((n) => !isNaN(n) && n > 0)
            : [];
          payload.productIds = ids;
          if (!payload.title) {
            payload.title = "Special Product Promotion";
          }
        } else if (values.dealType === "SELLER") {
          payload.sellerId = Number(values.sellerId);
          if (!payload.title) {
            payload.title = `Seller Store #${values.sellerId} Promotion`;
          }
        }

        if (values.maxDiscountAmount && values.dealType !== "ORDER") {
          payload.maxDiscountAmount = Number(values.maxDiscountAmount);
        }

        await dispatch(createDeal(payload)).unwrap();
        toast.success("Promotional deal created successfully!");
        setSuccessMessage("Promotional deal created successfully!");
        dispatch(fetchDeals());
        dispatch(fetchHomePageData());

        setTimeout(() => {
          if (onSuccess) onSuccess();
          if (handleClose) handleClose();
        }, 700);
      } catch (err) {
        console.error("Failed to create deal:", err);
        const msg =
          typeof err === "string"
            ? err
            : err?.message ||
              "Failed to create deal. Please verify parameters.";
        setErrorMessage(msg);
        toast.error(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      className="p-6 space-y-4 text-slate-900 dark:text-slate-100"
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Create Promotional Deal
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure marketplace promotions across Categories, Order Thresholds, Products, or Sellers
        </p>
      </div>

      {errorMessage && (
        <Alert severity="error" className="rounded-xl text-xs">
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" className="rounded-xl text-xs">
          {successMessage}
        </Alert>
      )}

      {/* Scope & Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormControl fullWidth size="small">
          <InputLabel id="admin-deal-type-label">Deal Scope</InputLabel>
          <Select
            labelId="admin-deal-type-label"
            name="dealType"
            value={formik.values.dealType}
            label="Deal Scope"
            onChange={formik.handleChange}
          >
            <MenuItem value="CATEGORY">Category Showcase</MenuItem>
            <MenuItem value="ORDER">Order Subtotal Threshold</MenuItem>
            <MenuItem value="PRODUCT">Specific Products</MenuItem>
            <MenuItem value="SELLER">Entire Seller Store</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="admin-discount-type-label">Discount Type</InputLabel>
          <Select
            labelId="admin-discount-type-label"
            name="discountType"
            value={formik.values.discountType}
            label="Discount Type"
            onChange={formik.handleChange}
          >
            <MenuItem value="PERCENTAGE">Percentage (% Off)</MenuItem>
            <MenuItem value="FIXED_AMOUNT">Fixed Amount (₹ Flat Off)</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Title & Discount Value */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField
          fullWidth
          size="small"
          name="discountValue"
          label={
            formik.values.discountType === "PERCENTAGE"
              ? "Discount Percentage (%)"
              : "Discount Amount (₹)"
          }
          type="number"
          value={formik.values.discountValue}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.discountValue && Boolean(formik.errors.discountValue)
          }
          helperText={
            formik.touched.discountValue && formik.errors.discountValue
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {formik.values.discountType === "PERCENTAGE" ? "%" : "₹"}
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          size="small"
          name="maxDiscountAmount"
          label="Max Discount Cap (₹ Optional)"
          type="number"
          placeholder="e.g. 500"
          value={formik.values.maxDiscountAmount}
          onChange={formik.handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
          helperText="Cap max discount for percentage promotions"
        />
      </div>

      <TextField
        fullWidth
        size="small"
        name="title"
        label="Promotion Title (Optional)"
        placeholder="e.g. Mega Summer Flash Sale"
        value={formik.values.title}
        onChange={formik.handleChange}
      />

      <TextField
        fullWidth
        size="small"
        name="description"
        label="Description (Optional)"
        placeholder="Short description or terms for this promotion"
        value={formik.values.description}
        onChange={formik.handleChange}
      />

      {/* Scope-specific fields */}
      {formik.values.dealType === "CATEGORY" && (
        <FormControl
          fullWidth
          size="small"
          error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
        >
          <InputLabel id="deal-cat-label">Target Category</InputLabel>
          <Select
            labelId="deal-cat-label"
            name="categoryId"
            value={formik.values.categoryId}
            label="Target Category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={categoriesLoading}
          >
            {categoriesLoading ? (
              <MenuItem disabled value="">
                <div className="flex items-center gap-2 py-2">
                  <CircularProgress size={16} />
                  <span>Loading categories...</span>
                </div>
              </MenuItem>
            ) : categories.length === 0 ? (
              <MenuItem disabled value="">
                No categories available. Please seed categories first.
              </MenuItem>
            ) : (
              categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  <div className="flex items-center gap-2.5 py-0.5">
                    {cat.image && (
                      <img
                        src={cat.image}
                        alt={cat.name || cat.categoryId}
                        className="w-6 h-6 rounded-md object-cover border border-slate-200 dark:border-slate-700"
                      />
                    )}
                    <span className="font-medium text-sm">
                      {cat.name || cat.categoryId}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      ({cat.section || "CAT"})
                    </span>
                  </div>
                </MenuItem>
              ))
            )}
          </Select>
          {formik.touched.categoryId && formik.errors.categoryId && (
            <p className="text-red-500 text-xs mt-1 ml-3">
              {formik.errors.categoryId}
            </p>
          )}
        </FormControl>
      )}

      {formik.values.dealType === "ORDER" && (
        <TextField
          fullWidth
          size="small"
          name="minOrderAmount"
          label="Min Order Subtotal Required (₹)"
          type="number"
          value={formik.values.minOrderAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.minOrderAmount &&
            Boolean(formik.errors.minOrderAmount)
          }
          helperText={
            formik.touched.minOrderAmount && formik.errors.minOrderAmount
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
      )}

      {formik.values.dealType === "PRODUCT" && (
        <TextField
          fullWidth
          size="small"
          name="productIds"
          label="Product IDs (comma separated)"
          placeholder="e.g. 1, 2, 5"
          value={formik.values.productIds}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.productIds && Boolean(formik.errors.productIds)
          }
          helperText={
            (formik.touched.productIds && formik.errors.productIds) ||
            "Enter the numeric IDs of products to discount"
          }
        />
      )}

      {formik.values.dealType === "SELLER" && (
        <TextField
          fullWidth
          size="small"
          name="sellerId"
          label="Target Seller ID"
          type="number"
          placeholder="e.g. 1"
          value={formik.values.sellerId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.sellerId && Boolean(formik.errors.sellerId)}
          helperText={
            (formik.touched.sellerId && formik.errors.sellerId) ||
            "All products from this seller will receive the promotional discount"
          }
        />
      )}

      {/* Scheduling & Limits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TextField
          fullWidth
          size="small"
          name="startAt"
          label="Start Date & Time (Optional)"
          type="datetime-local"
          value={formik.values.startAt}
          onChange={formik.handleChange}
          InputLabelProps={{ shrink: true }}
          helperText="Leave empty to activate immediately"
        />

        <TextField
          fullWidth
          size="small"
          name="endAt"
          label="End Date & Time (Optional)"
          type="datetime-local"
          value={formik.values.endAt}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.endAt && Boolean(formik.errors.endAt)}
          helperText={
            (formik.touched.endAt && formik.errors.endAt) ||
            "Leave empty for default 30-day run"
          }
          InputLabelProps={{ shrink: true }}
        />
      </div>

      <TextField
        fullWidth
        size="small"
        name="usageLimit"
        label="Usage Limit (Optional)"
        type="number"
        placeholder="e.g. 100"
        value={formik.values.usageLimit}
        onChange={formik.handleChange}
        helperText="Maximum number of times this deal can be redeemed across orders"
      />

      <div className="flex justify-end gap-2 pt-2">
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
          disabled={formik.isSubmitting || categoriesLoading}
          sx={{
            borderRadius: "10px",
            fontWeight: 700,
            textTransform: "none",
            px: 3,
            bgcolor: "#4f46e5",
            "&:hover": { bgcolor: "#4338ca" },
          }}
        >
          {formik.isSubmitting ? "Creating Deal..." : "Create Deal"}
        </Button>
      </div>
    </Box>
  );
}

export default CreateDealForm;