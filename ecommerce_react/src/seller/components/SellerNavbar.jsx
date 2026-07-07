import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { useAppSelector } from "../../State/Store";
import SellerDrawerList from "./SellerDrawerList";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";


function SellerNavbar() {
  const theme = useTheme();
  const navigate = useNavigate();

  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const { isLoggedIn } = useAppSelector((store) => store.auth);

  const [openDrawer, setOpenDrawer] = useState(false);
  const closeDrawer = () => setOpenDrawer(false);

  const ACCENT = "#00927c";
const ACCENT_DARK = "#007563";



const primaryBtnSx = {
  bgcolor: ACCENT,
  textTransform: "none",
  fontWeight: 700,
  borderRadius: "999px",
  boxShadow: "none",
  px: 2.2,
  py: 1,
  "&:hover": { bgcolor: ACCENT_DARK, boxShadow: "none" },
  "&:active": { bgcolor: ACCENT_DARK },
};

const outlinedBtnSx = {
  borderColor: ACCENT,
  color: ACCENT,
  textTransform: "none",
  fontWeight: 700,
  borderRadius: "999px",
  px: 2.2,
  py: 1,
  "&:hover": { borderColor: ACCENT_DARK, color: ACCENT_DARK, bgcolor: "rgba(0,146,124,0.06)" },
};

const iconBtnSx = {
  borderRadius: "999px",
  bgcolor: "rgba(15, 23, 42, 0.04)",
  color: "#334155",
  transition: "all 0.2s ease",
  "&:hover": { bgcolor: "rgba(0, 146, 124, 0.08)", color: ACCENT },
};

  return (
    <div>
       <Drawer
  anchor="left"
  open={openDrawer}
  onClose={closeDrawer}
  PaperProps={{
    sx: {
      width: 300,
    },
  }}
>
  <div
    className="flex items-center justify-between px-4 py-3 text-white"
    style={{ background: "linear-gradient(135deg, #00927c 0%, #0f766e 100%)" }}
  >
    <h2 className="text-lg font-semibold">ShopSphere</h2>

    <IconButton onClick={closeDrawer} sx={{ color: "white" }}>
      <CloseIcon />
    </IconButton>
  </div>

  <SellerDrawerList toggleDrawer={closeDrawer} />
</Drawer>
      <Box
        className="sticky top-0 left-0 right-0 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl"
        sx={{ zIndex: 20 }}
      >
        <div className="flex h-17 items-center justify-between gap-2 px-3 sm:px-5 lg:px-20">
          <div className="flex min-w-0 items-center gap-2 lg:gap-8">
            <div className="flex min-w-0 items-center gap-1">
              {!isLarge && (
                <IconButton
                  onClick={() => setOpenDrawer(true)}
                  aria-label="Open menu"
                  sx={iconBtnSx}
                >
                  <MenuIcon />
                </IconButton>
              )}

              <h1
                onClick={() => navigate("/")}
                className="logo cursor-pointer truncate text-lg font-semibold md:text-2xl"
                style={{ color: ACCENT }}
              >
                ShopSphere
              </h1>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}



export default SellerNavbar;