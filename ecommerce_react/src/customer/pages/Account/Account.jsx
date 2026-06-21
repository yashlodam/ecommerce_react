import Divider from "@mui/material/Divider";
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import UserDetai from "./UserDetai";
import Address from "./Address";

function Account() {
  const menu = [
    { name: "Orders", path: "/account/orders" },
    { name: "Profile", path: "/account" },
    { name: "Saved Cards", path: "/account/saved-card" },
    { name: "Addresses", path: "/account/addresses" },
    { name: "Logout", path: "/" },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (item) => {
    navigate(item.path);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Account Dashboard
          </h1>

          <p className="text-gray-500 mt-2 text-base">
            Manage your orders, profile information, saved payment methods,
            and delivery addresses from one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <section className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
              
              {/* User Profile */}
              <div className="bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 p-8 text-center text-white">
                <div className="w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl font-bold shadow-lg">
                  Y
                </div>

                <h2 className="mt-4 text-xl font-semibold">
                  Yash Lodam
                </h2>

                <p className="text-sm text-teal-50 mt-1">
                  Welcome back
                </p>

                <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-xs font-medium">
                  Verified Customer
                </div>
              </div>

              <Divider />

              {/* Menu */}
              <div className="p-4">
                {menu.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => handleClick(item)}
                    className={`
                      flex items-center justify-between
                      px-5 py-4 mb-2 rounded-xl cursor-pointer
                      transition-all duration-300 font-medium
                      ${
                        item.path === location.pathname
                          ? "bg-teal-600 text-white shadow-lg shadow-teal-100"
                          : "text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                      }
                    `}
                  >
                    <span>{item.name}</span>

                    {item.path === location.pathname && (
                      <span className="text-lg">●</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 min-h-[700px]">
              <Routes>
                <Route path="/" element={<UserDetai/>}/>
                <Route path="/orders" element={<Order/>}/>
                <Route path="/order:orderId/:orderItemId" element={<UserDetai/>}/>
                <Route path="/addresses" element={<Address/>}/>
              </Routes>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Account;