import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { useAppDispatch } from "../State/Store";
import { paymentSuccess } from "../State/customer/OrderSlice";
import { fetchUserCart } from "../State/customer/CartSlice";

function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const getQueryParam = (key) => {
    return new URLSearchParams(location.search).get(key);
  };

  useEffect(() => {
    const paymentId = getQueryParam("razorpay_payment_id");
    const paymentLinkId = getQueryParam("razorpay_payment_link_id");

    if (!paymentId || !paymentLinkId) return;

    const confirm = async () => {
      try {
        await dispatch(paymentSuccess({ paymentId, paymentLinkId })).unwrap();
        dispatch(fetchUserCart());
      } catch {
        // Handled silently
      }
    };

    confirm();
  }, [dispatch, location.search]);

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
            Payment Successful! 🎉
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Your payment was processed and verified by the merchant gateway.
          </p>
        </div>

        {/* Confirmation box */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 text-left space-y-1">
          <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
            Order Confirmed & Sent to Sellers
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            Vendors have been notified for order fulfillment. You can track live shipment progress in your account orders page.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<ShoppingBagOutlinedIcon />}
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

          <Button
            fullWidth
            variant="outlined"
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
            View My Orders
          </Button>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 pt-2">
          Thank you for choosing ShopSphere Multi-Vendor Marketplace ❤️
        </p>
      </div>
    </div>
  );
}

export default PaymentSuccess;