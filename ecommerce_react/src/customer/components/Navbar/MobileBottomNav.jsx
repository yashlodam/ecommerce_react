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
import { openChat } from "../../../State/customer/ChatSlice";

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
      isActive: currentPath.startsWith("/products"),
      onClick: () => navigate("/products/all"),
    },
    {
      id: "ai-assistant",
      label: "AI Stylist",
      icon: Sparkles,
      isSpecial: true,
      onClick: () => dispatch(openChat()),
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
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center -mt-4 relative group"
                aria-label="Open AI Shopping Assistant"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 group-active:scale-95 transition-transform">
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
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
                  ? "text-indigo-600 dark:text-indigo-400 font-semibold"
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
