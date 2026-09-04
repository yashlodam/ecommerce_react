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
  DialogContent,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllCoupons, deleteCoupon } from "../../../State/customer/CouponSlice";
import AddNewCouponForm from "./AddNewCouponForm";
import EmptyState from "../../../common/EmptyState";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function Coupon() {
  const dispatch = useAppDispatch();
  const coupon = useAppSelector((store) => store.coupon);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCoupons());
  }, [dispatch]);

  const coupons = coupon?.coupons || [];
  const isLoading = coupon?.loading;

  const handleDeleteCoupon = (couponId) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteCoupon(couponId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Promotional Coupons
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage marketplace discount codes, minimum order requirements, and validity dates.
          </p>
        </div>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddModal(true)}
          sx={{
            borderRadius: "12px",
            fontWeight: 700,
            textTransform: "none",
            px: 2.5,
          }}
        >
          Add Coupon
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <CircularProgress color="primary" />
        </div>
      ) : coupons.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-8 transition-colors">
          <EmptyState
            icon={LocalOfferOutlinedIcon}
            title="No coupons created"
            description="Create promotional coupon vouchers to incentivize customers at checkout."
            actionText="Create First Coupon"
            onAction={() => setOpenAddModal(true)}
          />
        </div>
      ) : (
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
          <Table sx={{ minWidth: 750 }}>
            <TableHead className="bg-slate-50 dark:bg-slate-950/60">
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Discount (%)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Valid Period</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Min Order Value</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {coupons.map((c) => {
                const isExpired =
                  c.validityEndDate && new Date(c.validityEndDate) < new Date();

                return (
                  <TableRow key={c.id} hover className="transition-colors">
                    <TableCell>
                      <span className="font-mono font-bold text-sm bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-lg">
                        {c.code}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                        {c.discountPercentage}% OFF
                      </span>
                    </TableCell>

                    <TableCell className="text-xs text-slate-600 dark:text-slate-300">
                      {c.validityStartDate
                        ? new Date(c.validityStartDate).toLocaleDateString("en-IN")
                        : "Now"}{" "}
                      —{" "}
                      {c.validityEndDate
                        ? new Date(c.validityEndDate).toLocaleDateString("en-IN")
                        : "Ongoing"}
                    </TableCell>

                    <TableCell align="right" className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {formatINR(c.minimumOrderValue)}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={isExpired ? "Expired" : "Active"}
                        size="small"
                        color={isExpired ? "error" : "success"}
                        className="font-bold text-xs"
                      />
                    </TableCell>

                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteCoupon(c.id)}
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

      {/* Add Coupon Dialog */}
      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: "20px", bgcolor: "background.paper" },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <AddNewCouponForm
            handleClose={() => setOpenAddModal(false)}
            onSuccess={() => dispatch(fetchAllCoupons())}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Coupon;