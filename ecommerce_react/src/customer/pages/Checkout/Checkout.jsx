import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCrd from "../Cart/PricingCrd";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserProfile } from "../../../State/AuthSlice";
import { createOrder } from "../../../State/customer/OrderSlice";
import { fetchUserCart } from "../../../State/customer/CartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../common/toast";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 540, md: 620 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 0,
};

const loadRazorpaySDK = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function Checkout() {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { auth, cart } = useAppSelector((store) => store);

  const cartItems = cart.cart?.cartItems || [];
  const hasOutOfStockItems = cartItems.some((item) => {
    const stock = item?.product?.quantity ?? item?.product?.stock ?? 0;
    return item?.product?.inStock === false || stock <= 0;
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserCart());
  }, [dispatch]);

  // Default to first saved address if available
  useEffect(() => {
    if (!selectedAddress && auth.user?.addresses?.length > 0) {
      setSelectedAddress(auth.user.addresses[0]);
    }
  }, [auth.user, selectedAddress]);

  const handleBuyNow = async () => {
    if (hasOutOfStockItems) {
      setOrderError(
        "Your cart contains out-of-stock items. Please return to your cart and remove them before placing an order."
      );
      return;
    }
    if (!selectedAddress) {
      toast.warning("Please select a delivery address before placing your order.");
      setOrderError("Please select a delivery address before placing order.");
      return;
    }
    setOrderError("");
    setPlacing(true);

    try {
      const paymentOrder = await dispatch(
        createOrder({
          address: selectedAddress,
          paymentGateway,
        })
      ).unwrap();

      // If COD
      if (paymentGateway === "COD") {
        toast.success("Order placed successfully via Cash on Delivery! 🎉");
        dispatch(fetchUserCart());
        navigate("/order-success");
        return;
      }

      // If Razorpay online payment (Standard Popup Checkout)
      const razorpayOrderId =
        paymentOrder?.razorpayOrderId ||
        paymentOrder?.razorpay_order_id;
      const keyId =
        paymentOrder?.keyId ||
        paymentOrder?.key_id ||
        "rzp_test_TYnrwWwTwBEAv5";

      const isLoaded = await loadRazorpaySDK();

      if (razorpayOrderId && isLoaded && window.Razorpay) {
        const orderRef =
          paymentOrder?.paymentOrderId ||
          paymentOrder?.payment_order_id ||
          razorpayOrderId;

        const options = {
          key: keyId,
          amount: paymentOrder.amount, // Exact cart amount in paise (e.g. 5,129,900 for Rs. 51,299.00)
          currency: paymentOrder.currency || "INR",
          name: "ShopSphere Marketplace",
          description: `Order #${orderRef}`,
          order_id: razorpayOrderId,
          handler: function (response) {
            // Payment succeeded in Razorpay popup
            navigate(
              `/payment-success/${orderRef}?razorpay_payment_id=${response.razorpay_payment_id}&razorpay_payment_link_id=${response.razorpay_order_id}&razorpay_signature=${response.razorpay_signature || ""}`
            );
          },
          prefill: {
            name: auth.user?.fullName || "",
            email: auth.user?.email || "",
            contact: auth.user?.mobile || "",
          },
          notes: {
            address: `${selectedAddress.locality || ""}, ${selectedAddress.city || ""}, ${selectedAddress.state || ""}`,
          },
          theme: {
            color: "#0f766e", // brand teal
          },
          modal: {
            ondismiss: function () {
              setPlacing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (resp) {
          const failMsg =
            resp.error?.description ||
            "Payment could not be completed. Please try again or select Cash on Delivery.";
          setOrderError(failMsg);
          toast.error(failMsg);
          setPlacing(false);
        });

        rzp.open();
        setPlacing(false);
        return;
      }

      // Fallback: If hosted payment URL was returned
      const paymentUrl =
        paymentOrder?.paymentLinkUrl ||
        paymentOrder?.payment_link_url;

      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      const initError =
        "Unable to initialize Razorpay checkout. Please try again or select Cash on Delivery.";
      setOrderError(initError);
      toast.error(initError);
    } catch (err) {
      const errText =
        typeof err === "string" ? err : "Failed to initiate payment. Please try again.";
      setOrderError(errText);
      toast.error(errText);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-12 py-4 sm:py-8 min-h-[85vh] pb-28 md:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Secure Checkout
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Complete your order with encrypted multi-vendor checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Address Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                  1. Delivery Address
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  Choose where you want your order delivered.
                </p>
              </div>
              <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                className="font-bold text-xs rounded-xl"
              >
                Add Address
              </Button>
            </div>

            <div className="space-y-3">
              {auth.user?.addresses?.length > 0 ? (
                auth.user.addresses.map((item) => (
                  <AddressCard
                    key={item.id}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    item={item}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <p className="text-sm font-medium mb-3">
                    No saved addresses found.
                  </p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpen(true)}
                    startIcon={<AddIcon />}
                    className="font-semibold text-xs"
                  >
                    Add Delivery Address
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Payment & Summary */}
        <div className="lg:col-span-5 space-y-5 sticky top-24">
          {/* Payment Method Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 space-y-4">
            <div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-slate-100">
                2. Payment Method
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Select your preferred checkout payment option.
              </p>
            </div>

            <div className="space-y-3">
              {/* Razorpay */}
              <div
                className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  paymentGateway === "RAZORPAY"
                    ? "border-teal-600 bg-teal-50/40 dark:bg-teal-950/30 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
                onClick={() => setPaymentGateway("RAZORPAY")}
              >
                <div className="flex items-center gap-3">
                  <Radio
                    checked={paymentGateway === "RAZORPAY"}
                    color="primary"
                  />
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Razorpay</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">UPI, Cards, NetBanking, Wallets</p>
                  </div>
                </div>
                <CreditCardIcon className="text-teal-700 dark:text-teal-400" />
              </div>

              {/* Cash on Delivery */}
              <div
                className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  paymentGateway === "COD"
                    ? "border-teal-600 bg-teal-50/40 dark:bg-teal-950/30 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
                onClick={() => setPaymentGateway("COD")}
              >
                <div className="flex items-center gap-3">
                  <Radio
                    checked={paymentGateway === "COD"}
                    color="primary"
                  />
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">Cash on Delivery (COD)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Pay when order is delivered</p>
                  </div>
                </div>
                <LocalAtmIcon className="text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <PricingCrd />

          {/* Out of Stock Items Banner */}
          {hasOutOfStockItems && (
            <Alert severity="error" className="rounded-xl text-xs font-semibold">
              Some items in your cart are currently <strong>out of stock</strong>. Please{" "}
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="underline font-bold text-red-700 dark:text-red-300 ml-1 cursor-pointer bg-transparent border-0 p-0"
              >
                return to your cart
              </button>{" "}
              to remove them before completing your order.
            </Alert>
          )}

          {/* Error Banner */}
          {orderError && (
            <Alert
              severity="error"
              className="rounded-xl text-xs font-semibold"
              onClose={() => setOrderError("")}
            >
              {orderError}
            </Alert>
          )}

          {/* Place Order CTA */}
          <Button
            variant="contained"
            color={hasOutOfStockItems ? "inherit" : "primary"}
            fullWidth
            size="large"
            disabled={placing || hasOutOfStockItems}
            startIcon={
              placing ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <LockOutlinedIcon />
              )
            }
            className="py-4 font-extrabold text-base rounded-xl shadow-lg"
            onClick={handleBuyNow}
            sx={{
              ...(hasOutOfStockItems && {
                bgcolor: "action.disabledBackground",
                color: "text.disabled",
              }),
            }}
          >
            {placing
              ? paymentGateway === "RAZORPAY"
                ? "Redirecting to Razorpay..."
                : "Placing Order..."
              : hasOutOfStockItems
              ? "Cart Contains Out-of-Stock Items"
              : paymentGateway === "RAZORPAY"
              ? "Pay with Razorpay"
              : "Place Order (COD)"}
          </Button>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <AddressForm
            handleClose={() => setOpen(false)}
            onSuccess={() => {
              dispatch(fetchUserProfile());
              setOpen(false);
            }}
          />
        </Box>
      </Modal>

      {/* Sticky Bottom Place Order Bar on Mobile (< md) */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3"
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Payable:
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/60">
              {paymentGateway === "RAZORPAY" ? "Razorpay" : "COD"}
            </span>
          </div>
          <p className="text-lg font-black text-teal-700 dark:text-teal-400">
            {formatINR(cart.cart?.totalSellingPrice)}
          </p>
        </div>

        <Button
          variant="contained"
          color={hasOutOfStockItems || !selectedAddress ? "inherit" : "primary"}
          disabled={placing || hasOutOfStockItems || !selectedAddress}
          onClick={handleBuyNow}
          startIcon={
            placing ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <LockOutlinedIcon sx={{ fontSize: 16 }} />
            )
          }
          sx={{
            py: 1.2,
            px: 2.5,
            fontWeight: 800,
            borderRadius: "12px",
            fontSize: "13px",
            textTransform: "none",
            whiteSpace: "nowrap",
            boxShadow: 2,
            ...((hasOutOfStockItems || !selectedAddress) && {
              bgcolor: "action.disabledBackground",
              color: "text.disabled",
            }),
          }}
        >
          {placing
            ? paymentGateway === "RAZORPAY"
              ? "Redirecting..."
              : "Placing..."
            : !selectedAddress
            ? "Select Address"
            : hasOutOfStockItems
            ? "Fix Cart"
            : paymentGateway === "RAZORPAY"
            ? "Pay with Razorpay"
            : "Place Order (COD)"}
        </Button>
      </div>
    </div>
  );
}

export default Checkout;