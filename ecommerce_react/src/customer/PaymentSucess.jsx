import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { useAppDispatch } from "../State/Store";
import { paymentSuccess } from "../State/customer/OrderSlice";
import { fetchUserCart } from "../State/customer/CartSlice";
import { toast } from "../common/toast";

function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { orderId } = useParams();

  const [verifyStatus, setVerifyStatus] = useState("loading"); // 'loading' | 'success' | 'failed' | 'direct'
  const [errorMessage, setErrorMessage] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const paymentId =
    queryParams.get("razorpay_payment_id") ||
    queryParams.get("payment_id");
  const paymentLinkId =
    queryParams.get("razorpay_payment_link_id") ||
    queryParams.get("payment_link_id");

  useEffect(() => {
    // If no payment params in URL
    if (!paymentId || !paymentLinkId) {
      setVerifyStatus("direct");
      return;
    }

    let isMounted = true;

    const verifyTransaction = async () => {
      setVerifyStatus("loading");
      setErrorMessage("");

      try {
        await dispatch(
          paymentSuccess({
            paymentId,
            paymentLinkId,
          })
        ).unwrap();

        if (isMounted) {
          setVerifyStatus("success");
          toast.success("Payment verified successfully! Your order is confirmed.");
          dispatch(fetchUserCart());
        }
      } catch (err) {
        if (isMounted) {
          // If already processed or verified, treat as success
          const errStr = typeof err === "string" ? err : err?.message || "";
          if (
            errStr.toLowerCase().includes("already processed") ||
            errStr.toLowerCase().includes("success")
          ) {
            setVerifyStatus("success");
            toast.success("Payment verified successfully! Your order is confirmed.");
            dispatch(fetchUserCart());
          } else {
            setVerifyStatus("failed");
            const failText =
              errStr ||
              "Unable to verify transaction with payment gateway. Please check your order history.";
            setErrorMessage(failText);
            toast.error(failText);
          }
        }
      }
    };

    verifyTransaction();

    return () => {
      isMounted = false;
    };
  }, [dispatch, paymentId, paymentLinkId]);

  const handleRetryVerification = async () => {
    if (!paymentId || !paymentLinkId) return;
    setVerifyStatus("loading");
    try {
      await dispatch(
        paymentSuccess({
          paymentId,
          paymentLinkId,
        })
      ).unwrap();
      setVerifyStatus("success");
      dispatch(fetchUserCart());
    } catch (err) {
      setVerifyStatus("failed");
      setErrorMessage(
        typeof err === "string"
          ? err
          : "Verification retry failed. Please check your orders."
      );
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex justify-center items-center px-4 py-12 transition-colors duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 w-full max-w-lg p-8 text-center space-y-6 transition-colors">
        {/* State 1: Loading Verification */}
        {verifyStatus === "loading" && (
          <div className="py-8 space-y-6">
            <div className="flex justify-center">
              <CircularProgress size={56} thickness={4} color="primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                Verifying Payment with Razorpay...
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Please wait a moment while we confirm your transaction with the merchant gateway. Do not refresh or close this tab.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              <VerifiedUserOutlinedIcon sx={{ fontSize: 16 }} className="text-teal-600 dark:text-teal-400" />
              Secure 256-bit Encrypted Verification
            </div>
          </div>
        )}

        {/* State 2: Payment Verified / Success */}
        {verifyStatus === "success" && (
          <>
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
                Your payment was verified and your order has been confirmed.
              </p>
            </div>

            {/* Payment & Order Meta */}
            <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 text-left space-y-2 text-xs">
              {paymentId && (
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-800/60">
                  <span className="text-slate-400 font-medium">Payment ID</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                    {paymentId}
                  </span>
                </div>
              )}
              {orderId && (
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 dark:border-slate-800/60">
                  <span className="text-slate-400 font-medium">Order Reference</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {orderId}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400 font-medium">Gateway</span>
                <span className="inline-flex items-center gap-1 font-bold text-teal-700 dark:text-teal-400">
                  <VerifiedUserOutlinedIcon sx={{ fontSize: 15 }} />
                  Razorpay Verified
                </span>
              </div>
            </div>

            {/* Confirmation box */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 text-left space-y-1">
              <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                Order Confirmed & Sent to Sellers
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                Sellers have received your order and are preparing shipment. You can track live fulfillment in your account.
              </p>
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
            </div>
          </>
        )}

        {/* State 3: Payment Verification Failed */}
        {verifyStatus === "failed" && (
          <>
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <ErrorOutlineRoundedIcon sx={{ fontSize: 60 }} />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                Verification Pending or Incomplete
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {errorMessage ||
                  "We could not confirm the payment status with Razorpay at this moment."}
              </p>
            </div>

            {/* Reassurance Notice */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 text-left space-y-1.5 text-xs text-amber-900 dark:text-amber-300">
              <p className="font-bold text-sm">Was your card or account debited?</p>
              <p className="text-amber-800/90 dark:text-amber-400/90">
                Don't worry — if money was deducted, your bank or Razorpay will either complete the order automatically or refund the entire amount within 3-5 business days.
              </p>
              {paymentId && (
                <p className="pt-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  Ref: {paymentId}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<ReplayRoundedIcon />}
                sx={{
                  py: 1.4,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
                onClick={handleRetryVerification}
              >
                Retry Verification
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
                Check My Orders
              </Button>
            </div>
          </>
        )}

        {/* State 4: Direct Access / No URL Parameters */}
        {verifyStatus === "direct" && (
          <>
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full bg-teal-100 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <ReceiptLongOutlinedIcon sx={{ fontSize: 50 }} />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                Order & Payment Status
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                You can review payment confirmations, active shipments, and invoices directly from your orders dashboard.
              </p>
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
                Go to My Orders
              </Button>

              <Button
                fullWidth
                variant="outlined"
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
            </div>
          </>
        )}

        <p className="text-xs text-slate-400 dark:text-slate-500 pt-2">
          Thank you for choosing ShopSphere Multi-Vendor Marketplace ❤️
        </p>
      </div>
    </div>
  );
}

export default PaymentSuccess;