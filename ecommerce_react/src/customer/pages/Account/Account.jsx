import React from "react";
import Divider from "@mui/material/Divider";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import UserDetai from "./UserDetai";
import Address from "./Address";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { logout } from "../../../State/AuthSlice";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Account() {
  const menu = [
    {
      name: "Orders",
      path: "/account/orders",
      icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 20 }} />,
    },
    {
      name: "Profile",
      path: "/account",
      icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />,
    },
    {
      name: "Addresses",
      path: "/account/addresses",
      icon: <LocationOnOutlinedIcon sx={{ fontSize: 20 }} />,
    },
    {
      name: "Logout",
      path: "/",
      icon: <LogoutOutlinedIcon sx={{ fontSize: 20 }} />,
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const handleClick = (item) => {
    if (item.path === "/") {
      dispatch(logout(navigate));
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4 lg:px-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 transition-colors">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Account Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track active orders, manage saved delivery addresses, and update profile settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar */}
          <section className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden sticky top-24 transition-colors">
              {/* Profile Card Header */}
              <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 p-6 text-center text-white">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-2xl font-bold shadow-md">
                  {user?.fullName?.charAt(0).toUpperCase() || "U"}
                </div>

                <h2 className="mt-3 text-lg font-bold truncate">
                  {user?.fullName || "Valued Customer"}
                </h2>

                <p className="text-xs text-teal-200 truncate mt-0.5">
                  {user?.email || "No email available"}
                </p>

                <span className="mt-3 inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur">
                  Verified Buyer
                </span>
              </div>

              <Divider className="!border-slate-100 dark:!border-slate-800" />

              {/* Navigation Menu */}
              <div className="p-3 space-y-1">
                {menu.map((item) => {
                  const isActive =
                    item.path === location.pathname ||
                    (item.path === "/account/orders" &&
                      location.pathname.startsWith("/account/order"));
                  const isLogout = item.name === "Logout";

                  return (
                    <div
                      key={item.name}
                      onClick={() => handleClick(item)}
                      className={`
                        flex items-center justify-between
                        px-4 py-3 rounded-xl cursor-pointer
                        transition-all duration-200 text-sm font-semibold
                        ${
                          isActive
                            ? "bg-teal-600 text-white shadow-sm"
                            : isLogout
                            ? "text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>

                      {isActive && <span className="text-xs font-bold">●</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Content Body */}
          <section className="lg:col-span-8 xl:col-span-9">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 min-h-[600px] transition-colors">
              <Routes>
                <Route path="/" element={<UserDetai />} />
                <Route path="/orders" element={<Order />} />
                <Route
                  path="/order/:orderId/:orderItemId"
                  element={<OrderDetails />}
                />
                <Route path="/addresses" element={<Address />} />
              </Routes>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Account;