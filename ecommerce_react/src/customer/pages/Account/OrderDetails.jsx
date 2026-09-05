import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchOrderById,
  fetchOrderItemById,
  cancelOrder,
} from "../../../State/customer/OrderSlice";
import StatusBadge from "../../../common/StatusBadge";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function OrderDetails() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { orderId, orderItemId } = useParams();
  const order = useAppSelector((store) => store.order);

  const [cancelling, setCancelling] = useState(false);
  const [actionMsg, setActionMsg] = useState({ type: "", text: "" });
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const currentOrder = order?.currentOrder;
  const orderItem = order?.orderItem;
  const isLoading = order?.loading;

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderById(Number(orderId)));
    }
    if (orderItemId) {
      dispatch(fetchOrderItemById(Number(orderItemId)));
    }
  }, [orderId, orderItemId, dispatch]);

  const activeStepMap = {
    PENDING: 0,
    PLACED: 0,
    CONFIRMED: 1,
    SHIPPED: 2,
    DELIVERED: 3,
    CANCELLED: -1,
  };

  const orderStatus = currentOrder?.orderStatus || "PLACED";
  const currentStep = activeStepMap[orderStatus] ?? 0;

  // Safe fallback to locate item even if orderItem API request hasn't finished
  const activeItem =
    orderItem ||
    currentOrder?.orderItems?.find(
      (i) => String(i.id) === String(orderItemId)
    ) ||
    currentOrder?.orderItems?.[0];

  const handleCancelOrder = async () => {
    setCancelling(true);
    setActionMsg({ type: "", text: "" });
    try {
      await dispatch(cancelOrder(Number(orderId))).unwrap();
      setActionMsg({
        type: "success",
        text: "Order has been successfully cancelled. Any reserved inventory has been restored.",
      });
      setOpenCancelDialog(false);
      dispatch(fetchOrderById(Number(orderId)));
    } catch (err) {
      setActionMsg({
        type: "error",
        text:
          typeof err === "string"
            ? err
            : "Failed to cancel order. Please contact customer support.",
      });
      setOpenCancelDialog(false);
    } finally {
      setCancelling(false);
    }
  };

  if (isLoading && !currentOrder) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <CircularProgress color="primary" />
      </div>
    );
  }

  const product = activeItem?.product;
  const sellerName =
    product?.seller?.businessDetails?.businessName ||
    product?.seller?.businesssDetails?.businessName ||
    product?.brand ||
    "Verified Marketplace Seller";

  const isCancellable = ["PENDING", "PLACED", "CONFIRMED"].includes(orderStatus);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 px-4 py-6">
      {actionMsg.text && (
        <Alert
          severity={actionMsg.type === "success" ? "success" : "error"}
          onClose={() => setActionMsg({ type: "", text: "" })}
          className="rounded-2xl shadow-sm"
          icon={
            actionMsg.type === "success" ? (
              <CheckCircleRoundedIcon />
            ) : (
              <CancelOutlinedIcon />
            )
          }
        >
          {actionMsg.text}
        </Alert>
      )}

      {/* Header breadcrumb & back */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <button
            onClick={() => navigate("/account/orders")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline mb-1.5 cursor-pointer"
          >
            <ArrowBackIcon sx={{ fontSize: 14 }} />
            <span>Back to Orders</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Order #{currentOrder?.orderId || orderId}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={orderStatus} />
          {isCancellable && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => setOpenCancelDialog(true)}
              sx={{
                borderRadius: "12px",
                fontWeight: 700,
                textTransform: "none",
                fontSize: "12px",
                px: 2,
              }}
            >
              Cancel Order
            </Button>
          )}
        </div>
      </div>

      {/* Product Information Card */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
          <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shrink-0 flex items-center justify-center p-2">
            <img
              className="max-w-full max-h-full object-contain"
              src={product?.images?.[0] || "https://placehold.co/150x150?text=Item"}
              alt={product?.title || "Product"}
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/150x150?text=Item";
              }}
            />
          </div>

          <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2 sm:px-2.5 py-0.5 rounded-full inline-block border border-teal-100 dark:border-teal-800">
              {sellerName}
            </span>

            <h2 className="font-bold text-sm sm:text-lg text-slate-900 dark:text-slate-100 leading-snug">
              {product?.title || "Marketplace Product"}
            </h2>

            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
              <p>
                <strong>Size:</strong>{" "}
                <span className="text-slate-800 dark:text-slate-200">
                  {activeItem?.size || product?.sizes || "Standard"}
                </span>
              </p>
              <p>
                <strong>Quantity:</strong>{" "}
                <span className="text-slate-800 dark:text-slate-200">
                  {activeItem?.quantity || 1}
                </span>
              </p>
              <p>
                <strong>Item Price:</strong>{" "}
                <span className="text-slate-800 dark:text-slate-200 font-bold">
                  {formatINR(activeItem?.sellingPrice)}
                </span>
              </p>
            </div>

            {activeItem?.appliedDealTitle && (
              <p className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 pt-1">
                <span>🔥</span>
                <span>Promotional Deal: {activeItem.appliedDealTitle}</span>
                {activeItem.discountAmount > 0 && (
                  <span className="text-slate-500 font-normal">
                    (-{formatINR(activeItem.discountAmount)} discount)
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 dark:border-slate-800">
          {orderStatus === "DELIVERED" && product?.id && (
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "12px", fontWeight: 700, textTransform: "none" }}
              onClick={() => navigate(`/reviews/${product.id}/create`)}
            >
              Write Product Review
            </Button>
          )}

          {isCancellable && (
            <Button
              variant="outlined"
              color="error"
              disabled={cancelling}
              sx={{ borderRadius: "12px", fontWeight: 700, textTransform: "none" }}
              onClick={() => setOpenCancelDialog(true)}
            >
              Cancel Order
            </Button>
          )}

          {orderStatus === "CANCELLED" && (
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 inline-flex items-center gap-1.5">
              <CancelOutlinedIcon sx={{ fontSize: 16 }} />
              <span>Cancelled</span>
            </span>
          )}
        </div>
      </section>

      {/* Order Tracking Stepper */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mb-0.5">
          Shipment Progress
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 sm:mb-6">
          Real-time tracking for this package
        </p>

        {orderStatus === "CANCELLED" ? (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl p-4 sm:p-5">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 text-sm">
              Order Cancelled
            </h3>
            <p className="text-xs text-rose-600 dark:text-rose-300 mt-1">
              This order has been cancelled and any reserved inventory has been restored. If paid online, the refund will be credited to your original payment method.
            </p>
          </div>
        ) : (
          <div className="py-2 sm:py-4">
            <Stepper
              activeStep={currentStep}
              alternativeLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: { xs: "10px", sm: "13px" },
                  fontWeight: 600,
                  mt: 0.5,
                },
                "& .MuiStepIcon-root": {
                  fontSize: { xs: "20px", sm: "24px" },
                },
              }}
            >
              <Step completed={currentStep >= 0}>
                <StepLabel>Order Placed</StepLabel>
              </Step>
              <Step completed={currentStep >= 1}>
                <StepLabel>Confirmed</StepLabel>
              </Step>
              <Step completed={currentStep >= 2}>
                <StepLabel>Shipped</StepLabel>
              </Step>
              <Step completed={currentStep >= 3}>
                <StepLabel>Delivered</StepLabel>
              </Step>
            </Stepper>
          </div>
        )}
      </section>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Information */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Order & Payment Meta
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Order Placed On:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {currentOrder?.orderDate
                  ? new Date(currentOrder.orderDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Payment Status:</span>
              <span
                className={`font-bold ${
                  currentOrder?.paymentStatus === "COMPLETED"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : currentOrder?.paymentStatus === "FAILED"
                    ? "text-rose-600 dark:text-rose-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {currentOrder?.paymentStatus || "PENDING"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Total Items:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {currentOrder?.totalItems || activeItem?.quantity || 1}
              </span>
            </div>

            <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-2">
              <span className="text-slate-500 dark:text-slate-400">Total Order Amount:</span>
              <span className="font-extrabold text-teal-700 dark:text-teal-400 text-base">
                {formatINR(currentOrder?.totalSellingPrice)}
              </span>
            </div>
          </div>
        </section>

        {/* Delivery Address */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Shipping Address
          </h2>

          <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <p className="font-bold text-slate-900 dark:text-slate-100">
              {currentOrder?.shippingAddress?.name || "Customer"}
            </p>
            <p>
              {currentOrder?.shippingAddress?.address || "Address"}
            </p>
            <p>
              {currentOrder?.shippingAddress?.city}, {currentOrder?.shippingAddress?.state} -{" "}
              {currentOrder?.shippingAddress?.pinCode}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
              Contact Phone: {currentOrder?.shippingAddress?.mobile || "N/A"}
            </p>
          </div>
        </section>
      </div>

      {/* Confirmation Dialog for Cancellation */}
      <Dialog
        open={openCancelDialog}
        onClose={() => !cancelling && setOpenCancelDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: "24px",
            p: 1.5,
            maxWidth: 440,
            width: "100%",
            bgcolor: "background.paper",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "1.2rem" }}>
          Cancel Order #{currentOrder?.orderId || orderId}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            Are you sure you want to cancel this order?
            Any reserved product stock will immediately be restored.
            If you paid online via Razorpay or Stripe, the refund will be processed to your original payment method.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => setOpenCancelDialog(false)}
            disabled={cancelling}
            sx={{
              borderRadius: "12px",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Keep Order
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleCancelOrder}
            disabled={cancelling}
            sx={{
              borderRadius: "12px",
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            {cancelling ? "Cancelling..." : "Yes, Cancel Order"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OrderDetails;