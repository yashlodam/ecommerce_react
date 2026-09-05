import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../../common/StatusBadge";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function OrderItem({ item, order }) {
  const navigate = useNavigate();

  const sellerName =
    item.product?.seller?.businessDetails?.businessName ||
    item.product?.seller?.businesssDetails?.businessName ||
    item.product?.brand ||
    "Verified Marketplace Seller";

  const arrivalDate = order.deliverDate
    ? new Date(order.deliverDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "3-5 Business Days";

  return (
    <div
      onClick={() => navigate(`/account/order/${order.id}/${item.id}`)}
      className="border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg hover:border-teal-500/50 transition-all duration-300 cursor-pointer"
    >
      {/* Order Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shrink-0">
            <LocalShippingIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Order #{order.orderId || order.id}
              </span>
              <StatusBadge status={order.orderStatus} />
            </div>
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
          Estimated: <strong className="text-slate-700 dark:text-slate-200">{arrivalDate}</strong>
        </p>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-5">
        <div className="flex gap-3 sm:gap-4 items-start sm:items-center">
          {/* Image */}
          <div className="w-18 h-18 sm:w-24 sm:h-24 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 p-1.5 sm:p-2 shrink-0 flex items-center justify-center">
            <img
              src={item.product?.images?.[0] || "https://placehold.co/100x100?text=Item"}
              alt={item.product?.title || "Product"}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              {sellerName}
            </span>

            <h3 className="font-bold text-xs sm:text-base text-slate-900 dark:text-slate-100 truncate">
              {item.product?.title || "Marketplace Product"}
            </h3>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
              <span>Size: <strong className="text-slate-800 dark:text-slate-200">{item.size || item.product?.sizes || "Standard"}</strong></span>
              <span>Qty: <strong className="text-slate-800 dark:text-slate-200">{item.quantity}</strong></span>
              <span>Total: <strong className="text-teal-700 dark:text-teal-400 font-extrabold">{formatINR(item.sellingPrice * (item.quantity || 1))}</strong></span>
            </div>

            {item.appliedDealTitle && (
              <p className="text-[10px] sm:text-[11px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 pt-0.5">
                <span>🔥</span>
                <span>Deal Applied: {item.appliedDealTitle}</span>
                {item.discountAmount > 0 && (
                  <span className="text-slate-500 font-normal">(-{formatINR(item.discountAmount)})</span>
                )}
              </p>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          {order.orderStatus === "CANCELLED" ? (
            <span className="text-[11px] sm:text-xs font-semibold text-rose-600 dark:text-rose-400">
              Order Cancelled • Refund Issued
            </span>
          ) : ["PENDING", "PLACED", "CONFIRMED"].includes(order.orderStatus) ? (
            <span className="text-[11px] sm:text-xs text-slate-400">
              Eligible for cancellation before shipment
            </span>
          ) : (
            <span className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Shipment In Progress
            </span>
          )}

          <div className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300">
            <span>View Details & Tracking</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;