import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { mainCategory } from "../../../data/category/mainCategory";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womensLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLevelTwo";
import { homeFurnitureLevelTwo } from "../../../data/category/level two/homeFurnitureLevelTwo";
import { beautyLevelTwo } from "../../../data/category/level two/beautyLevelTwo";
import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { homeFurnitureLevelThree } from "../../../data/category/level three/homeFurnitureLevelThree";
import { beautyLevelThree } from "../../../data/category/level three/beautyLevelThree";

import {
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Box,
  Divider,
  Tooltip,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadToCloudinary } from "../../../Util/uploadToCloudinary";
import { useAppDispatch } from "../../../State/Store";
import { createProduct } from "../../../State/seller/sellerProductSlice";

// ─── Category lookup tables ───────────────────────────────────────────────────

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: homeFurnitureLevelTwo,
  beauty: beautyLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: homeFurnitureLevelThree,
  beauty: beautyLevelThree,
};

// ─── Quick-fill variant suggestions per category ──────────────────────────────
const variantSuggestions = {
  men:            ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
  women:          ["XS", "S", "M", "L", "XL", "XXL"],
  electronics:    ["32GB", "64GB", "128GB", "256GB", "512GB", "1TB", "4GB RAM", "8GB RAM", "16GB RAM"],
  home_furniture: ["Single", "Double", "Queen", "King", "Small", "Medium", "Large"],
  beauty:         ["30ml", "50ml", "100ml", "150ml", "200ml", "250ml", "500ml"],
};

// ─── Color options ────────────────────────────────────────────────────────────
const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#808080" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Red", hex: "#FF0000" },
  { name: "Maroon", hex: "#800000" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Hot Pink", hex: "#FF69B4" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Sky Blue", hex: "#87CEEB" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Green", hex: "#008000" },
  { name: "Light Green", hex: "#90EE90" },
  { name: "Olive", hex: "#808000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Mustard", hex: "#FFDB58" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Purple", hex: "#800080" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Rose Gold", hex: "#B76E79" },
  { name: "Teal", hex: "#008080" },
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Indigo", hex: "#4B0082" },
  { name: "Multicolor", hex: "linear-gradient(90deg,red,orange,yellow,green,blue,violet)" },
];

// ─── Empty variant row ────────────────────────────────────────────────────────
const emptyVariantRow = () => ({
  variantName: "",
  sku: "",
  mrpPrice: "",
  sellingPrice: "",
  quantity: "",
  isDefault: false,
});

// ─── Validation schema ────────────────────────────────────────────────────────
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  mrpPrice: Yup.number().positive("Must be positive").required("MRP Price is required"),
  sellingPrice: Yup.number()
    .positive("Must be positive")
    .required("Selling Price is required")
    .max(Yup.ref("mrpPrice"), "Selling price must be ≤ MRP price"),
  category: Yup.string().required("Category is required"),
  images: Yup.array().min(1, "At least one image is required"),
});

// ─── Component ────────────────────────────────────────────────────────────────

