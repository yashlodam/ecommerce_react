import React from "react";
import Divider from "@mui/material/Divider";
import { useAppSelector } from "../../../State/Store";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function PricingCrd() {
  const cart = useAppSelector((store) => store.cart);
  const currentCart = cart?.cart;

  const totalMrp = currentCart?.totalMrpPrice || 0;
  const totalSelling = currentCart?.totalSellingPrice || 0;
  const totalDiscount = Math.max(0, totalMrp - totalSelling);
  const couponDiscount = currentCart?.couponPrice || 0;
  const finalPayable = currentCart?.totalSellingPrice || 0;
  const totalItems = currentCart?.totalItem || 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-5 space-y-4">
      <h2 className="font-bold text-base text-slate-900 dark:text-slate-100">
        Order Price Summary
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Bag MRP ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">{formatINR(totalMrp)}</span>
        </div>

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Retail Discount</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            - {formatINR(totalDiscount)}
          </span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Coupon Savings</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              - {formatINR(couponDiscount)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Delivery Fee</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-xs tracking-wider">
            Free
          </span>
        </div>

        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Convenience Fee</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase text-xs tracking-wider">
            Free
          </span>
        </div>
      </div>

      <Divider className="!my-3" />

      <div className="flex justify-between items-baseline font-extrabold text-slate-900 dark:text-slate-100 text-lg">
        <span>Total Payable</span>
        <span className="text-xl text-teal-700 dark:text-teal-400">{formatINR(finalPayable)}</span>
      </div>

      {totalDiscount > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-2.5 text-center space-y-0.5 border border-emerald-200/60 dark:border-emerald-800/40">
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
            🎉 You are saving {formatINR(totalDiscount + couponDiscount)} on this order
          </p>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            Best promotional deals & discounts applied automatically
          </p>
        </div>
      )}
    </div>
  );
}

export default PricingCrd;