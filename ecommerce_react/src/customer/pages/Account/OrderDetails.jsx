import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate, useParams } from "react-router-dom";
import { store, useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchOrderById, fetchOrderItemById } from "../../../State/customer/OrderSlice";

function OrderDetails() {
  const navigate = useNavigate();

  // PLACED | PACKED | SHIPPED | DELIVERED | CANCELLED
  const [orderStatus, setOrderStatus] = useState("SHIPPED");

  const paymentMethod = "Cash On Delivery";
  const paymentStatus = "PENDING"; // PAID | PENDING | REFUNDED

  // const orderId = "ORD-20250621001";
  const orderDate = "21 June 2026";
  const deliveryDate = "24 June 2026";

  const dispatch = useAppDispatch();
  const {orderId,orderItemId} = useParams();
  const {order} = useAppSelector(store=>store);
  console.log(order)
  useEffect(()=>{
    dispatch(fetchOrderById({orderId:Number(orderId),jwt:localStorage.getItem("jwt") || ""}))
    dispatch(fetchOrderItemById({orderItemId:Number(orderItemId),jwt:localStorage.getItem("jwt") || ""}))
  },[])

  const activeStepMap = {
    PLACED: 0,
    PACKED: 1,
    SHIPPED: 2,
    DELIVERED: 4,
  };

  const handleCancelOrder = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (confirmed) {
      setOrderStatus("CANCELLED");
    }
  };

  return (
    <Box className="space-y-6">
      {/* Product Details */}
      <section className="bg-white border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            className="w-32 h-32 object-cover rounded-xl border"
            src={order.orderItem?.product.images[0]}
            alt="Product"
          />

          <div className="flex-1">
            <h1 className="font-bold text-2xl text-gray-900">
              {order.orderItem?.product.seller.businesssDetails.businessName}
            </h1>

            <p className="text-gray-600 mt-2">
              {order.orderItem?.product.title}
            </p>

            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <p>
                <strong>Size:</strong> {order.orderItem?.size}
              </p>

              <p>
                <strong>Quantity:</strong> {}
              </p>
            </div>

            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  orderStatus === "DELIVERED"
                    ? "bg-green-100 text-green-600"
                    : orderStatus === "CANCELLED"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                {orderStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {orderStatus === "DELIVERED" && (
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={() => navigate("/reviews/5/create")}
            >
              Write Review
            </Button>
          )}

          {["PLACED", "PACKED", "SHIPPED"].includes(orderStatus) && (
            <Button
              variant="outlined"
              color="error"
              sx={{ textTransform: "none" }}
              onClick={handleCancelOrder}
            >
              Cancel Order
            </Button>
          )}
        </div>
      </section>

      {/* Order Tracking */}
      <section className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-1">
          Order Tracking
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Track your shipment status
        </p>

        {orderStatus === "CANCELLED" ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="font-semibold text-red-600">
              Order Cancelled
            </h3>

            <p className="text-red-500 mt-2">
              Your order has been cancelled successfully.
            </p>
          </div>
        ) : (
          <Stepper
            activeStep={activeStepMap[orderStatus]}
            orientation="vertical"
          >
            <Step completed>
              <StepLabel>
                Order Placed
              </StepLabel>
            </Step>

            <Step completed>
              <StepLabel>
                Packed
              </StepLabel>
            </Step>

            <Step>
              <StepLabel>
                Shipped
              </StepLabel>
            </Step>

            <Step>
              <StepLabel>
                Out For Delivery
              </StepLabel>
            </Step>

            <Step>
              <StepLabel>
                Delivered
              </StepLabel>
            </Step>
          </Stepper>
        )}
      </section>

      {/* Order Information */}
      <section className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-5">
          Order Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-gray-500">
              Order ID
            </p>
            <p className="font-medium">
              {orderId}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Order Date
            </p>
            <p className="font-medium">
              {orderDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Payment Method
            </p>
            <p className="font-medium">
              {paymentMethod}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Payment Status
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                paymentStatus === "PAID"
                  ? "bg-green-100 text-green-600"
                  : paymentStatus === "REFUNDED"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {paymentStatus}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Expected Delivery
            </p>
            <p className="font-medium">
              {deliveryDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Order Status
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                orderStatus === "DELIVERED"
                  ? "bg-green-100 text-green-600"
                  : orderStatus === "CANCELLED"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {orderStatus}
            </span>
          </div>
        </div>
      </section>

      {/* Delivery Address */}
      <section className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Delivery Address
        </h2>

        <div className="space-y-2 text-gray-600">
          <p className="font-semibold text-gray-900">
            {order.currentOrder?.shippingAddress.name}
          </p>

          <p>
            {order.currentOrder?.shippingAddress.address,order.currentOrder?.shippingAddress.city,order.currentOrder?.shippingAddress.state,-,order.currentOrder?.shippingAddress.pinCode}
          </p>

          <p>
            Phone: +91 9876543210
          </p>
        </div>
      </section>

      {/* Payment Summary */}
      <section className="bg-white border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Payment Summary
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">
              MRP
            </span>
            <span>₹{order.orderItem?.mrpPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Discount
            </span>
            <span className="text-green-600">
              -₹{order.orderItem?.mrpPrice-order.orderItem?.sellingPrice}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">
              Delivery Charges
            </span>
            <span className="text-green-600">
              FREE
            </span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-bold">
            <span>Total Amount</span>
            <span>₹{order.orderItem?.sellingPrice}</span>
          </div>
        </div>
      </section>
    </Box>
  );
}

export default OrderDetails;