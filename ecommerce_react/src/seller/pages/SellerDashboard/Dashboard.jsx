import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  IndianRupee,
  ShoppingBag,
  Package,
  Users,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { fetchSellerOrders } from "../../../State/seller/sellerOrderSlice";
import { fetchTransactionsBySeller } from "../../../State/seller/transactionSlice";
import { fetchSellerProduct } from "../../../State/seller/sellerProductSlice";

// ---- Presentational fallback data (swap for real analytics endpoints when available) ----
const salesDataSets = {
  "6M": [
    { month: "Jan", sales: 12000, orders: 42 },
    { month: "Feb", sales: 19000, orders: 61 },
    { month: "Mar", sales: 15000, orders: 53 },
    { month: "Apr", sales: 28000, orders: 88 },
    { month: "May", sales: 35000, orders: 104 },
    { month: "Jun", sales: 42000, orders: 129 },
  ],
  "3M": [
    { month: "Apr", sales: 28000, orders: 88 },
    { month: "May", sales: 35000, orders: 104 },
    { month: "Jun", sales: 42000, orders: 129 },
  ],
  "12M": [
    { month: "Jul", sales: 9000, orders: 30 },
    { month: "Aug", sales: 11000, orders: 34 },
    { month: "Sep", sales: 14500, orders: 40 },
    { month: "Oct", sales: 17000, orders: 47 },
    { month: "Nov", sales: 21000, orders: 55 },
    { month: "Dec", sales: 26500, orders: 70 },
    { month: "Jan", sales: 12000, orders: 42 },
    { month: "Feb", sales: 19000, orders: 61 },
    { month: "Mar", sales: 15000, orders: 53 },
    { month: "Apr", sales: 28000, orders: 88 },
    { month: "May", sales: 35000, orders: 104 },
    { month: "Jun", sales: 42000, orders: 129 },
  ],
};

const topProducts = [
  { name: "Nike Shoes", orders: 120 },
  { name: "Puma T-Shirt", orders: 95 },
  { name: "Adidas Hoodie", orders: 78 },
  { name: "Campus Shoes", orders: 65 },
];

const statusMeta = {
  Pending: { icon: Clock, color: "#f59e0b", bg: "#fef3c7" },
  Shipped: { icon: Truck, color: "#3b82f6", bg: "#dbeafe" },
  Delivered: { icon: CheckCircle2, color: "#009688", bg: "#ccfbf1" },
  Cancelled: { icon: XCircle, color: "#ef4444", bg: "#fee2e2" },
};

const orderStatusCounts = [
  { title: "Pending", value: 12 },
  { title: "Shipped", value: 34 },
  { title: "Delivered", value: 278 },
  { title: "Cancelled", value: 8 },
];

const recentOrdersSeed = [
  { id: "#ORD123", customer: "Rahul Sharma", amount: 1499, status: "Delivered" },
  { id: "#ORD124", customer: "Amit Patel", amount: 899, status: "Shipped" },
  { id: "#ORD125", customer: "Priya Singh", amount: 2499, status: "Pending" },
  { id: "#ORD126", customer: "Sneha Kulkarni", amount: 3299, status: "Delivered" },
  { id: "#ORD127", customer: "Vikram Rao", amount: 599, status: "Cancelled" },
];

function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

// ---- Small building blocks ----

function Skeleton({ className }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
}

