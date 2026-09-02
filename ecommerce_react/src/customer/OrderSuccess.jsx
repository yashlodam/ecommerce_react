import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex justify-center items-center px-4 py-12 transition-colors duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 w-full max-w-lg p-8 text-center space-y-6 transition-colors">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircleRoundedIcon sx={{ fontSize: 60 }} />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Thank you for shopping on ShopSphere Marketplace.
          </p>
        </div>

        {/* Confirmation Details box */}
        <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 text-left space-y-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <ShoppingBagRoundedIcon sx={{ fontSize: 18 }} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Payment Option</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Pay on Delivery / Online Verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <LocalShippingRoundedIcon sx={{ fontSize: 18 }} />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Estimated Delivery</p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">3 — 5 Business Days</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<ReceiptLongOutlinedIcon />}
            sx={{
              py: 1.4,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
            }}
            onClick={() => navigate("/account/orders")}
          >
            Track My Orders
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              py: 1.4,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 700,
              fontSize: "14px",
            }}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 pt-2">
          Thank you for choosing ShopSphere Multi-Vendor Marketplace ❤️
        </p>
      </div>
    </div>
  );
}

export default OrderSuccess;