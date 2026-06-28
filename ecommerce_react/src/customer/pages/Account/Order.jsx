import React, { useEffect } from "react";
import OrderItem from "./OrderItem";
import { store, useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserOrderHistory } from "../../../State/customer/OrderSlice";

function Order() {
  const dispatch = useAppDispatch();

  const {order} = useAppSelector(store=>store)
  console.log("yash",order.orders)

  useEffect(()=>{
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt")))
  },[])

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              My Orders
            </h1>
            <p className="text-gray-500 mt-1">
              View and track all your orders
            </p>
          </div>

          <div className="bg-teal-50 px-5 py-3 rounded-lg border border-teal-100">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-xl font-bold text-teal-600">
              {order.orders.length}
            </h2>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {order.orders.map((order)=> order.orderItems.map((item)=> <OrderItem item={item} order={order}/>))}
      </div>
    </div>
  );
}

export default Order;