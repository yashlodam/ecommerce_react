import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "../../State/Store";

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
        PaperProps={{ sx: { width: 300, borderTopRightRadius: 24, borderBottomRightRadius: 24 } }}
      >
        <div className="flex h-full flex-col">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              navigate("/account/orders");
              closeDrawer();
            }}
            className="flex cursor-pointer items-center gap-3 p-5 text-white"
            style={{ background: "linear-gradient(135deg, #00927c 0%, #0f766e 100%)" }}
          >
            <Avatar
              sx={{ width: 48, height: 48, border: "2px solid rgba(255,255,255,0.6)" }}
              src="https://yt3.ggpht.com/IQswhTaRAllO-9swJEwsLX3NO0OK_SrLrOFlTfLsjqrAwez9cSQ4cNOac0Ox9reNMsCOhg0hUA=s88-c-k-c0x00ffffff-no-rj"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold leading-tight">{isLoggedIn ? "Zosh" : "Welcome"}</p>
              <p className="truncate text-xs text-white/80">{isLoggedIn ? "View your account" : "Sign in to continue"}</p>
            </div>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                closeDrawer();
              }}
              size="small"
              sx={{ color: "white", alignSelf: "flex-start" }}
              aria-label="Close menu"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="py-2">
              <DrawerRow icon={<ReceiptLongOutlinedIcon fontSize="small" />} label="My Orders" onClick={() => { navigate("/account/orders"); closeDrawer(); }} />
              <DrawerRow icon={<ShoppingCartOutlinedIcon fontSize="small" />} label="Cart" onClick={() => { navigate("/cart"); closeDrawer(); }} />
              <DrawerRow icon={<FavoriteBorderOutlinedIcon fontSize="small" />} label="Wishlist" onClick={() => { navigate("/wishlist"); closeDrawer(); }} />
            </div>

            <p className="px-5 pb-1 pt-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Shop by category</p>
            <div className="pb-2">
              {mainCategory.map((item) => (
                <DrawerRow
                  key={item.categoryId}
                  label={item.name}
                  onClick={() => {
                    navigate(`/products/${item.categoryId}`);
                    closeDrawer();
                  }}
                />
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 p-4">
            <Button fullWidth variant="outlined" startIcon={<StoreIcon />} sx={{ ...outlinedBtnSx, py: 1.2 }} onClick={() => { navigate("/become-seller"); closeDrawer(); }}>
              Become a Seller
            </Button>
          </div>
        </div>
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