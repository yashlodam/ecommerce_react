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
  Switch,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchSellerDeals,
  toggleSellerDealStatus,
  deleteSellerDeal,
} from "../../../State/seller/sellerDealSlice";
import CreateSellerDealModal from "./CreateSellerDealModal";
import EmptyState from "../../../common/EmptyState";
import DealStatusBadge from "../../../common/deals/DealStatusBadge";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function formatDate(isoStr) {
  if (!isoStr) return "N/A";
  const d = new Date(isoStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function SellerDeals() {
  const dispatch = useAppDispatch();
  const sellerDeal = useAppSelector((store) => store.sellerDeal);
  const deals = sellerDeal?.deals || [];
  const loading = sellerDeal?.loading || false;

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [dealToEdit, setDealToEdit] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dealToDelete, setDealToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("ALL");

  useEffect(() => {
    dispatch(fetchSellerDeals());
  }, [dispatch]);

  // Status computation helper
  const getDealStatus = (deal) => {
    if (!deal.active) return "DISABLED";
    const now = new Date();
    if (deal.startAt && new Date(deal.startAt) > now) return "SCHEDULED";
    if (deal.endAt && new Date(deal.endAt) < now) return "EXPIRED";
    if (deal.usageLimit && deal.usageCount >= deal.usageLimit) return "DEPLETED";
    return "ACTIVE";
  };

  const filteredDeals = deals.filter((deal) => {
    const status = getDealStatus(deal);
    const matchesTab =
      filterTab === "ALL" ||
      (filterTab === "ACTIVE" && status === "ACTIVE") ||
      (filterTab === "DISABLED" && status === "DISABLED") ||
      (filterTab === "EXPIRED" && (status === "EXPIRED" || status === "DEPLETED"));

    const matchesSearch =
      (deal.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.products &&
        deal.products.some((p) =>
          (p.title || "").toLowerCase().includes(searchQuery.toLowerCase())
        ));

    return matchesTab && matchesSearch;
  });

  // KPI Metrics
  const totalDeals = deals.length;
  const activeDeals = deals.filter((d) => getDealStatus(d) === "ACTIVE").length;
  const totalRedemptions = deals.reduce((acc, d) => acc + (d.usageCount || 0), 0);

  const handleOpenCreate = () => {
    setDealToEdit(null);
    setCreateModalOpen(true);
  };

  const handleOpenEdit = (deal) => {
    setDealToEdit(deal);
    setCreateModalOpen(true);
  };

  const handleToggleStatus = (dealId) => {
    dispatch(toggleSellerDealStatus(dealId));
  };

  const handleConfirmDelete = async () => {
    if (dealToDelete) {
      await dispatch(deleteSellerDeal(dealToDelete.id));
      setDeleteDialogOpen(false);
      setDealToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              Deals & Promotions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
              Self-Serve
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create custom discounts and flash sales for your products. Real-time pricing applies automatically at cart & checkout.
          </p>
        </div>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{
            bgcolor: "#0d9488",
            "&:hover": { bgcolor: "#0f766e" },
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: 700,
            px: 3,
            py: 1.2,
            boxShadow: "0 4px 14px 0 rgba(13, 148, 136, 0.3)",
          }}
        >
          Create New Deal
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <LocalOfferIcon />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Total Promotions</p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{totalDeals}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircleIcon />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Active Live Deals</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{activeDeals}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <TrendingUpIcon />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Customer Redemptions</p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{totalRedemptions}</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Tabs
          value={filterTab}
          onChange={(e, val) => setFilterTab(val)}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 700,
              fontSize: "13px",
              minHeight: "42px",
            },
          }}
        >
          <Tab label={`All (${totalDeals})`} value="ALL" />
          <Tab label={`Active (${activeDeals})`} value="ACTIVE" />
          <Tab label="Disabled" value="DISABLED" />
          <Tab label="Expired" value="EXPIRED" />
        </Tabs>

        <TextField
          placeholder="Search deals or products..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 260 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" className="text-slate-400" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Deals Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" size={32} />
        </div>
      ) : filteredDeals.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center">
          <EmptyState
            title="No promotional deals found"
            subtitle={
              deals.length === 0
                ? "You have not created any deals yet. Launch your first promotion to boost sales!"
                : "No deals match your current search or tab filters."
            }
            action={
              deals.length === 0 && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenCreate}
                  sx={{
                    bgcolor: "#0d9488",
                    "&:hover": { bgcolor: "#0f766e" },
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Create Your First Deal
                </Button>
              )
            }
          />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: "24px",
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
        >
          <Table sx={{ minWidth: 750 }}>
            <TableHead className="bg-slate-50 dark:bg-slate-950/60">
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Promotion / Deal</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Target Products</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Discount</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Validity</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Active</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredDeals.map((deal) => {
                const status = getDealStatus(deal);
                return (
                  <TableRow key={deal.id} hover className="transition-colors">
                    <TableCell>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                            {deal.title}
                          </span>
                          <Chip
                            label="PRODUCT"
                            size="small"
                            sx={{
                              fontSize: "10px",
                              height: "20px",
                              fontWeight: 700,
                              bgcolor: "#f0fdf4",
                              color: "#15803d",
                              border: "1px solid #bbf7d0",
                            }}
                          />
                        </div>
                        {deal.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {deal.description}
                          </p>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">
                          ID: #{deal.id} • Created: {formatDate(deal.createdAt)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {deal.products && deal.products.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2 overflow-hidden">
                            {deal.products.slice(0, 3).map((p, idx) => (
                              <img
                                key={p.id || idx}
                                src={p.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80"}
                                alt={p.title}
                                className="inline-block h-8 w-8 rounded-lg object-cover ring-2 ring-white dark:ring-slate-900 border border-slate-200"
                              />
                            ))}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[160px]">
                              {deal.products[0]?.title}
                            </p>
                            {deal.products.length > 1 && (
                              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                                +{deal.products.length - 1} more products
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">All Store Products</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-sm text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800 inline-block">
                          {deal.discountType === "FIXED_AMOUNT"
                            ? `${formatINR(deal.discountValue)} OFF`
                            : `${deal.discountValue}% OFF`}
                        </span>
                        {deal.maxDiscountAmount && (
                          <p className="text-[10px] text-slate-400 font-mono">
                            Up to {formatINR(deal.maxDiscountAmount)}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="text-xs space-y-0.5">
                        <p className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                          {formatDate(deal.startAt)} → {formatDate(deal.endAt)}
                        </p>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Redemptions: {deal.usageCount || 0}
                          {deal.usageLimit ? ` / ${deal.usageLimit}` : " (unlimited)"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title={deal.active ? "Click to disable deal" : "Click to enable deal"}>
                        <Switch
                          checked={deal.active || false}
                          onChange={() => handleToggleStatus(deal.id)}
                          color="primary"
                          size="small"
                        />
                      </Tooltip>
                    </TableCell>

                    <TableCell align="center">
                      <DealStatusBadge status={status} active={deal.active} />
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenEdit(deal)}
                        aria-label="Edit deal"
                        sx={{ mr: 0.5 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          setDealToDelete(deal);
                          setDeleteDialogOpen(true);
                        }}
                        aria-label="Delete deal"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create / Edit Deal Modal */}
      <CreateSellerDealModal
        open={createModalOpen}
        handleClose={() => setCreateModalOpen(false)}
        dealToEdit={dealToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: "20px", p: 1 } }}
      >
        <DialogTitle className="font-bold">Delete Promotional Deal?</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-xs">
            Are you sure you want to permanently delete &quot;{dealToDelete?.title}&quot;?
            Products will immediately return to standard selling price.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="inherit"
            sx={{ borderRadius: "10px", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700 }}
          >
            Delete Deal
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
