import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 flex justify-center items-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 text-center animate-fade-in">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
            <CheckCircleRoundedIcon
              sx={{ fontSize: 70 }}
              className="text-green-600"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-gray-800 mt-6">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Thank you for your purchase.
        </p>

        <p className="text-gray-600 mt-2">
          Your order has been placed successfully and is now being processed.
        </p>

        {/* Order Status */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-5">
          <h2 className="font-semibold text-green-700 text-lg">
            Order Confirmed
          </h2>

          <p className="text-gray-600 mt-2 text-sm">
            You'll receive an email and SMS confirmation shortly.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          <Button
            fullWidth
            variant="contained"
            startIcon={<ShoppingBagOutlinedIcon />}
            sx={{
              bgcolor: "#111827",
              py: 1.4,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",
              "&:hover": {
                bgcolor: "#000",
              },
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
              borderRadius: "12px",
              textTransform: "none",
              fontSize: "16px",
            }}
            onClick={() => navigate("/account/orders")}
          >
            View Orders
          </Button>

        </div>

        {/* Footer */}
        <p className="mt-8 text-gray-400 text-sm">
          Thank you for shopping with us ❤️
        </p>

      </div>

    </div>
  );
}

export default PaymentSuccess;