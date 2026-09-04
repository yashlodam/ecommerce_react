import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerProduct,
  deleteSellerProduct,
  updateSellerProduct,
} from "../../../State/seller/sellerProductSlice";
import EmptyState from "../../../common/EmptyState";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sellerProduct = useAppSelector((store) => store.sellerProduct);
  const products = sellerProduct?.products || [];
  const loading = sellerProduct?.loading || false;
  const productList = Array.isArray(products) ? products : [];

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [stockDialog, setStockDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState(0);
  const [filterTab, setFilterTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = productList.filter((item) => {
    if (!item) return false;
    const matchesTab =
      filterTab === "ALL"
        ? true
        : filterTab === "IN_STOCK"
        ? item.quantity > 0
        : (item.quantity ?? 0) <= 0;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.brand?.toLowerCase().includes(q) ||
      item.color?.toLowerCase().includes(q);
    return matchesTab && matchesQuery;
  });

  useEffect(() => {
    dispatch(fetchSellerProduct());
  }, [dispatch]);

  const handleDelete = (prod) => {
    setSelectedProduct(prod);
    setDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      dispatch(deleteSellerProduct(selectedProduct.id));
    }
    setDeleteDialog(false);
    setSelectedProduct(null);
  };

  const handleEditStock = (prod) => {
    setSelectedProduct(prod);
    setNewStock(prod.quantity || 0);
    setStockDialog(true);
  };

  const confirmStockUpdate = () => {
    if (selectedProduct) {
      dispatch(
        updateSellerProduct({
          productId: selectedProduct.id,
          product: { ...selectedProduct, quantity: Number(newStock) },
        })
      );
    }
    setStockDialog(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Product Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your store's listings, stock availability, and retail pricing.
          </p>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/seller/add-product")}
          sx={{
            borderRadius: "12px",
            fontWeight: 700,
            textTransform: "none",
            px: 2.5,
          }}
        >
          Add Product
        </Button>
      </div>

      {/* Controls: Search & Stock Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <Tabs
          value={filterTab}
          onChange={(e, val) => setFilterTab(val)}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab value="ALL" label={`All (${productList.length})`} className="font-bold text-xs" />
          <Tab
            value="IN_STOCK"
            label={`In Stock (${productList.filter((p) => p.quantity > 0).length})`}
            className="font-bold text-xs"
          />
          <Tab
            value="OUT_OF_STOCK"
            label={`Out of Stock (${productList.filter((p) => (p.quantity ?? 0) <= 0).length})`}
            className="font-bold text-xs"
          />
        </Tabs>

        <TextField
          size="small"
          placeholder="Search listings by title, color, brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" className="text-slate-400" />
              </InputAdornment>
            ),
          }}
          className="min-w-[280px]"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8 transition-colors">
          <EmptyState
            icon={InventoryIcon}
            title="No products found"
            description={
              searchQuery || filterTab !== "ALL"
                ? "No inventory items match your search or filter criteria."
                : "You haven't listed any products yet. Click 'Add Product' to create your first catalog listing!"
            }
            actionText={!searchQuery && filterTab === "ALL" ? "Add First Product" : undefined}
            onAction={() => navigate("/seller/add-product")}
          />
        </div>
      ) : (
        <>
          {/* Mobile Cards (visible on xs/sm) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredProducts.map((item) => {
              const isInStock = item.quantity > 0;
              const variantCount = item.variants?.length ?? 0;
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={item.images?.[0] || "https://placehold.co/80x80?text=Product"}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/80x80?text=Product";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {item.brand || item.color || "Standard"}
                        </span>
                        {variantCount > 0 && (
                          <Chip
                            label={`${variantCount} var`}
                            size="small"
                            color="info"
                            variant="outlined"
                            sx={{ fontSize: "10px", height: "18px" }}
                          />
                        )}
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-bold text-teal-600 dark:text-teal-400 text-sm">
                          {formatINR(item.sellingPrice)}
                        </span>
                        {item.mrpPrice > item.sellingPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatINR(item.mrpPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <Chip
                      label={isInStock ? `${item.quantity} in stock` : "Out of Stock"}
                      size="small"
                      color={isInStock ? "primary" : "error"}
                      onClick={() => handleEditStock(item)}
                      className="cursor-pointer font-bold text-xs"
                    />
                    <div className="flex items-center gap-1">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => navigate(`/seller/edit-product/${item.id}`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(item)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop & Tablet Table (visible on md+) */}
          <TableContainer
            component={Paper}
            elevation={0}
            className="hidden md:block"
            sx={{
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="seller products table">
              <TableHead className="bg-slate-50 dark:bg-slate-950/60">
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Item</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">MRP</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Selling Price</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Discount</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Stock Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((item) => {
                  const isInStock = item.quantity > 0;
                  const variantCount = item.variants?.length ?? 0;
                  return (
                    <TableRow key={item.id} hover className="transition-colors">
                      <TableCell>
                        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 p-1 flex items-center justify-center">
                          <img
                            src={item.images?.[0] || "https://placehold.co/80x80?text=Product"}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "https://placehold.co/80x80?text=Product";
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Color: {item.color || "Standard"}
                          </span>
                          {variantCount > 0 && (
                            <Chip
                              label={`${variantCount} variant${variantCount !== 1 ? "s" : ""}`}
                              size="small"
                              color="info"
                              variant="outlined"
                              sx={{ fontSize: "10px", height: "18px" }}
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="right" className="text-slate-400 line-through text-sm">
                        {formatINR(item.mrpPrice)}
                      </TableCell>
                      <TableCell align="right" className="font-bold text-teal-700 dark:text-teal-400 text-sm">
                        {formatINR(item.sellingPrice)}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${item.discountPercent || 0}% OFF`}
                          size="small"
                          color="success"
                          variant="outlined"
                          className="font-bold text-xs"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={isInStock ? `${item.quantity} in stock` : "Out of Stock"}
                          size="small"
                          color={isInStock ? "primary" : "error"}
                          onClick={() => handleEditStock(item)}
                          className="cursor-pointer font-bold text-xs"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex justify-end items-center gap-1">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => navigate(`/seller/edit-product/${item.id}`)}
                            title="Edit Product & Variants"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(item)}
                            title="Delete Product"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} PaperProps={{ sx: { borderRadius: "16px" } }}>
        <DialogTitle className="font-bold">Delete Product Listing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete{" "}
            <strong>{selectedProduct?.title}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialog(false)} color="inherit" sx={{ borderRadius: "10px" }}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained" sx={{ borderRadius: "10px", fontWeight: 700 }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quick Stock Update Dialog */}
      <Dialog open={stockDialog} onClose={() => setStockDialog(false)} PaperProps={{ sx: { borderRadius: "16px" } }}>
        <DialogTitle className="font-bold">Update Inventory Quantity</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">
            Adjust available inventory units for <strong>{selectedProduct?.title}</strong>:
          </DialogContentText>
          <TextField
            autoFocus
            type="number"
            label="Available Stock (Units)"
            fullWidth
            value={newStock}
            onChange={(e) => setNewStock(Math.max(0, parseInt(e.target.value) || 0))}
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setStockDialog(false)} color="inherit" sx={{ borderRadius: "10px" }}>
            Cancel
          </Button>
          <Button onClick={confirmStockUpdate} color="primary" variant="contained" sx={{ borderRadius: "10px", fontWeight: 700 }}>
            Save Stock
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}