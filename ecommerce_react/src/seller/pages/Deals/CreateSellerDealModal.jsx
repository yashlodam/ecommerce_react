import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Alert,
  CircularProgress,
  Box,
  Typography,
  Chip,
  InputAdornment,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchSellerProduct } from "../../../State/seller/sellerProductSlice";
import {
  createSellerDeal,
  updateSellerDeal,
  fetchSellerDeals,
} from "../../../State/seller/sellerDealSlice";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

export default function CreateSellerDealModal({
  open,
  handleClose,
  dealToEdit = null,
}) {
  const dispatch = useAppDispatch();
  const sellerProduct = useAppSelector((store) => store.sellerProduct);
  const products = sellerProduct?.products || [];
  const productsLoading = sellerProduct?.loading || false;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("PERCENTAGE");
  const [discountValue, setDiscountValue] = useState("");
  const [maxDiscountAmount, setMaxDiscountAmount] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (open) {
      if (!products || products.length === 0) {
        dispatch(fetchSellerProduct());
      }
      if (dealToEdit) {
        setTitle(dealToEdit.title || "");
        setDescription(dealToEdit.description || "");
        setDiscountType(dealToEdit.discountType || "PERCENTAGE");
        setDiscountValue(dealToEdit.discountValue || "");
        setMaxDiscountAmount(dealToEdit.maxDiscountAmount || "");
        setStartAt(dealToEdit.startAt ? dealToEdit.startAt.substring(0, 16) : "");
        setEndAt(dealToEdit.endAt ? dealToEdit.endAt.substring(0, 16) : "");
        setUsageLimit(dealToEdit.usageLimit || "");
        setSelectedProductIds(
          dealToEdit.products ? dealToEdit.products.map((p) => p.id) : []
        );
      } else {
        // Defaults for new deal
        setTitle("");
        setDescription("");
        setDiscountType("PERCENTAGE");
        setDiscountValue("20");
        setMaxDiscountAmount("");
        const now = new Date();
        const future = new Date();
        future.setDate(future.getDate() + 30);
        setStartAt(now.toISOString().substring(0, 16));
        setEndAt(future.toISOString().substring(0, 16));
        setUsageLimit("");
        setSelectedProductIds([]);
      }
      setErrorMsg("");
    }
  }, [open, dealToEdit, dispatch]);

  const filteredProducts = products.filter((p) =>
    (p.title || "").toLowerCase().includes(productSearch.toLowerCase())
  );

  const handleToggleProduct = (pid) => {
    setSelectedProductIds((prev) =>
      prev.includes(pid) ? prev.filter((id) => id !== pid) : [...prev, pid]
    );
  };

  const handleSelectAll = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    }
  };

  // Preview calculation
  const sampleProduct = products.find((p) => selectedProductIds.includes(p.id));
  const previewCalculation = () => {
    if (!sampleProduct || !discountValue || Number(discountValue) <= 0) return null;
    const base = Number(sampleProduct.sellingPrice || sampleProduct.mrpPrice || 0);
    let discount = 0;
    if (discountType === "PERCENTAGE") {
      discount = (base * Number(discountValue)) / 100;
      if (maxDiscountAmount && Number(maxDiscountAmount) > 0) {
        discount = Math.min(discount, Number(maxDiscountAmount));
      }
    } else {
      discount = Number(discountValue);
    }
    const finalPrice = Math.max(0, Math.round(base - discount));
    return {
      title: sampleProduct.title,
      base,
      discount: Math.round(discount),
      finalPrice,
    };
  };

  const preview = previewCalculation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title.trim()) {
      setErrorMsg("Please enter a promotional deal title.");
      return;
    }

    if (!discountValue || Number(discountValue) <= 0) {
      setErrorMsg("Please specify a discount value greater than 0.");
      return;
    }

    if (discountType === "PERCENTAGE" && Number(discountValue) > 99) {
      setErrorMsg("Percentage discount cannot exceed 99%.");
      return;
    }

    if (!dealToEdit && selectedProductIds.length === 0) {
      setErrorMsg("Please select at least one product for this promotional deal.");
      return;
    }

    if (startAt && endAt && new Date(endAt) <= new Date(startAt)) {
      setErrorMsg("End date must be scheduled after start date.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim() || null,
        dealType: "PRODUCT",
        discountType,
        discountValue: Number(discountValue),
        maxDiscountAmount: maxDiscountAmount ? Number(maxDiscountAmount) : null,
        minOrderAmount: null,
        startAt: startAt ? new Date(startAt).toISOString() : null,
        endAt: endAt ? new Date(endAt).toISOString() : null,
        usageLimit: usageLimit ? Number(usageLimit) : null,
        productIds: selectedProductIds,
      };

      if (dealToEdit) {
        await dispatch(
          updateSellerDeal({ id: dealToEdit.id, dealData: payload })
        ).unwrap();
      } else {
        await dispatch(createSellerDeal(payload)).unwrap();
      }

      dispatch(fetchSellerDeals());
      handleClose();
    } catch (err) {
      setErrorMsg(
        typeof err === "string"
          ? err
          : err?.message || "Failed to save deal. Please verify details."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          p: 1,
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <LocalOfferIcon fontSize="small" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {dealToEdit ? "Edit Promotional Deal" : "Create Product Deal"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Set exclusive promotional discounts on your products to drive sales
            </p>
          </div>
        </div>
      </DialogTitle>

      <DialogContent dividers className="space-y-4 pt-4">
        {errorMsg && (
          <Alert severity="error" className="rounded-xl text-xs">
            {errorMsg}
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            fullWidth
            label="Deal Title *"
            placeholder="e.g. Flash Weekend Sale 25% Off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
          />

          <TextField
            fullWidth
            label="Description (Optional)"
            placeholder="e.g. Limited time discount for summer collection"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormControl fullWidth size="small">
            <InputLabel id="discount-type-label">Discount Type</InputLabel>
            <Select
              labelId="discount-type-label"
              value={discountType}
              label="Discount Type"
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <MenuItem value="PERCENTAGE">Percentage (%)</MenuItem>
              <MenuItem value="FIXED_AMOUNT">Fixed Amount (₹)</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label={discountType === "PERCENTAGE" ? "Discount Percentage (%) *" : "Discount Amount (₹) *"}
            type="number"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {discountType === "PERCENTAGE" ? "%" : "₹"}
                </InputAdornment>
              ),
            }}
          />

          {discountType === "PERCENTAGE" ? (
            <TextField
              fullWidth
              label="Max Discount Cap (₹ Optional)"
              type="number"
              placeholder="e.g. 500"
              value={maxDiscountAmount}
              onChange={(e) => setMaxDiscountAmount(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          ) : (
            <TextField
              fullWidth
              label="Usage Limit (Optional)"
              type="number"
              placeholder="e.g. 100 uses"
              value={usageLimit}
              onChange={(e) => setUsageLimit(e.target.value)}
              size="small"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            fullWidth
            label="Start Date & Time"
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="End Date & Time"
            type="datetime-local"
            value={endAt}
            onChange={(e) => setEndAt(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </div>

        {/* Live Preview Banner */}
        {preview && (
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 text-xs flex items-center justify-between">
            <div>
              <span className="text-teal-900 dark:text-teal-200 font-bold">
                Live Pricing Preview:{" "}
              </span>
              <span className="text-slate-600 dark:text-slate-300">
                {preview.title}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="line-through text-slate-400">
                {formatINR(preview.base)}
              </span>
              <span className="text-teal-700 dark:text-teal-400 font-extrabold text-sm">
                {formatINR(preview.finalPrice)}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                (Save {formatINR(preview.discount)})
              </span>
            </div>
          </div>
        )}

        {/* Product Selection Section */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Select Products to Apply Deal ({selectedProductIds.length} selected)
              </Typography>
              <Typography variant="caption" color="text.secondary">
                This deal will apply exclusively to your selected products
              </Typography>
            </div>
            <Button
              size="small"
              onClick={handleSelectAll}
              sx={{ textTransform: "none", fontSize: "11px", fontWeight: 600 }}
            >
              {selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>

          <TextField
            fullWidth
            placeholder="Search your products..."
            size="small"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" className="text-slate-400" />
                </InputAdornment>
              ),
            }}
          />

          <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100 dark:divide-slate-800">
            {productsLoading ? (
              <div className="flex justify-center items-center py-8">
                <CircularProgress size={24} />
              </div>
            ) : filteredProducts.length === 0 ? (
              <p className="text-xs text-center py-6 text-slate-400">
                No matching products found in your inventory.
              </p>
            ) : (
              filteredProducts.map((p) => {
                const isSelected = selectedProductIds.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleToggleProduct(p.id)}
                    className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => handleToggleProduct(p.id)}
                        sx={{ p: 0.5 }}
                      />
                      {p.images && p.images[0] && (
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-xs text-slate-900 dark:text-slate-100 line-clamp-1">
                          {p.title}
                        </p>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Stock: {p.quantity || 0}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
                        {formatINR(p.sellingPrice || p.mrpPrice)}
                      </span>
                      {p.mrpPrice && p.mrpPrice > p.sellingPrice && (
                        <p className="text-[10px] text-slate-400 line-through font-mono">
                          {formatINR(p.mrpPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={handleClose}
          color="inherit"
          disabled={submitting}
          sx={{ borderRadius: "10px", textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting}
          sx={{
            borderRadius: "10px",
            fontWeight: 700,
            textTransform: "none",
            px: 3,
            bgcolor: "#0d9488",
            "&:hover": { bgcolor: "#0f766e" },
          }}
        >
          {submitting ? (
            <div className="flex items-center gap-2">
              <CircularProgress size={16} color="inherit" />
              <span>Saving Deal...</span>
            </div>
          ) : dealToEdit ? (
            "Update Deal"
          ) : (
            "Create Deal"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
