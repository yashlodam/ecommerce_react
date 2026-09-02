import React, { useEffect } from "react";
import OrderItem from "./OrderItem";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserOrderHistory } from "../../../State/customer/OrderSlice";
import EmptyState from "../../../common/EmptyState";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Order() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { order } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt")));
  }, [dispatch]);

  const orders = order?.orders || [];
  const isLoading = order?.loading;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Order History
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track packages, check shipment status, and initiate returns.
          </p>
        </div>

        <div className="bg-teal-50 dark:bg-teal-950/40 px-4 py-2 rounded-xl border border-teal-100 dark:border-teal-900/40 shrink-0 self-start sm:self-auto">
          <p className="text-[11px] font-bold uppercase text-teal-700 dark:text-teal-400">Total Orders</p>
          <h3 className="text-xl font-extrabold text-teal-800 dark:text-teal-300">
            {orders.length}
          </h3>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <CircularProgress color="primary" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8">
          <EmptyState
            icon={ReceiptLongOutlinedIcon}
            title="No orders yet"
            description="You haven't placed any orders yet. Start exploring our verified sellers marketplace!"
            actionText="Start Shopping"
            onAction={() => navigate("/")}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((singleOrder) =>
            singleOrder?.orderItems?.map((item) => (
              <OrderItem
                key={`${singleOrder.id}-${item.id}`}
                item={item}
                order={singleOrder}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Order;