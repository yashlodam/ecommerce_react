import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerProduct,
  updateSellerProduct,
  fetchProductVariants,
  createVariant,
  updateVariant,
  deleteVariant,
  clearVariants,
} from "../../../State/seller/sellerProductSlice";
import { uploadToCloudinary } from "../../../Util/uploadToCloudinary";

const emptyVariantRow = () => ({
  variantName: "",
  sku: "",
  mrpPrice: "",
  sellingPrice: "",
  quantity: "",
});

export default function EditProduct() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, variants, variantLoading } = useAppSelector(
    (store) => store.sellerProduct
  );

  const product = products.find((p) => p.id === Number(productId));

  const [form, setForm] = useState({
    title: "",
    description: "",
    mrpPrice: "",
    sellingPrice: "",
    color: "",
    brand: "",
  });
  const [images, setImages] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Variant editing state
  const [editingVariantId, setEditingVariantId] = useState(null);
  const [variantDraft, setVariantDraft] = useState(null);
  const [addingVariant, setAddingVariant] = useState(false);
  const [newVariantRow, setNewVariantRow] = useState(emptyVariantRow());

  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "", severity: "success" });
  const showSnackbar = (msg, severity = "success") =>
    setSnackbar({ open: true, msg, severity });

  // Load on mount
  useEffect(() => {
    dispatch(fetchSellerProduct());
    dispatch(clearVariants());
    dispatch(fetchProductVariants(Number(productId)));
  }, [dispatch, productId]);

  // Pre-populate form when product loads
  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        mrpPrice: product.mrpPrice || "",
        sellingPrice: product.sellingPrice || "",
        color: product.color || "",
        brand: product.brand || "",
      });
      // PRESERVE existing images
      setImages(product.images || []);
    }
  }, [product]);

  // ── Image handlers ──────────────────────────────────────────────────────────
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      if (url) setImages((prev) => [...prev, url]);
    } catch {
      showSnackbar("Image upload failed.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Save product base details ────────────────────────────────────────────────
  const handleSaveProduct = async () => {
    setSaving(true);
    const result = await dispatch(
      updateSellerProduct({
        productId: Number(productId),
        product: {
          ...product,
          ...form,
          mrpPrice: Number(form.mrpPrice),
          sellingPrice: Number(form.sellingPrice),
          images,
        },
      })
    );
    setSaving(false);
    if (updateSellerProduct.fulfilled.match(result)) {
      showSnackbar("Product updated successfully!");
    } else {
      showSnackbar(result.payload || "Update failed.", "error");
    }
  };

  // ── Variant handlers ─────────────────────────────────────────────────────────
  const handleStartEditVariant = (v) => {
    setEditingVariantId(v.id);
    setVariantDraft({
      variantName: v.variantName,
      sku: v.sku || "",
      mrpPrice: v.mrpPrice || "",
      sellingPrice: v.sellingPrice || "",
      quantity: v.quantity ?? "",
    });
  };

  const handleSaveEditVariant = async () => {
    const result = await dispatch(
      updateVariant({
        variantId: editingVariantId,
        variant: {
          variantName: variantDraft.variantName,
          sku: variantDraft.sku || undefined,
          mrpPrice: Number(variantDraft.mrpPrice),
          sellingPrice: Number(variantDraft.sellingPrice),
          quantity: Number(variantDraft.quantity),
        },
      })
    );
    if (updateVariant.fulfilled.match(result)) {
      showSnackbar("Variant updated!");
    } else {
      showSnackbar(result.payload || "Update failed.", "error");
    }
    setEditingVariantId(null);
    setVariantDraft(null);
  };

  const handleDeleteVariant = async (variantId) => {
    if (variants.length <= 1) {
      showSnackbar("A product must have at least one variant.", "warning");
      return;
    }
    const result = await dispatch(deleteVariant(variantId));
    if (deleteVariant.fulfilled.match(result)) {
      showSnackbar("Variant deleted.");
    } else {
      showSnackbar(result.payload || "Delete failed.", "error");
    }
  };

  const handleAddVariant = async () => {
    if (!newVariantRow.variantName.trim()) {
      showSnackbar("Variant name is required.", "error");
      return;
    }
    const result = await dispatch(
      createVariant({
        productId: Number(productId),
        variant: {
          variantName: newVariantRow.variantName,
          sku: newVariantRow.sku || undefined,
          mrpPrice: Number(newVariantRow.mrpPrice) || Number(form.mrpPrice),
          sellingPrice: Number(newVariantRow.sellingPrice) || Number(form.sellingPrice),
          quantity: Number(newVariantRow.quantity) || 0,
        },
      })
    );
    if (createVariant.fulfilled.match(result)) {
      showSnackbar("Variant added!");
      setNewVariantRow(emptyVariantRow());
      setAddingVariant(false);
    } else {
      showSnackbar(result.payload || "Failed to add variant.", "error");
    }
  };

  if (!product)
    return (
      <div className="flex justify-center py-20">
        <CircularProgress color="primary" />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <IconButton onClick={() => navigate("/seller/products")} sx={{ border: "1px solid", borderColor: "divider" }}>
          <ArrowBackIcon />
        </IconButton>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Edit Product</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{product.title}</p>
        </div>
      </div>

      {/* ── Product Images ─────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <Typography variant="subtitle1" className="font-bold text-slate-800 dark:text-slate-200 mb-3">
          Product Images
        </Typography>
        <div className="flex flex-wrap gap-3">
          <label htmlFor="editFileInput" className="cursor-pointer">
            <div className="w-24 h-24 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center gap-1 text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors bg-slate-50 dark:bg-slate-950">
              {uploadingImage ? <CircularProgress size={22} /> : (
                <>
                  <AddPhotoAlternateIcon fontSize="small" />
                  <span className="text-[10px] font-semibold">Add Photo</span>
                </>
              )}
            </div>
            <input type="file" accept="image/*" id="editFileInput" style={{ display: "none" }} onChange={handleImageUpload} />
          </label>
          {images.map((img, i) => (
            <div key={i} className="relative w-24 h-24">
              <img src={img} alt={`img-${i}`} className="w-full h-full rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
              <IconButton
                size="small" color="error" onClick={() => handleRemoveImage(i)}
                sx={{ position: "absolute", top: -8, right: -8, bgcolor: "white", border: "1px solid #fca5a5", width: 22, height: 22 }}
              >
                <CloseIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      {/* ── Product Details ────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <Typography variant="subtitle1" className="font-bold text-slate-800 dark:text-slate-200 mb-4">
          Product Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth type="number" label="MRP Price (₹)" value={form.mrpPrice} onChange={(e) => setForm({ ...form, mrpPrice: e.target.value })} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth type="number" label="Selling Price (₹)" value={form.sellingPrice} onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth label="Color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained" color="primary" onClick={handleSaveProduct} disabled={saving}
              sx={{ borderRadius: "12px", fontWeight: 700, textTransform: "none", px: 3 }}
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null}
            >
              {saving ? "Saving..." : "Save Product Details"}
            </Button>
          </Grid>
        </Grid>
      </div>

      {/* ── Variant Manager ────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Typography variant="subtitle1" className="font-bold text-slate-800 dark:text-slate-200">
              Variants ({variants.length})
            </Typography>
            <Typography variant="caption" className="text-slate-500 dark:text-slate-400">
              Edit size / storage / option variants. Each has its own price &amp; stock.
            </Typography>
          </div>
          <Button
            startIcon={<AddIcon />} variant="outlined" color="primary" size="small"
            onClick={() => setAddingVariant(true)}
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
          >
            Add Variant
          </Button>
        </div>

        {variantLoading ? (
          <div className="flex justify-center py-8"><CircularProgress size={28} /></div>
        ) : (
          <div className="space-y-2">
            {variants.map((v) => (
              <div key={v.id} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3">
                {editingVariantId === v.id ? (
                  <Grid container spacing={1.5} alignItems="center">
                    <Grid item xs={12} sm={2}>
                      <TextField fullWidth size="small" label="Name"
                        value={variantDraft.variantName}
                        onChange={(e) => setVariantDraft({ ...variantDraft, variantName: e.target.value })} />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <TextField fullWidth size="small" label="MRP (₹)" type="number"
                        value={variantDraft.mrpPrice}
                        onChange={(e) => setVariantDraft({ ...variantDraft, mrpPrice: e.target.value })} />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <TextField fullWidth size="small" label="Selling (₹)" type="number"
                        value={variantDraft.sellingPrice}
                        onChange={(e) => setVariantDraft({ ...variantDraft, sellingPrice: e.target.value })} />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <TextField fullWidth size="small" label="Stock" type="number"
                        value={variantDraft.quantity}
                        onChange={(e) => setVariantDraft({ ...variantDraft, quantity: e.target.value })} />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <TextField fullWidth size="small" label="SKU"
                        value={variantDraft.sku}
                        onChange={(e) => setVariantDraft({ ...variantDraft, sku: e.target.value })} />
                    </Grid>
                    <Grid item xs={12} sm={2} className="flex gap-1">
                      <Tooltip title="Save"><IconButton size="small" color="success" onClick={handleSaveEditVariant}><CheckIcon fontSize="small" /></IconButton></Tooltip>
                      <Tooltip title="Cancel"><IconButton size="small" color="inherit" onClick={() => { setEditingVariantId(null); setVariantDraft(null); }}><CloseIcon fontSize="small" /></IconButton></Tooltip>
                    </Grid>
                  </Grid>
                ) : (
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-0.5 rounded-lg">
                        {v.variantName}
                      </span>
                      {v.mrpPrice !== v.sellingPrice && (
                        <span className="text-xs text-slate-400 line-through">₹{v.mrpPrice}</span>
                      )}
                      <span className="text-xs font-bold text-teal-700 dark:text-teal-400">₹{v.sellingPrice}</span>
                      <Chip
                        label={`${v.quantity} in stock`}
                        size="small"
                        color={v.quantity > 0 ? "success" : "error"}
                        variant="outlined"
                        sx={{ fontSize: "11px" }}
                      />
                      {v.sku && <span className="text-xs text-slate-400">SKU: {v.sku}</span>}
                      {v.isDefault && <Chip label="Default" size="small" color="info" sx={{ fontSize: "10px" }} />}
                    </div>
                    <div className="flex gap-1">
                      <IconButton size="small" color="primary" onClick={() => handleStartEditVariant(v)}><EditIcon fontSize="small" /></IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDeleteVariant(v.id)} disabled={variants.length <= 1}><DeleteIcon fontSize="small" /></IconButton>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add new variant form */}
            {addingVariant && (
              <div className="bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800 rounded-xl px-4 py-3">
                <Typography variant="caption" className="text-teal-700 dark:text-teal-400 font-bold mb-2 block">New Variant</Typography>
                <Grid container spacing={1.5} alignItems="center">
                  <Grid item xs={12} sm={2}>
                    <TextField fullWidth size="small" label="Name *" placeholder="e.g. L, 256GB"
                      value={newVariantRow.variantName}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, variantName: e.target.value })} />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField fullWidth size="small" label="MRP (₹)" type="number"
                      value={newVariantRow.mrpPrice}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, mrpPrice: e.target.value })} />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField fullWidth size="small" label="Selling (₹)" type="number"
                      value={newVariantRow.sellingPrice}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, sellingPrice: e.target.value })} />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField fullWidth size="small" label="Stock *" type="number"
                      value={newVariantRow.quantity}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, quantity: e.target.value })} />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <TextField fullWidth size="small" label="SKU (optional)"
                      value={newVariantRow.sku}
                      onChange={(e) => setNewVariantRow({ ...newVariantRow, sku: e.target.value })} />
                  </Grid>
                  <Grid item xs={12} sm={2} className="flex gap-2">
                    <Button size="small" variant="contained" color="primary" onClick={handleAddVariant}
                      disabled={variantLoading}
                      sx={{ borderRadius: "8px", textTransform: "none", fontWeight: 700, fontSize: "12px" }}>
                      {variantLoading ? <CircularProgress size={14} color="inherit" /> : "Add"}
                    </Button>
                    <Button size="small" variant="outlined" color="inherit"
                      onClick={() => { setAddingVariant(false); setNewVariantRow(emptyVariantRow()); }}
                      sx={{ borderRadius: "8px", textTransform: "none", fontSize: "12px" }}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        )}
      </div>

      <Snackbar
        open={snackbar.open} autoHideDuration={4000}
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