function AddProduct() {
  const dispatch = useAppDispatch();
  const [uploadingImage, setUploadingImage] = useState(false);

  // Variant builder state
  const [variants, setVariants] = useState([]);
  const [editingVariantIndex, setEditingVariantIndex] = useState(null);
  const [variantDraft, setVariantDraft] = useState(null);
  const [addingVariant, setAddingVariant] = useState(false);
  const [newVariantRow, setNewVariantRow] = useState(emptyVariantRow());

  // Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", severity: "success" });
  const showSnackbar = (msg, severity = "success") =>
    setSnackbar({ open: true, msg, severity });

  // ── Image upload ────────────────────────────────────────────────────────────
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      if (url) {
        formik.setFieldValue("images", [...formik.values.images, url]);
      }
    } catch (err) {
      showSnackbar("Image upload failed.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updated = [...formik.values.images];
    updated.splice(index, 1);
    formik.setFieldValue("images", updated);
  };

  // ── Variant builder helpers ─────────────────────────────────────────────────

  const suggestions = variantSuggestions[formik?.values?.category] || [];

  const addVariantFromSuggestion = (name) => {
    if (variants.some((v) => v.variantName === name)) return;
    setVariants((prev) => [
      ...prev,
      {
        variantName: name,
        sku: "",
        mrpPrice: "",
        sellingPrice: "",
        quantity: "",
        isDefault: false,
      },
    ]);
  };

  const startEditVariant = (index) => {
    setEditingVariantIndex(index);
    setVariantDraft({ ...variants[index] });
  };

  const saveEditVariant = () => {
    const updated = [...variants];
    updated[editingVariantIndex] = variantDraft;
    setVariants(updated);
    setEditingVariantIndex(null);
    setVariantDraft(null);
  };

  const cancelEditVariant = () => {
    setEditingVariantIndex(null);
    setVariantDraft(null);
  };

  const deleteVariantRow = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const confirmNewVariant = () => {
    if (!newVariantRow.variantName.trim()) {
      showSnackbar("Variant name is required.", "error");
      return;
    }
    if (variants.some((v) => v.variantName === newVariantRow.variantName)) {
      showSnackbar(`Variant "${newVariantRow.variantName}" already exists.`, "error");
      return;
    }
    setVariants((prev) => [...prev, { ...newVariantRow }]);
    setNewVariantRow(emptyVariantRow());
    setAddingVariant(false);
  };

  // ── Formik ──────────────────────────────────────────────────────────────────
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      color: "",
      brand: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Build variants payload.
      // If no variants defined, submit with empty list → backend creates one default variant.
      const variantsPayload = variants.map((v) => ({
        variantName: v.variantName,
        sku: v.sku || undefined,
        mrpPrice: v.mrpPrice ? Number(v.mrpPrice) : Number(values.mrpPrice),
        sellingPrice: v.sellingPrice ? Number(v.sellingPrice) : Number(values.sellingPrice),
        quantity: v.quantity ? Number(v.quantity) : 0,
        isDefault: false,
      }));

      const productPayload = {
        ...values,
        mrpPrice: Number(values.mrpPrice),
        sellingPrice: Number(values.sellingPrice),
        quantity: variants.reduce((sum, v) => sum + (Number(v.quantity) || 0), 0) || 0,
        variants: variantsPayload,
      };

      const result = await dispatch(createProduct(productPayload));

      if (createProduct.fulfilled.match(result)) {
        showSnackbar("Product added successfully!", "success");
        formik.resetForm();
        setVariants([]);
      } else {
        showSnackbar(result.payload || "Failed to add product.", "error");
      }
    },
  });

  const suggestions2 = variantSuggestions[formik.values.category] || [];

  return (
    <div className="pb-10">
      <form onSubmit={formik.handleSubmit} className="space-y-6 p-4">
        <Grid container spacing={2}>

          {/* ── Images ───────────────────────────────────────────────── */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" className="font-bold text-slate-700 dark:text-slate-300 mb-2">
              Product Images *
            </Typography>
            <div className="flex flex-wrap gap-3">
              <label htmlFor="fileInput" className="relative cursor-pointer">
                <div className="w-24 h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors bg-white dark:bg-slate-900">
                  {uploadingImage ? (
                    <CircularProgress size={22} />
                  ) : (
                    <>
                      <AddPhotoAlternateIcon fontSize="small" />
                      <span className="text-[10px] font-semibold">Add Photo</span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>

              {formik.values.images.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={image}
                    alt={`product-${index}`}
                    className="w-full h-full rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: "white",
                      border: "1px solid #fca5a5",
                      width: 22,
                      height: 22,
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                </div>
              ))}
            </div>
            {formik.touched.images && formik.errors.images && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.images}</p>
            )}
          </Grid>

          {/* ── Title ────────────────────────────────────────────────── */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Product Title *"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>

          {/* ── Description ──────────────────────────────────────────── */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="description"
              name="description"
              label="Product Description *"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>

          {/* ── Category ─────────────────────────────────────────────── */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)} required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formik.values.category}
                label="Category"
                onChange={(e) => {
                  formik.setFieldValue("category", e.target.value);
                  formik.setFieldValue("category2", "");
                  formik.setFieldValue("category3", "");
                }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {mainCategory.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
                ))}
              </Select>
              {formik.touched.category && formik.errors.category && (
                <FormHelperText>{formik.errors.category}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sub-Category</InputLabel>
              <Select
                name="category2"
                value={formik.values.category2}
                label="Sub-Category"
                onChange={(e) => {
                  formik.setFieldValue("category2", e.target.value);
                  formik.setFieldValue("category3", "");
                }}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {(categoryTwo[formik.values.category] || []).map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sub-Sub-Category</InputLabel>
              <Select
                name="category3"
                value={formik.values.category3}
                label="Sub-Sub-Category"
                onChange={formik.handleChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {(categoryThree[formik.values.category] || [])
                  .filter((item) => item.parentCategoryId === formik.values.category2)
                  .map((item) => (
                    <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ── Base Price (used as fallback for variants without own price) ─ */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              name="mrpPrice"
              label="Base MRP Price (₹) *"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)}
              helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="number"
              name="sellingPrice"
              label="Base Selling Price (₹) *"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
              helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              name="brand"
              label="Brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* ── Color ────────────────────────────────────────────────── */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select name="color" value={formik.values.color} label="Color" onChange={formik.handleChange}>
                <MenuItem value=""><em>None</em></MenuItem>
                {colors.map((c, i) => (
                  <MenuItem key={i} value={c.name}>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-4 w-4 rounded-full border ${c.name === "White" ? "border-gray-300" : ""}`}
                        style={{ background: c.hex }}
                      />
                      {c.name}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ── VARIANT BUILDER ──────────────────────────────────────── */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <div className="flex items-center justify-between mb-3">
              <div>
                <Typography variant="subtitle1" className="font-bold text-slate-800 dark:text-slate-200">
                  Product Variants
                </Typography>
                <Typography variant="caption" className="text-slate-500 dark:text-slate-400">
                  Add sizes, storage options, etc. Each variant can have its own price &amp; stock. Leave empty to auto-create one &quot;Standard&quot; variant.
                </Typography>
              </div>
              <Button
                startIcon={<AddIcon />}
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setAddingVariant(true)}
                sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, whiteSpace: "nowrap" }}
              >
                Add Variant
              </Button>
            </div>

            {/* Quick-fill suggestions */}
            {formik.values.category && suggestions2.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 self-center">Quick add:</span>
                {suggestions2.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    size="small"
                    variant={variants.some((v) => v.variantName === s) ? "filled" : "outlined"}
                    color={variants.some((v) => v.variantName === s) ? "primary" : "default"}
                    onClick={() => addVariantFromSuggestion(s)}
                    sx={{ cursor: "pointer", fontSize: "11px" }}
                  />
                ))}
              </div>
            )}

            {/* Variant rows */}
            {variants.length > 0 && (
              <div className="space-y-2 mb-3">
                {variants.map((v, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3"
                  >
                    {editingVariantIndex === index ? (
                      /* Edit row */
                      <Grid container spacing={1.5} alignItems="center">
                        <Grid item xs={12} sm={2}>
                          <TextField
                            fullWidth size="small" label="Name"
                            value={variantDraft.variantName}
                            onChange={(e) => setVariantDraft({ ...variantDraft, variantName: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <TextField
                            fullWidth size="small" label="MRP (₹)" type="number"
                            value={variantDraft.mrpPrice}
                            onChange={(e) => setVariantDraft({ ...variantDraft, mrpPrice: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <TextField
                            fullWidth size="small" label="Selling (₹)" type="number"
                            value={variantDraft.sellingPrice}
                            onChange={(e) => setVariantDraft({ ...variantDraft, sellingPrice: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <TextField
                            fullWidth size="small" label="Stock" type="number"
                            value={variantDraft.quantity}
                            onChange={(e) => setVariantDraft({ ...variantDraft, quantity: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={6} sm={2}>
                          <TextField
                            fullWidth size="small" label="SKU (optional)"
                            value={variantDraft.sku}
                            onChange={(e) => setVariantDraft({ ...variantDraft, sku: e.target.value })}
                          />
                        </Grid>
                        <Grid item xs={12} sm={2} className="flex gap-1">
                          <Tooltip title="Save">
                            <IconButton size="small" color="success" onClick={saveEditVariant}><CheckIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <IconButton size="small" color="inherit" onClick={cancelEditVariant}><CloseIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    ) : (
                      /* Display row */
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-bold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-0.5 rounded-lg">
                            {v.variantName}
                          </span>
                          {v.mrpPrice && (
                            <span className="text-xs text-slate-500 line-through">₹{v.mrpPrice}</span>
                          )}
                          {v.sellingPrice && (
                            <span className="text-xs font-bold text-teal-700 dark:text-teal-400">₹{v.sellingPrice}</span>
                          )}
                          {v.quantity !== "" && (
                            <Chip
                              label={`${v.quantity} in stock`}
                              size="small"
                              color={Number(v.quantity) > 0 ? "success" : "error"}
                              variant="outlined"
                              sx={{ fontSize: "11px" }}
                            />
                          )}
                          {v.sku && <span className="text-xs text-slate-400">SKU: {v.sku}</span>}
                        </div>
                        <div className="flex gap-1">
                          <IconButton size="small" color="primary" onClick={() => startEditVariant(index)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => deleteVariantRow(index)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add new variant inline form */}
            {addingVariant && (
              <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-xl px-4 py-3 mb-3">
                <Typography variant="caption" className="text-teal-700 dark:text-teal-400 font-bold mb-2 block">
                  New Variant
                </Typography>
                <Grid container spacing={1.5} alignItems="center">
                  <Grid item xs={12} sm={2}>
                    <TextField
                      fullWidth size="small" label="Name *"
                      placeholder="e.g. M, 128GB"
                      value={newVariantRow.variantName}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, variantName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField
                      fullWidth size="small" label="MRP (₹)" type="number"
                      placeholder={formik.values.mrpPrice || ""}
                      value={newVariantRow.mrpPrice}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, mrpPrice: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField
                      fullWidth size="small" label="Selling (₹)" type="number"
                      placeholder={formik.values.sellingPrice || ""}
                      value={newVariantRow.sellingPrice}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, sellingPrice: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField
                      fullWidth size="small" label="Stock *" type="number"
                      value={newVariantRow.quantity}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, quantity: e.target.value })}
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField
                      fullWidth size="small" label="SKU (optional)"
                      value={newVariantRow.sku}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, sku: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} className="flex gap-2">
                    <Button size="small" variant="contained" color="primary" onClick={confirmNewVariant}
                      sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 700, fontSize: "12px" }}>
                      Add
                    </Button>
                    <Button size="small" variant="outlined" color="inherit" onClick={() => { setAddingVariant(false); setNewVariantRow(emptyVariantRow()); }}
                      sx={{ borderRadius: "8px", textTransform: "none", fontSize: "12px" }}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}

            {variants.length === 0 && !addingVariant && (
              <div className="text-center py-5 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
                No variants added yet. Click &quot;Add Variant&quot; or use the quick-add chips above.<br />
                <span className="text-teal-600 dark:text-teal-400">If left empty, a &quot;Standard&quot; variant will be auto-created using the base price &amp; a shared quantity.</span>
              </div>
            )}

            {variants.length > 0 && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Total stock across all variants:{" "}
                <strong className="text-slate-700 dark:text-slate-300">
                  {variants.reduce((sum, v) => sum + (Number(v.quantity) || 0), 0)} units
                </strong>
              </div>
            )}

            <Divider sx={{ mt: 2 }} />
          </Grid>

          {/* ── Submit ────────────────────────────────────────────────── */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={formik.isSubmitting}
              sx={{ py: 1.5, borderRadius: "14px", fontWeight: 700, fontSize: "15px", textTransform: "none" }}
            >
              {formik.isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Add Product"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddProduct;