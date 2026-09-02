import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Drawer from "@mui/material/Drawer";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../State/Store";
import { logout } from "../../State/AuthSlice";
import AdminDrawerList from "./AdminDrawerList";
import ThemeToggle from "../../common/ThemeToggle";

function AdminNavbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const { user } = useAppSelector((store) => store.auth);

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
        <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
          <div>
            <h2 className="text-base font-extrabold tracking-wide">ShopSphere</h2>
            <p className="text-[11px] text-indigo-300">System Administration</p>
          </div>
          <IconButton onClick={closeDrawer} size="small" sx={{ color: "white" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <AdminDrawerList toggleDrawer={closeDrawer} />
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
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <h1 className="logo text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400">
                ShopSphere
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
                <AdminPanelSettingsIcon sx={{ fontSize: 13 }} />
                Admin Portal
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
              Storefront
            </Button>

            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: "secondary.main",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {user?.fullName?.charAt(0).toUpperCase() || "A"}
              </Avatar>

              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">
                  {user?.fullName || "Administrator"}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  Super Admin
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

export default AdminNavbar;