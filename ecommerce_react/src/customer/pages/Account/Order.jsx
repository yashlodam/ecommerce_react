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
    <div className="min-h-[80vh] bg-slate-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My Orders
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track shipments, manage returns, and review past purchases.
          </p>
        </div>

        <div className="bg-teal-50 px-5 py-2.5 rounded-xl border border-teal-100 shrink-0">
          <p className="text-xs font-semibold uppercase text-teal-700">Total Orders</p>
          <h2 className="text-2xl font-extrabold text-teal-800">
            {orders.length}
          </h2>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <CircularProgress color="primary" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <EmptyState
            icon={ReceiptLongOutlinedIcon}
            title="No orders yet"
            description="You haven't placed any orders yet. Start exploring our marketplace catalog!"
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