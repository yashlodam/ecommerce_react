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
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerProduct,
  deleteSellerProduct,
  updateSellerProduct,
} from "../../../State/seller/sellerProductSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
}));

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
  const { products, loading } = useAppSelector((store) => store.sellerProduct);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [stockDialog, setStockDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState(0);

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
    <Box>
      <Box className="flex justify-between items-center mb-6">
        <div>
          <Typography variant="h5" className="font-bold text-slate-800">
            Product Inventory
          </Typography>
          <Typography variant="body2" className="text-slate-500">
            Manage your store's listings, stock availability, and retail pricing.
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/seller/add-product")}
          className="normal-case font-semibold"
        >
          Add Product
        </Button>
      </Box>

      {loading ? (
        <Box className="flex justify-center items-center py-20">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          component={Paper}
          elevation={1}
          className="rounded-xl overflow-hidden border border-slate-100"
        >
          <Table sx={{ minWidth: 700 }} aria-label="seller products table">
            <TableHead className="bg-slate-50">
              <TableRow>
                <StyledTableCell>Item</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">MRP</StyledTableCell>
                <StyledTableCell align="right">Selling Price</StyledTableCell>
                <StyledTableCell align="center">Discount</StyledTableCell>
                <StyledTableCell align="center">Stock Status</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!products || products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" className="py-12 text-slate-400">
                    No products listed yet. Click "Add Product" to create your first listing!
                  </TableCell>
                </TableRow>
              ) : (
                products.map((item) => {
                  const isInStock = item.quantity > 0;
                  return (
                    <TableRow key={item.id} hover className="transition-colors">
                      <TableCell>
                        <img
                          src={item.images?.[0] || "https://placehold.co/80x80?text=Product"}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded-lg border border-slate-200"
                        />
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold text-sm text-slate-800 line-clamp-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Color: {item.color || "Standard"} • Sizes: {item.sizes || "Free Size"}
                        </p>
                      </TableCell>
                      <TableCell align="right" className="text-slate-400 line-through text-sm">
                        {formatINR(item.mrpPrice)}
                      </TableCell>
                      <TableCell align="right" className="font-bold text-slate-900 text-sm">
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
                          className="cursor-pointer font-medium text-xs"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box className="flex justify-end items-center gap-1">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEditStock(item)}
                            title="Quick Edit Stock"
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
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle className="font-bold">Delete Product Listing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete{" "}
            <strong>{selectedProduct?.title}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quick Stock Update Dialog */}
      <Dialog open={stockDialog} onClose={() => setStockDialog(false)}>
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
        <DialogActions>
          <Button onClick={() => setStockDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmStockUpdate} color="primary" variant="contained">
            Save Stock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}