import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  fetchOrderById,
  fetchOrderItemById,
  cancelOrder,
} from "../../../State/customer/OrderSlice";
import StatusBadge from "../../../common/StatusBadge";

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
  const { order } = useAppSelector((store) => store);

  const [cancelling, setCancelling] = useState(false);
  const [actionMsg, setActionMsg] = useState("");

  const currentOrder = order?.currentOrder;
  const orderItem = order?.orderItem;
  const isLoading = order?.loading;

  useEffect(() => {
    if (orderId) {
      dispatch(
        fetchOrderById({
          orderId: Number(orderId),
          jwt: localStorage.getItem("jwt") || "",
        })
      );
    }
    if (orderItemId) {
      dispatch(
        fetchOrderItemById({
          orderItemId: Number(orderItemId),
          jwt: localStorage.getItem("jwt") || "",
        })
      );
    }
  }, [orderId, orderItemId, dispatch]);

  const activeStepMap = {
    PLACED: 0,
    CONFIRMED: 1,
    SHIPPED: 2,
    DELIVERED: 3,
    CANCELLED: -1,
  };

  const orderStatus = currentOrder?.orderStatus || "PLACED";
  const currentStep = activeStepMap[orderStatus] ?? 0;

  const handleCancelOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order? This action cannot be undone."
    );
    if (!confirmed) return;

    setCancelling(true);
    try {
      await dispatch(
        cancelOrder({
          orderId: Number(orderId),
          jwt: localStorage.getItem("jwt") || "",
        })
      ).unwrap();
      setActionMsg("Order has been successfully cancelled.");
    } catch (err) {
      setActionMsg(
        typeof err === "string" ? err : "Failed to cancel order. Please contact support."
      );
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

  const product = orderItem?.product;
  const sellerName =
    product?.seller?.businessDetails?.businessName ||
    product?.seller?.businesssDetails?.businessName ||
    product?.brand ||
    "Verified Marketplace Seller";

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {actionMsg && (
        <Alert severity="info" onClose={() => setActionMsg("")} className="rounded-xl">
          {actionMsg}
        </Alert>
      )}

      {/* Header breadcrumb & back */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <button
            onClick={() => navigate("/account/orders")}
            className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline mb-1 inline-block"
          >
            ← Back to Orders
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Order #{currentOrder?.orderId || orderId}
          </h1>
        </div>
        <StatusBadge status={orderStatus} />
      </div>

      {/* Product Information Card */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shrink-0 flex items-center justify-center p-2">
            <img
              className="max-w-full max-h-full object-contain"
              src={product?.images?.[0] || "https://placehold.co/150x150?text=Item"}
              alt={product?.title || "Product"}
            />
          </div>

          <div className="flex-1 space-y-2 min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-0.5 rounded-full inline-block border border-teal-100 dark:border-teal-800">
              {sellerName}
            </span>

            <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-snug">
              {product?.title}
            </h2>

            <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
              <p>
                <strong>Size:</strong> <span className="text-slate-800 dark:text-slate-200">{orderItem?.size || "Standard"}</span>
              </p>
              <p>
                <strong>Quantity:</strong> <span className="text-slate-800 dark:text-slate-200">{orderItem?.quantity || 1}</span>
              </p>
              <p>
                <strong>Item Price:</strong> <span className="text-slate-800 dark:text-slate-200 font-bold">{formatINR(orderItem?.sellingPrice)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          {orderStatus === "DELIVERED" && product?.id && (
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none" }}
              onClick={() => navigate(`/reviews/${product.id}/create`)}
            >
              Write Product Review
            </Button>
          )}

          {["PLACED", "CONFIRMED"].includes(orderStatus) && (
            <Button
              variant="outlined"
              color="error"
              disabled={cancelling}
              sx={{ borderRadius: "10px", fontWeight: 700, textTransform: "none" }}
              onClick={handleCancelOrder}
            >
              {cancelling ? "Cancelling..." : "Cancel Order"}
            </Button>
          )}
        </div>
      </section>

      {/* Order Tracking Stepper */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
          Shipment Progress
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Real-time tracking for this package
        </p>

        {orderStatus === "CANCELLED" ? (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl p-5">
            <h3 className="font-bold text-rose-700 dark:text-rose-400 text-sm">Order Cancelled</h3>
            <p className="text-xs text-rose-600 dark:text-rose-300 mt-1">
              This order has been cancelled and any paid balance has been refunded.
            </p>
          </div>
        ) : (
          <div className="py-4">
            <Stepper activeStep={currentStep} alternativeLabel>
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
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
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
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {currentOrder?.paymentDetails?.status || "COMPLETED"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Total Order Amount:</span>
              <span className="font-extrabold text-slate-900 dark:text-slate-100">
                {formatINR(currentOrder?.totalSellingPrice)}
              </span>
            </div>
          </div>
        </section>

        {/* Delivery Address */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
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
    </div>
  );
}

export default OrderDetails;