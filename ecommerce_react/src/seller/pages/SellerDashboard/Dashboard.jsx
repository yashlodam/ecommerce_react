import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 12000 },
  { month: "Feb", sales: 19000 },
  { month: "Mar", sales: 15000 },
  { month: "Apr", sales: 28000 },
  { month: "May", sales: 35000 },
  { month: "Jun", sales: 42000 },
];

const topProducts = [
  { name: "Nike Shoes", orders: 120 },
  { name: "Puma T-Shirt", orders: 95 },
  { name: "Adidas Hoodie", orders: 78 },
  { name: "Campus Shoes", orders: 65 },
];

function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,25,000",
    },
    {
      title: "Total Orders",
      value: "356",
    },
    {
      title: "Products",
      value: "42",
    },
    {
      title: "Customers",
      value: "187",
    },
  ];

  return (
    <div className="p-5 lg:p-8 bg-slate-100 min-h-screen">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <p className="text-gray-500 text-sm">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-2 text-teal-600">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-xl shadow-sm mt-8 p-5">
        <h2 className="text-xl font-semibold mb-5">
          Sales Overview
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#009688"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-5">
            Top Selling Products
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#009688" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-5">
            Recent Orders
          </h2>

          <div className="space-y-4">
            {[
              {
                id: "#ORD123",
                customer: "Rahul Sharma",
                amount: "₹1499",
                status: "Delivered",
              },
              {
                id: "#ORD124",
                customer: "Amit Patel",
                amount: "₹899",
                status: "Shipped",
              },
              {
                id: "#ORD125",
                customer: "Priya Singh",
                amount: "₹2499",
                status: "Pending",
              },
            ].map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.customer}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {order.amount}
                  </p>
                  <p className="text-sm text-teal-600">
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {[
          { title: "Pending", value: 12 },
          { title: "Shipped", value: 34 },
          { title: "Delivered", value: 278 },
          { title: "Cancelled", value: 8 },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-sm p-5 text-center"
          >
            <h3 className="text-gray-500">
              {item.title}
            </h3>

            <p className="text-3xl font-bold text-teal-600 mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;