import React, { useEffect } from "react";
import Transaction from "./Transaction";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchTransactionsBySeller } from "../../../State/seller/transactionSlice";
import { IndianRupee, Receipt, ArrowUpRight } from "lucide-react";

function formatINR(val) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(val || 0);
}

function Payment() {
  const dispatch = useAppDispatch();
  const transactionState = useAppSelector((store) => store.transaction);
  const transactions = transactionState?.transactions || [];

  useEffect(() => {
    dispatch(fetchTransactionsBySeller());
  }, [dispatch]);

  const transactionList = Array.isArray(transactions) ? transactions : [];

  const totalEarning = transactionList.reduce(
    (sum, item) => sum + (item.order?.totalSellingPrice || 0),
    0
  );

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Payouts & Financials
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Review your gross earnings, processed transactions, and payout settlements.
        </p>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Gross Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <IndianRupee size={18} />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-3 tabular-nums">
            {formatINR(totalEarning)}
          </h2>
          <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-2 flex items-center gap-1">
            <ArrowUpRight size={14} /> Direct store earnings
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Settled Orders</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Receipt size={18} />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-3 tabular-nums">
            {transactions.length}
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            Completed transactions recorded
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Transaction Records
        </h2>
        <Transaction />
      </div>
    </div>
  );
}

export default Payment;