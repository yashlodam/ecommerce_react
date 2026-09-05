import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "../../../common/ThemeToggle";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CategorySheet from "./CategorySheet";
import { mainCategory } from "../../../data/category/mainCategory";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import Collapse from "@mui/material/Collapse";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchUserProfile, logout } from "../../../State/AuthSlice";
import { fetchSellerProfile } from "../../../State/seller/sellerSlice";
import { fetchUserCart, openCartDrawer } from "../../../State/customer/CartSlice";
import { searchProduct } from "../../../State/customer/ProductSlice";

const ACCENT = "#00927c";

function Navbar() {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const cart = useAppSelector((store) => store.cart);
  const { isLoggedIn, user, role } = useAppSelector((store) => store.auth);
  const product = useAppSelector((store) => store.product);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // User Dropdown Menu Anchor
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();
  const searchRef = useRef(null);
  const searchResults = product?.searchProducts ?? [];
  const isSearching = product?.loading && query.trim().length > 1;

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "ROLE_SELLER") {
        dispatch(fetchSellerProfile());
      } else {
        dispatch(fetchUserProfile());
        if (role === "ROLE_CUSTOMER" || !role) {
          dispatch(fetchUserCart());
        }
      }
    }
  }, [dispatch, isLoggedIn, role]);

  const closeDrawer = () => setOpenDrawer(false);

  const handleLogout = () => {
    handleMenuClose();
    closeDrawer();
    dispatch(logout(navigate));
  };

  const handleSearch = (value = query) => {
    const trimmed = value?.trim();
    if (!trimmed) return;

    setShowSearch(false);
    setMobileSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length > 1) {
      const timer = setTimeout(() => {
        dispatch(searchProduct(trimmed));
        setShowSearch(true);
      }, 350);
      return () => clearTimeout(timer);
    }
    setShowSearch(false);
    return undefined;
  }, [query, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user?.fullName || (role === "ROLE_ADMIN" ? "Administrator" : "User");
  const avatarLetter = displayName.charAt(0).toUpperCase() || (role === "ROLE_ADMIN" ? "A" : "U");

  return (
    <>
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={closeDrawer}
        ModalProps={{
          disableRestoreFocus: true,
        }}
        PaperProps={{
          sx: {
            width: "min(320px, 84vw)",
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            bgcolor: "background.paper",
            backgroundImage: "none",
          },
        }}
      >
        <div className="flex h-full flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              if (role === "ROLE_ADMIN") navigate("/admin");
              else if (role === "ROLE_SELLER") navigate("/seller");
              else if (isLoggedIn) navigate("/account/orders");
              else navigate("/login");
              closeDrawer();
            }}
            className="flex cursor-pointer items-center gap-3 p-5 text-white"
            style={{ background: "linear-gradient(135deg, #00927c 0%, #0f766e 100%)" }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: "#00796b",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              {avatarLetter}
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-bold">
                {isLoggedIn ? displayName : "Welcome Shopper"}
              </p>
              <p className="truncate text-xs text-white/80">
                {isLoggedIn
                  ? role === "ROLE_ADMIN"
                    ? "Super Administrator"
                    : role === "ROLE_SELLER"
                    ? "Verified Merchant"
                    : user?.email
                  : "Sign in for personalized perks"}
              </p>
            </div>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                closeDrawer();
              }}
              size="small"
              sx={{ color: "white" }}
              aria-label="Close menu"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
              {role === "ROLE_ADMIN" ? (
                <>
                  <DrawerRow
                    icon={<AdminPanelSettingsIcon fontSize="small" />}
                    label="Admin Portal"
                    onClick={() => { navigate("/admin"); closeDrawer(); }}
                  />
                  <DrawerRow
                    icon={<StoreIcon fontSize="small" />}
                    label="Manage Sellers"
                    onClick={() => { navigate("/admin/sellers"); closeDrawer(); }}
                  />
                  <DrawerRow
                    icon={<ReceiptLongOutlinedIcon fontSize="small" />}
                    label="Manage Coupons"
                    onClick={() => { navigate("/admin/coupon"); closeDrawer(); }}
                  />
                </>
              ) : role === "ROLE_SELLER" ? (
                <>
                  <DrawerRow
                    icon={<StoreIcon fontSize="small" />}
                    label="Seller Dashboard"
                    onClick={() => { navigate("/seller"); closeDrawer(); }}
                  />
                  <DrawerRow
                    icon={<ShoppingCartOutlinedIcon fontSize="small" />}
                    label="Product Inventory"
                    onClick={() => { navigate("/seller/products"); closeDrawer(); }}
                  />
                  <DrawerRow
                    icon={<ReceiptLongOutlinedIcon fontSize="small" />}
                    label="Orders"
                    onClick={() => { navigate("/seller/orders"); closeDrawer(); }}
                  />
                </>
              ) : (
                <>
                  <DrawerRow
                    icon={<ReceiptLongOutlinedIcon fontSize="small" />}
                    label="My Orders"
                    onClick={() => { navigate("/account/orders"); closeDrawer(); }}
                  />
                  <DrawerRow
                    icon={<ShoppingCartOutlinedIcon fontSize="small" />}
                    label={`Cart (${cart.cart?.totalItem || 0})`}
                    onClick={() => { closeDrawer(); dispatch(openCartDrawer()); }}
                  />
                  <DrawerRow
                    icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
                    label="My Wishlist"
                    onClick={() => { navigate("/wishlist"); closeDrawer(); }}
                  />
                  <DrawerRow
                    icon={<LocalOfferIcon fontSize="small" className="text-rose-500" />}
                    label="🔥 Deals & Promotions"
                    onClick={() => { navigate("/deals"); closeDrawer(); }}
                  />
                </>
              )}
            </div>

            <p className="px-5 pb-1 pt-4 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
              Browse Categories
            </p>
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

          <div className="border-t border-slate-100 dark:border-slate-800 p-4 space-y-2">
            {isLoggedIn ? (
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                sx={{
                  py: 1.1,
                  borderRadius: "14px",
                  fontWeight: 700,
                  textTransform: "none",
                }}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    py: 1.1,
                    borderRadius: "14px",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                  onClick={() => { navigate("/login"); closeDrawer(); }}
                >
                  Login / Sign Up
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  startIcon={<StoreIcon />}
                  sx={{
                    py: 1.1,
                    borderRadius: "14px",
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                  onClick={() => { navigate("/become-seller"); closeDrawer(); }}
                >
                  Become a Seller
                </Button>
              </>
            )}
          </div>
        </div>
      </Drawer>

      {/* Main Sticky Navbar */}
      <Box className="sticky top-0 left-0 right-0 border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl transition-colors z-40">
        <div className="flex h-16 sm:h-18 items-center justify-between gap-2 min-[360px]:gap-3 px-2.5 min-[360px]:px-4 sm:px-6 lg:px-16 max-w-[1700px] mx-auto">
          {/* Logo & Category Navigation */}
          <div className="flex min-w-0 items-center gap-1.5 min-[360px]:gap-2 lg:gap-8">
            <div className="flex min-w-0 items-center gap-1 min-[360px]:gap-1.5">
              {!isLarge && (
                <IconButton
                  onClick={(e) => {
                    e.currentTarget.blur();
                    setOpenDrawer(true);
                  }}
                  aria-label="Open navigation menu"
                  sx={{
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    minWidth: { xs: 40, sm: 44 },
                    minHeight: { xs: 40, sm: 44 },
                  }}
                  className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <MenuIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
                </IconButton>
              )}
              <span
                onClick={() => navigate("/")}
                className="logo cursor-pointer truncate text-lg min-[360px]:text-xl md:text-2xl font-black tracking-tight text-teal-600 dark:text-teal-400 select-none"
              >
                ShopSphere
              </span>
            </div>

            {isLarge && (
              <ul className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                {mainCategory.map((item, index) => (
                  <li
                    key={item.categoryId ?? index}
                    onMouseLeave={() => setShowCategorySheet(false)}
                    onMouseEnter={() => {
                      setSelectedCategory(item.categoryId);
                      setShowCategorySheet(true);
                    }}
                    className="flex h-16 items-center rounded-full px-4 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer select-none"
                  >
                    {item.name}
                  </li>
                ))}
                <li
                  onClick={() => navigate("/deals")}
                  className="flex h-16 items-center gap-1 rounded-full px-3.5 transition-all duration-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold cursor-pointer select-none"
                >
                  <span className="text-sm">🔥</span>
                  <span>Deals</span>
                </li>
              </ul>
            )}
          </div>

          {/* Desktop Search Bar */}
          {isLarge && (
            <div ref={searchRef} className="relative mx-4 hidden flex-1 md:flex max-w-lg lg:max-w-xl">
              <div className="relative flex w-full items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 px-3.5 py-1.5 shadow-xs transition-all duration-200 focus-within:border-teal-500 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-2 focus-within:ring-teal-500/20">
                <SearchIcon
                  onClick={() => handleSearch(query)}
                  className="text-slate-400 hover:text-teal-600 cursor-pointer transition-colors"
                  fontSize="small"
                />
                <InputBase
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0) {
                      setShowSearch(true);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSearch(query);
                    }
                  }}
                  placeholder="Search 10,000+ products, brands & categories..."
                  className="ml-1 flex-1 text-slate-900 dark:text-slate-100"
                  sx={{ fontSize: 14 }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleSearch(query)}
                  disabled={!query.trim()}
                  color="primary"
                  sx={{
                    minWidth: 80,
                    borderRadius: "999px",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 2,
                    py: 0.6,
                    fontSize: "13px",
                  }}
                >
                  Search
                </Button>
              </div>

              {/* Desktop Live Search Popup */}
              {showSearch && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-96 overflow-y-auto rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl transition-colors">
                  {isSearching ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-6 text-sm text-slate-500 dark:text-slate-400">
                      <CircularProgress size={16} color="primary" />
                      <span>Searching catalog matches...</span>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                      No products found for "{query}".
                    </div>
                  ) : (
                    searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          navigate(`/product-details/${item.category?.categoryId ?? item.categoryId}/${item.id}`);
                          setQuery("");
                          setShowSearch(false);
                        }}
                        className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800/50 last:border-b-0"
                      >
                        <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 p-1 flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-800">
                          <img
                            src={item.images?.[0] || "https://placehold.co/60x60"}
                            alt={item.title}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-bold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </h4>
                          <p className="mt-0.5 text-xs font-bold text-teal-600 dark:text-teal-400">
                            ₹{Number(item.sellingPrice || 0).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Right Action Icons & Auth */}
          <div className="flex shrink-0 items-center gap-1 min-[360px]:gap-1.5 sm:gap-2 lg:gap-3">
            <ThemeToggle size="small" />

            {!isLarge && (
              <>
                <IconButton
                  onClick={() => setMobileSearchOpen((value) => !value)}
                  aria-label="Search products"
                  sx={{
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    minWidth: { xs: 40, sm: 44 },
                    minHeight: { xs: 40, sm: 44 },
                  }}
                  className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <SearchIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
                </IconButton>
                <IconButton
                  onClick={() => dispatch(openCartDrawer())}
                  aria-label="Shopping Cart"
                  sx={{
                    width: { xs: 40, sm: 44 },
                    height: { xs: 40, sm: 44 },
                    minWidth: { xs: 40, sm: 44 },
                    minHeight: { xs: 40, sm: 44 },
                  }}
                  className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <Badge
                    badgeContent={cart.cart?.totalItem || 0}
                    color="error"
                    overlap="circular"
                    max={99}
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "10px",
                        height: "18px",
                        minWidth: "18px",
                        px: "4px",
                        right: 1,
                        top: 1,
                        fontWeight: 700,
                      },
                    }}
                  >
                    <AddShoppingCartIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
                  </Badge>
                </IconButton>
              </>
            )}

            {isLarge && (
              <>
                {/* Wishlist & Cart icons for customers */}
                {role !== "ROLE_ADMIN" && role !== "ROLE_SELLER" && (
                  <>
                    <IconButton
                      onClick={() => navigate("/wishlist")}
                      aria-label="Wishlist"
                      className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                    >
                      <FavoriteBorderIcon sx={{ fontSize: 22 }} />
                    </IconButton>

                    <IconButton
                      onClick={() => dispatch(openCartDrawer())}
                      aria-label="Cart"
                      className="text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                    >
                      <Badge badgeContent={cart.cart?.totalItem || 0} color="error" overlap="circular" max={99}>
                        <AddShoppingCartIcon sx={{ fontSize: 22 }} />
                      </Badge>
                    </IconButton>
                  </>
                )}

                {/* Direct Dashboard Shortcuts for Admin / Seller */}
                {role === "ROLE_ADMIN" && (
                  <Button
                    onClick={() => navigate("/admin")}
                    startIcon={<AdminPanelSettingsIcon />}
                    variant="contained"
                    sx={{
                      borderRadius: "999px",
                      px: 2,
                      py: 0.7,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "13px",
                      bgcolor: "#4f46e5",
                      "&:hover": { bgcolor: "#4338ca" },
                    }}
                  >
                    Admin Portal
                  </Button>
                )}

                {role === "ROLE_SELLER" && (
                  <Button
                    onClick={() => navigate("/seller")}
                    startIcon={<StoreIcon />}
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "999px",
                      px: 2,
                      py: 0.7,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "13px",
                    }}
                  >
                    Seller Dashboard
                  </Button>
                )}

                {/* User Dropdown or Login Button */}
                {isLoggedIn ? (
                  <>
                    <IconButton
                      onClick={handleMenuOpen}
                      aria-label="Account"
                      className="hover:scale-105 transition-transform"
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: role === "ROLE_ADMIN" ? "#4f46e5" : ACCENT,
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#fff",
                        }}
                      >
                        {avatarLetter}
                      </Avatar>
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={isMenuOpen}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          width: 220,
                          borderRadius: "16px",
                          mt: 1.5,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                          border: "1px solid",
                          borderColor: "divider",
                          bgcolor: "background.paper",
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <div className="px-4 py-2.5">
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                          {displayName}
                        </p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                          {role === "ROLE_ADMIN"
                            ? "Super Admin"
                            : role === "ROLE_SELLER"
                            ? "Merchant"
                            : "Shopper"}
                        </span>
                      </div>
                      <Divider />

                      {role === "ROLE_ADMIN" ? (
                        <>
                          <MenuItem onClick={() => { handleMenuClose(); navigate("/admin"); }}>
                            <AdminPanelSettingsIcon sx={{ fontSize: 17, mr: 1.5, color: "text.secondary" }} />
                            <span className="text-xs font-semibold">Admin Dashboard</span>
                          </MenuItem>
                          <MenuItem onClick={() => { handleMenuClose(); navigate("/admin/sellers"); }}>
                            <StoreIcon sx={{ fontSize: 17, mr: 1.5, color: "text.secondary" }} />
                            <span className="text-xs font-semibold">Manage Sellers</span>
                          </MenuItem>
                          <MenuItem onClick={() => { handleMenuClose(); navigate("/admin/coupon"); }}>
                            <ReceiptLongOutlinedIcon sx={{ fontSize: 17, mr: 1.5, color: "text.secondary" }} />
                            <span className="text-xs font-semibold">Coupons & Deals</span>
                          </MenuItem>
                        </>
                      ) : role === "ROLE_SELLER" ? (
                        <>
                          <MenuItem onClick={() => { handleMenuClose(); navigate("/seller"); }}>
                            <StoreIcon sx={{ fontSize: 17, mr: 1.5, color: "text.secondary" }} />
                            <span className="text-xs font-semibold">Seller Dashboard</span>
                          </MenuItem>
                          <MenuItem onClick={() => { handleMenuClose(); navigate("/seller/products"); }}>
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 17, mr: 1.5, color: "text.secondary" }} />
                            <span className="text-xs font-semibold">My Products</span>
                          </MenuItem>
                          <MenuItem onClick={() => { handleMenuClose(); navigate("/seller/orders"); }}>
                            <ReceiptLongOutlinedIcon sx={{ fontSize: 17, mr: 1.5, color: "text.secondary" }} />
                            <span className="text-xs font-semibold">My Orders</span>
                          </MenuItem>
                        </>
                      ) : (
                        <>
                          <MenuItem onClick={() => { handleMenuClose(); navigate("/account/orders"); }}>
                            <ReceiptLongOutlinedIcon sx={{ fontSize: 17, mr: 1.5, color: "text.secondary" }} />
                            <span className="text-xs font-semibold">My Orders</span>
                          </MenuItem>
                          <MenuItem onClick={() => { handleMenuClose(); navigate("/account"); }}>
                            <PersonOutlineOutlinedIcon sx={{ fontSize: 17, mr: 1.5, color: "text.secondary" }} />
                            <span className="text-xs font-semibold">My Profile</span>
                          </MenuItem>
                          <MenuItem onClick={() => { handleMenuClose(); navigate("/wishlist"); }}>
                            <FavoriteBorderOutlinedIcon sx={{ fontSize: 17, mr: 1.5, color: "text.secondary" }} />
                            <span className="text-xs font-semibold">Wishlist</span>
                          </MenuItem>
                        </>
                      )}

                      <Divider />
                      <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                        <LogoutIcon sx={{ fontSize: 17, mr: 1.5 }} />
                        <span className="text-xs font-bold">Logout</span>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    onClick={() => navigate("/login")}
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: "999px",
                      px: 2.5,
                      py: 0.75,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "14px",
                    }}
                  >
                    Login
                  </Button>
                )}

                {/* Show Become Seller only for non-merchants and non-admins */}
                {role !== "ROLE_SELLER" && role !== "ROLE_ADMIN" && (
                  <Button
                    onClick={() => navigate("/become-seller")}
                    startIcon={<StoreIcon />}
                    variant="outlined"
                    color="primary"
                    sx={{
                      borderRadius: "999px",
                      px: 2,
                      py: 0.7,
                      fontWeight: 700,
                      textTransform: "none",
                      fontSize: "13px",
                    }}
                  >
                    Become Seller
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Collapse Bar */}
        {!isLarge && (
          <Collapse in={mobileSearchOpen}>
            <div className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 transition-colors">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1.5 shadow-sm focus-within:border-teal-500 focus-within:bg-white dark:focus-within:bg-slate-900">
                <div className="flex w-full items-center gap-2 px-2 py-1">
                  <SearchIcon
                    onClick={() => handleSearch(query)}
                    fontSize="small"
                    className="cursor-pointer text-slate-400"
                  />
                  <InputBase
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onFocus={() => {
                      if (searchResults.length > 0) setShowSearch(true);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSearch(query);
                      }
                    }}
                    placeholder="Search products..."
                    className="ml-1 flex-1 text-sm text-slate-900 dark:text-slate-100"
                  />
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => handleSearch(query)}
                    disabled={!query.trim()}
                    sx={{
                      minWidth: 70,
                      borderRadius: "999px",
                      textTransform: "none",
                      fontWeight: 700,
                      px: 1.5,
                      py: 0.5,
                    }}
                  >
                    Search
                  </Button>
                </div>

                {showSearch && (
                  <div className="mt-2 max-h-72 overflow-y-auto rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg">
                    {isSearching ? (
                      <div className="flex items-center justify-center gap-2 px-4 py-4 text-xs text-slate-500">
                        <CircularProgress size={14} color="primary" />
                        <span>Searching...</span>
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="px-4 py-4 text-center text-xs text-slate-500">
                        No products found.
                      </div>
                    ) : (
                      searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            navigate(`/product-details/${item.category?.categoryId ?? item.categoryId}/${item.id}`);
                            setQuery("");
                            setShowSearch(false);
                            setMobileSearchOpen(false);
                          }}
                          className="flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <img src={item.images?.[0]} alt={item.title} className="h-10 w-10 rounded-lg object-contain" />
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                            <p className="mt-0.5 text-xs font-bold text-teal-600 dark:text-teal-400">₹{item.sellingPrice}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </Collapse>
        )}

        {/* Multilevel Category Flyout */}
        {isLarge && showCategorySheet && (
          <div
            onMouseLeave={() => setShowCategorySheet(false)}
            onMouseOver={() => setShowCategorySheet(true)}
            className="categorySheet absolute left-16 right-16 top-[4.05rem] shadow-2xl z-50 animate-fade-in"
          >
            <CategorySheet selectedCategory={selectedCategory} setShowSheet={setShowCategorySheet} />
          </div>
        )}
      </Box>
    </>
  );
}

function DrawerRow({ icon, label, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className="flex min-h-[44px] cursor-pointer items-center justify-between gap-3 px-5 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-300 focus-visible:outline-none focus-visible:bg-slate-100 dark:focus-visible:bg-slate-800 select-none"
    >
      <span className="flex items-center gap-3 text-sm font-semibold">
        {icon && <span className="flex text-slate-400 dark:text-slate-500">{icon}</span>}
        {label}
      </span>
      <ChevronRightIcon fontSize="small" className="text-slate-400 dark:text-slate-600" />
    </div>
  );
}

export default Navbar;