function StatCard({ label, value, icon: Icon, trend, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
        <Skeleton className="h-4 w-24 mb-4" />
        <Skeleton className="h-8 w-32" />
      </div>
    );
  }

  const isPositive = trend >= 0;

  return (
    <div className="group bg-white rounded-xl shadow-sm p-6 border border-slate-100 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition-colors">
          <Icon size={18} />
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-3 text-slate-800 tabular-nums">{value}</h2>

      {typeof trend === "number" && (
        <div
          className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
            isPositive ? "text-teal-600" : "text-red-500"
          }`}
        >
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{Math.abs(trend)}% vs last month</span>
        </div>
      )}
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-slate-200">
          {p.dataKey === "sales" ? formatINR(p.value) : `${p.value} orders`}
        </p>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((store) => store.sellerProduct);
  const { orders } = useAppSelector((store) => store.sellerOrder);
  const { transaction } = useAppSelector((store) => store);
  
  console.log("Seller products",products)

  const [range, setRange] = useState("6M");
  const [statusFilter, setStatusFilter] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt") || "";
    dispatch(fetchSellerProduct(jwt));
    dispatch(fetchSellerOrders(jwt));
    dispatch(fetchTransactionsBySeller(jwt));
  }, [dispatch]);

  const isLoading = !products || !orders || !transaction?.transactions;

  const totalRevenue = useMemo(() => {
    if (!transaction?.transactions) return 0;
    return transaction.transactions.reduce(
      (sum, item) => sum + (item.order?.totalSellingPrice || 0),
      0
    );
  }, [transaction]);

  const chartData = salesDataSets[range];

  const filteredOrders = statusFilter
    ? recentOrdersSeed.filter((o) => o.status === statusFilter)
    : recentOrdersSeed;

  return (
    <div className="p-5 lg:p-8 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Seller Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Here's how your store is performing today.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Total Revenue"
          value={formatINR(totalRevenue)}
          icon={IndianRupee}
          trend={8.4}
          loading={isLoading}
        />
        <StatCard
          label="Total Orders"
          value={orders?.length ?? 0}
          icon={ShoppingBag}
          trend={4.1}
          loading={isLoading}
        />
        <StatCard
          label="Products"
          value={products?.length ?? 0}
          icon={Package}
          trend={-1.2}
          loading={isLoading}
        />
        <StatCard
          label="Customers"
          value="1,20,000"
          icon={Users}
          trend={2.8}
          loading={isLoading}
        />
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-sm mt-8 p-5 border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
          <h2 className="text-xl font-semibold text-slate-800">Sales Overview</h2>

          <div className="flex bg-slate-100 rounded-lg p-1 self-start">
            {Object.keys(salesDataSets).map((key) => (
              <button
                key={key}
                onClick={() => setRange(key)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  range === key
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#009688" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#009688" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#009688"
              strokeWidth={3}
              fill="url(#salesFill)"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <h2 className="text-xl font-semibold mb-5 text-slate-800">Top Selling Products</h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topProducts} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={110}
                tick={{ fontSize: 12, fill: "#334155" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
              <Bar dataKey="orders" radius={[0, 6, 6, 0]}>
                {topProducts.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? "#009688" : "#5eead4"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-slate-800">Recent Orders</h2>
            {statusFilter && (
              <button
                onClick={() => setStatusFilter(null)}
                className="text-xs font-medium text-teal-600 hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">
                No orders match this status.
              </p>
            ) : (
              filteredOrders.map((order) => {
                const meta = statusMeta[order.status];
                const StatusIcon = meta.icon;
                return (
                  <div
                    key={order.id}
                    className="group border border-slate-100 rounded-lg p-4 flex justify-between items-center transition-colors hover:border-teal-200 hover:bg-teal-50/30 cursor-pointer"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{order.id}</p>
                      <p className="text-sm text-slate-500">{order.customer}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-slate-800">
                          {formatINR(order.amount)}
                        </p>
                        <div
                          className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mt-1"
                          style={{ color: meta.color, backgroundColor: meta.bg }}
                        >
                          <StatusIcon size={12} />
                          {order.status}
                        </div>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-slate-300 group-hover:text-teal-500 transition-colors"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {orderStatusCounts.map((item) => {
          const meta = statusMeta[item.title];
          const StatusIcon = meta.icon;
          const isActive = statusFilter === item.title;

          return (
            <button
              key={item.title}
              onClick={() => setStatusFilter(isActive ? null : item.title)}
              className={`bg-white rounded-xl shadow-sm p-5 text-center border transition-all ${
                isActive
                  ? "border-teal-400 ring-2 ring-teal-100"
                  : "border-slate-100 hover:border-teal-200 hover:-translate-y-0.5"
              }`}
            >
              <div
                className="w-9 h-9 rounded-lg mx-auto flex items-center justify-center mb-2"
                style={{ color: meta.color, backgroundColor: meta.bg }}
              >
                <StatusIcon size={18} />
              </div>
              <h3 className="text-slate-500 text-sm">{item.title}</h3>
              <p className="text-3xl font-bold text-slate-800 mt-1 tabular-nums">
                {item.value}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}