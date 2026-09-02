import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import Drawer from "@mui/material/Drawer";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import { logout } from "../../State/AuthSlice";
import SellerDrawerList from "./SellerDrawerList";
import ThemeToggle from "../../common/ThemeToggle";

function SellerNavbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const { profile } = useAppSelector((store) => store.seller);

  const [openDrawer, setOpenDrawer] = useState(false);
  const closeDrawer = () => setOpenDrawer(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: 290,
            bgcolor: "background.paper",
          },
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-teal-700 to-teal-900 text-white">
          <div>
            <h2 className="text-base font-extrabold tracking-wide">ShopSphere</h2>
            <p className="text-[11px] text-teal-200">Seller SaaS Portal</p>
          </div>
          <IconButton onClick={closeDrawer} size="small" sx={{ color: "white" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <SellerDrawerList toggleDrawer={closeDrawer} />
      </Drawer>

      <Box
        component="header"
        className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl transition-colors duration-200"
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {!isLarge && (
              <IconButton
                onClick={() => setOpenDrawer(true)}
                aria-label="Open menu"
                size="small"
                className="text-slate-700 dark:text-slate-200"
              >
                <MenuIcon />
              </IconButton>
            )}

            <div
              onClick={() => navigate("/seller")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <h1 className="logo text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400">
                ShopSphere
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border border-teal-200 dark:border-teal-700">
                Seller Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle size="small" />

            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate("/")}
              startIcon={<StorefrontIcon sx={{ fontSize: 18 }} />}
              sx={{
                borderRadius: "10px",
                borderColor: "divider",
                color: "text.primary",
                display: { xs: "none", sm: "inline-flex" },
                "&:hover": {
                  borderColor: "primary.main",
                  bgcolor: "action.hover",
                },
              }}
            >
              View Storefront
            </Button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {profile?.sellerName?.charAt(0).toUpperCase() || "S"}
              </Avatar>

              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                  {profile?.sellerName || "Partner Store"}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  ID: #{profile?.id || "---"}
                </p>
              </div>

              <IconButton
                onClick={handleLogout}
                title="Logout"
                size="small"
                className="text-slate-500 hover:text-red-500 transition-colors"
              >
                <LogoutIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default SellerNavbar;