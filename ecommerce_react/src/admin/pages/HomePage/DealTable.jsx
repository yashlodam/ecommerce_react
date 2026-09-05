import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchDeals,
  deleteDeal,
  updateDeal,
  toggleAdminDealStatus,
  fetchHomePageData,
} from "../../../State/customer/CustomerSlice";
import DealStatusBadge from "../../../common/deals/DealStatusBadge";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

export default function DealTable() {
  const dispatch = useAppDispatch();
  const home = useAppSelector((store) => store.home || store.customer);
  const deals = home?.deals || [];
  const loading = home?.loading || false;

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [editDiscount, setEditDiscount] = useState(20);
  const [savingEdit, setSavingEdit] = useState(false);
  const [editError, setEditError] = useState("");
  const [filterTab, setFilterTab] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dealToDelete, setDealToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchDeals());
  }, [dispatch]);

  const handleOpenDelete = (deal) => {
    setDealToDelete(deal);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (dealToDelete) {
      await dispatch(deleteDeal(dealToDelete.id));
      dispatch(fetchDeals());
      dispatch(fetchHomePageData());
      setDeleteDialogOpen(false);
      setDealToDelete(null);
    }
  };

  const handleToggleStatus = async (id) => {
    await dispatch(toggleAdminDealStatus(id));
  };

  const handleOpenEdit = (deal) => {
    setSelectedDeal(deal);
    setEditDiscount(deal.discount || deal.discountValue || 20);
    setEditError("");
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedDeal) return;
    if (editDiscount < 1 || editDiscount > 99) {
      setEditError("Discount must be between 1% and 99%");
      return;
    }
    setSavingEdit(true);
    setEditError("");
    try {
      await dispatch(
        updateDeal({
          id: selectedDeal.id,
          deal: {
            discount: Number(editDiscount),
            discountValue: Number(editDiscount),
          },
        })
      ).unwrap();
      dispatch(fetchDeals());
      dispatch(fetchHomePageData());
      setEditDialogOpen(false);
    } catch (err) {
      setEditError(typeof err === "string" ? err : "Failed to update deal discount.");
    } finally {
      setSavingEdit(false);
    }
  };

  const getDealStatus = (deal) => {
    if (!deal.active) return "DISABLED";
    const now = new Date();
    if (deal.startAt && new Date(deal.startAt) > now) return "SCHEDULED";
    if (deal.endAt && new Date(deal.endAt) < now) return "EXPIRED";
    return "ACTIVE";
  };

  const filteredDeals = deals.filter((deal) => {
    const status = getDealStatus(deal);
    const matchesTab =
      filterTab === "ALL" ||
      (filterTab === "ACTIVE" && status === "ACTIVE") ||
      (filterTab === "DISABLED" && status === "DISABLED") ||
      (filterTab === "EXPIRED" && status === "EXPIRED");

    const matchesSearch =
      (deal.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.category?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.categorySlug || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (deal.dealType || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <Tabs
          value={filterTab}
          onChange={(e, val) => setFilterTab(val)}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 700,
              fontSize: "12px",
              minHeight: "38px",
            },
          }}
        >
          <Tab label={`All Deals (${deals.length})`} value="ALL" />
          <Tab label="Active" value="ACTIVE" />
          <Tab label="Disabled" value="DISABLED" />
          <Tab label="Expired" value="EXPIRED" />
        </Tabs>

        <TextField
          placeholder="Search promotional deals..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ minWidth: 240 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" className="text-slate-400" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" size={28} />
        </div>
      ) : filteredDeals.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-sm">
          No promotional deals found. Use &quot;Create New Deal&quot; to configure one!
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: "20px",
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
            <Table sx={{ minWidth: 700 }}>
              <TableHead className="bg-slate-50 dark:bg-slate-950/60">
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Deal / Promotion</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Target Scope</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Discount</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Active</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredDeals.map((deal, idx) => {
                  const status = getDealStatus(deal);
                  const dealType = deal.dealType || "CATEGORY";

                  return (
                    <TableRow key={deal.id || idx} hover className="transition-colors">
                      <TableCell className="font-mono text-xs text-slate-400">
                        #{deal.id || idx + 1}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          {deal.category?.image ? (
                            <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden p-0.5">
                              <img
                                src={deal.category.image}
                                alt={deal.category?.name || "Deal"}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                          ) : deal.products && deal.products[0]?.image ? (
                            <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden p-0.5">
                              <img
                                src={deal.products[0].image}
                                alt="Product"
                                className="max-w-full max-h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-600 font-bold text-xs">
                              {dealType.substring(0, 3)}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                              {deal.title || deal.category?.name || "Promotional Deal"}
                            </p>
                            {deal.description && (
                              <p className="text-[11px] text-slate-400 line-clamp-1">
                                {deal.description}
                              </p>
                            )}
                            {deal.sellerName && (
                              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                                Seller: {deal.sellerName}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {dealType === "CATEGORY" ? (
                          <div>
                            <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                              {deal.category?.name || deal.categorySlug || "Category"}
                            </span>
                            <p className="text-[10px] text-slate-400 font-mono">
                              Slug: {deal.categorySlug || deal.category?.categoryId}
                            </p>
                          </div>
                        ) : dealType === "PRODUCT" ? (
                          <div>
                            <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                              {deal.products?.length || 0} Product(s)
                            </span>
                            <p className="text-[10px] text-slate-400 line-clamp-1">
                              {deal.products && deal.products[0]?.title}
                            </p>
                          </div>
                        ) : dealType === "ORDER" ? (
                          <div>
                            <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                              Cart Threshold
                            </span>
                            <p className="text-[10px] text-slate-400 font-mono">
                              Min: {formatINR(deal.minOrderAmount || 0)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500">
                            {deal.sellerName || "Storewide"}
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={dealType}
                          size="small"
                          sx={{
                            fontSize: "10px",
                            fontWeight: 700,
                            borderRadius: "6px",
                            ...(dealType === "PRODUCT"
                              ? { bgcolor: "#ecfdf5", color: "#047857", border: "1px solid #a7f3d0" }
                              : dealType === "CATEGORY"
                              ? { bgcolor: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }
                              : dealType === "ORDER"
                              ? { bgcolor: "#fdf4ff", color: "#a21caf", border: "1px solid #f5d0fe" }
                              : { bgcolor: "#fef3c7", color: "#b45309", border: "1px solid #fde68a" }),
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <span className="font-extrabold text-sm text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800 inline-block">
                          {deal.discountType === "FIXED_AMOUNT"
                            ? `${formatINR(deal.discountValue)} OFF`
                            : `${deal.discount || deal.discountValue || 0}% OFF`}
                        </span>
                      </TableCell>

                      <TableCell align="center">
                        <Tooltip title={deal.active ? "Click to disable" : "Click to enable"}>
                          <Switch
                            checked={deal.active !== false}
                            onChange={() => handleToggleStatus(deal.id)}
                            size="small"
                            color="primary"
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
                          onClick={() => handleOpenDelete(deal)}
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
        </>
      )}

      {/* Edit Deal Modal */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "20px",
            p: 1,
            bgcolor: "background.paper",
          },
        }}
      >
        <DialogTitle className="font-bold text-slate-900 dark:text-slate-100">
          Edit Deal Discount
        </DialogTitle>
        <DialogContent className="space-y-4 pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Target:{" "}
            <strong className="text-slate-800 dark:text-slate-200">
              {selectedDeal?.title ||
                selectedDeal?.category?.name ||
                selectedDeal?.categorySlug ||
                "Deal #" + selectedDeal?.id}
            </strong>
          </p>

          {editError && (
            <Alert severity="error" className="rounded-xl text-xs">
              {editError}
            </Alert>
          )}

          <TextField
            fullWidth
            type="number"
            label="Discount Percentage (%)"
            value={editDiscount}
            onChange={(e) => setEditDiscount(e.target.value)}
            slotProps={{
              input: { min: 1, max: 99 },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ pb: 2, px: 3 }}>
          <Button
            onClick={() => setEditDialogOpen(false)}
            color="inherit"
            sx={{ borderRadius: "10px", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            disabled={savingEdit}
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "#4f46e5",
              "&:hover": { bgcolor: "#4338ca" },
            }}
          >
            {savingEdit ? "Updating..." : "Update Discount"}
          </Button>
        </DialogActions>
      </Dialog>

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
            Are you sure you want to permanently delete &quot;
            {dealToDelete?.title || dealToDelete?.category?.name || dealToDelete?.categorySlug || `Deal #${dealToDelete?.id}`}
            &quot;? This action cannot be undone.
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