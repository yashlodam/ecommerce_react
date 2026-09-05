import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutGrid,
  Sparkles,
  Heart,
  ShoppingBag,
} from "lucide-react";
import Badge from "@mui/material/Badge";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { openCartDrawer } from "../../../State/customer/CartSlice";
import { toggleChat } from "../../../State/customer/ChatSlice";

export default function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart?.cart);
  const isCartDrawerOpen = useAppSelector(
    (state) => state.cart?.isCartDrawerOpen
  );
  const wishlist = useAppSelector((state) => state.wishlist?.wishlist);
  const wishlistCount =
    wishlist?.products?.length ?? wishlist?.items?.length ?? 0;
  const isChatOpen = useAppSelector((state) => state.chat?.isOpen);

  const currentPath = location.pathname;

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      isActive: currentPath === "/",
      onClick: () => navigate("/"),
    },
    {
      id: "categories",
      label: "Categories",
      icon: LayoutGrid,
      isActive: currentPath === "/categories" || currentPath.startsWith("/products"),
      onClick: () => navigate("/categories"),
    },
    {
      id: "ai-assistant",
      label: "ShopSphere AI",
      icon: Sparkles,
      isSpecial: true,
      isActive: Boolean(isChatOpen),
      onClick: () => dispatch(toggleChat()),
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: Heart,
      badge: wishlistCount,
      isActive: currentPath === "/wishlist",
      onClick: () => navigate("/wishlist"),
    },
    {
      id: "cart",
      label: "Bag",
      icon: ShoppingBag,
      badge: cart?.totalItem || 0,
      isActive: currentPath === "/cart" || Boolean(isCartDrawerOpen),
      onClick: () => dispatch(openCartDrawer()),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 transition-colors"
      style={{ paddingBottom: "max(6px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isSpecial) {
            const isChatActive = item.isActive;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center -mt-5 relative group cursor-pointer"
                aria-label="Toggle ShopSphere AI Assistant"
                aria-expanded={isChatActive}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 group-active:scale-95 ${
                    isChatActive
                      ? "bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-teal-500/40 ring-4 ring-teal-100 dark:ring-teal-950 scale-105"
                      : "bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-500 shadow-teal-500/30 hover:scale-105"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isChatActive ? "rotate-12" : "animate-pulse"}`} />
                </div>
                <span
                  className={`text-[10px] font-bold mt-0.5 tracking-tight ${
                    isChatActive
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex-1 flex flex-col items-center justify-center py-1 relative transition-colors ${
                item.isActive
                  ? "text-teal-600 dark:text-teal-400 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {item.badge !== undefined && item.badge > 0 ? (
                <Badge
                  badgeContent={item.badge}
                  color="error"
                  overlap="circular"
                  max={99}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "9px",
                      height: "16px",
                      minWidth: "16px",
                      px: "3px",
                      top: 1,
                      right: 1,
                      fontWeight: 700,
                    },
                  }}
                >
                  <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.25]" : "stroke-[1.75]"}`} />
                </Badge>
              ) : (
                <Icon className={`w-5 h-5 ${item.isActive ? "stroke-[2.25]" : "stroke-[1.75]"}`} />
              )}
              <span className="text-[10px] mt-1 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
