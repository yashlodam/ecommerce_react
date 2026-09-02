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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "92%", sm: 540, md: 620 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: "18px",
  boxShadow: 24,
  p: 0,
};

function Checkout() {
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentGateway, setPaymentGateway] = useState("RAZORPAY");
  const [orderError, setOrderError] = useState("");
  const [placing, setPlacing] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth, cart } = useAppSelector((store) => store);

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
    if (!selectedAddress) {
      setOrderError("Please select or add a delivery address to proceed.");
      return;
    }

    if (!cart.cart?.cartItems?.length) {
      setOrderError("Your shopping cart is empty.");
      return;
    }

    setOrderError("");
    setPlacing(true);

    try {
      const res = await dispatch(
        createOrder({
          address: selectedAddress,
          paymentGateway,
        })
      ).unwrap();

      if (paymentGateway === "COD") {
        navigate("/order-success");
      } else {
        if (res.payment_link_url) {
          window.location.href = res.payment_link_url;
        } else {
          navigate("/order-success");
        }
      }
    } catch (error) {
      const msg =
        typeof error === "string"
          ? error
          : error?.message ||
            "Failed to initiate order. Please check your cart and try again.";
      setOrderError(msg);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 min-h-[85vh]">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Secure Checkout
        </h1>
        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
          <LockOutlinedIcon fontSize="small" className="text-emerald-600" />
          256-bit SSL encrypted & authenticated payment checkout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Addresses */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="font-bold text-lg text-slate-900">
                  1. Delivery Address
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
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
                <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-2xl">
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
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div>
              <h2 className="font-bold text-lg text-slate-900">
                2. Payment Method
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Select your preferred checkout payment option.
              </p>
            </div>

            <div className="space-y-3">
              {/* Razorpay */}
              <div
                className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  paymentGateway === "RAZORPAY"
                    ? "border-teal-600 bg-teal-50/40 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setPaymentGateway("RAZORPAY")}
              >
                <div className="flex items-center gap-3">
                  <Radio
                    checked={paymentGateway === "RAZORPAY"}
                    color="primary"
                  />
                  <div>
                    <p className="font-bold text-sm text-slate-900">Razorpay</p>
                    <p className="text-xs text-slate-500">UPI, Cards, NetBanking, Wallets</p>
                  </div>
                </div>
                <CreditCardIcon className="text-teal-700" />
              </div>

              {/* Stripe */}
              <div
                className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  paymentGateway === "STRIPE"
                    ? "border-teal-600 bg-teal-50/40 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setPaymentGateway("STRIPE")}
              >
                <div className="flex items-center gap-3">
                  <Radio
                    checked={paymentGateway === "STRIPE"}
                    color="primary"
                  />
                  <div>
                    <p className="font-bold text-sm text-slate-900">Stripe International</p>
                    <p className="text-xs text-slate-500">Credit / Debit Cards (Global)</p>
                  </div>
                </div>
                <CreditCardIcon className="text-indigo-600" />
              </div>

              {/* Cash on Delivery */}
              <div
                className={`flex items-center justify-between border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  paymentGateway === "COD"
                    ? "border-teal-600 bg-teal-50/40 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => setPaymentGateway("COD")}
              >
                <div className="flex items-center gap-3">
                  <Radio
                    checked={paymentGateway === "COD"}
                    color="primary"
                  />
                  <div>
                    <p className="font-bold text-sm text-slate-900">Cash on Delivery (COD)</p>
                    <p className="text-xs text-slate-500">Pay when order is delivered</p>
                  </div>
                </div>
                <LocalAtmIcon className="text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <PricingCrd />

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
            color="primary"
            fullWidth
            size="large"
            disabled={placing}
            startIcon={
              placing ? <CircularProgress size={18} color="inherit" /> : <LockOutlinedIcon />
            }
            className="py-4 font-extrabold text-base rounded-xl shadow-lg"
            onClick={handleBuyNow}
          >
            {placing ? "Processing Order..." : `Pay & Place Order`}
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
    </div>
  );
}

export default Checkout;