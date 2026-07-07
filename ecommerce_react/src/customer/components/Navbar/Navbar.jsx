import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StoreIcon from "@mui/icons-material/Store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
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
import { fetchUserProfile } from "../../../State/AuthSlice";
import { fetchUserCart } from "../../../State/customer/CartSlice";
import { searchProduct } from "../../../State/customer/ProductSlice";

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

function Navbar() {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const { cart } = useAppSelector((store) => store);
  const { isLoggedIn, user } = useAppSelector((store) => store.auth);
  const { product } = useAppSelector((store) => store);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useAppDispatch();
  const searchRef = useRef(null);
  const searchResults = product?.searchProducts ?? [];
  const isSearching = product?.loading && query.trim().length > 1;

  useEffect(() => {
    if (isLoggedIn) {
      const jwt = localStorage.getItem("jwt");
      dispatch(fetchUserProfile(jwt));
      dispatch(fetchUserCart(jwt));
    }
  }, [dispatch, isLoggedIn]);

  const closeDrawer = () => setOpenDrawer(false);

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

  return (
    <>
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

      <Box className="sticky top-0 left-0 right-0 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl" sx={{ zIndex: 20 }}>
        <div className="flex h-17.25 items-center justify-between gap-2 px-3 sm:px-5 lg:px-20">
          <div className="flex min-w-0 items-center gap-2 lg:gap-8">
            <div className="flex min-w-0 items-center gap-1">
              {!isLarge && (
                <IconButton onClick={() => setOpenDrawer(true)} aria-label="Open menu" sx={iconBtnSx}>
                  <MenuIcon />
                </IconButton>
              )}
              <h1 onClick={() => navigate("/")} className="logo cursor-pointer truncate text-lg font-semibold md:text-2xl" style={{ color: ACCENT }}>
                ShopSphere
              </h1>
            </div>

            {isLarge && (
              <ul className="flex items-center gap-1 text-sm font-medium text-slate-700">
                {mainCategory.map((item, index) => (
                  <li
                    key={item.categoryId ?? index}
                    onMouseLeave={() => setShowCategorySheet(false)}
                    onMouseEnter={() => {
                      setSelectedCategory(item.categoryId);
                      setShowCategorySheet(true);
                    }}
                    className="flex h-17.25 cursor-pointer items-center rounded-full px-4 transition-all duration-200 hover:bg-slate-100 hover:text-primary"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isLarge && (
            <div ref={searchRef} className="relative mx-4 hidden flex-1 md:flex max-w-xl">
              <div className="relative flex w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm transition-all duration-200 focus-within:border-teal-500 focus-within:bg-white">
                <SearchIcon
                  onClick={() => handleSearch(query)}
                  sx={{ cursor: "pointer", color: "#64748b" }}
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
                  placeholder="Search products, brands and more"
                  className="ml-1 flex-1"
                  sx={{ fontSize: 14, color: "#0f172a" }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleSearch(query)}
                  disabled={!query.trim()}
                  sx={{
                    minWidth: 88,
                    borderRadius: "999px",
                    textTransform: "none",
                    fontWeight: 700,
                    px: 1.8,
                    py: 0.8,
                    bgcolor: ACCENT,
                    boxShadow: "none",
                    "&:hover": { bgcolor: ACCENT_DARK, boxShadow: "none" },
                    "&:disabled": { bgcolor: "#cbd5e1", color: "#64748b" },
                  }}
                >
                  Search
                </Button>
              </div>

              {showSearch && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.65rem)] z-60 max-h-96 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  {isSearching ? (
                    <div className="flex items-center justify-center gap-2 px-4 py-5 text-sm text-slate-500">
                      <CircularProgress size={16} sx={{ color: ACCENT }} />
                      <span>Searching...</span>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="px-4 py-5 text-center text-sm text-slate-500">
                      No products found for this search.
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
                        className="flex cursor-pointer items-center gap-3 px-3 py-3 transition-colors hover:bg-slate-50"
                      >
                        <img src={item.images?.[0]} alt={item.title} className="h-14 w-14 rounded-lg object-contain" />
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-semibold text-slate-800">{item.title}</h4>
                          <p className="mt-1 text-sm font-semibold text-teal-600">₹{item.sellingPrice}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
            {!isLarge && (
              <>
                <IconButton onClick={() => setMobileSearchOpen((value) => !value)} aria-label="Search" sx={iconBtnSx}>
                  <SearchIcon />
                </IconButton>
                <IconButton onClick={() => navigate("/cart")} aria-label="Cart" sx={iconBtnSx}>
                  <Badge badgeContent={0} color="error" overlap="circular" max={9}>
                    <AddShoppingCartIcon sx={{ fontSize: 24, color: "#334155" }} />
                  </Badge>
                </IconButton>
              </>
            )}

            {isLarge && (
              <>
                {isLoggedIn ? (
                  <IconButton onClick={() => navigate("/account/orders")} aria-label="Account" sx={iconBtnSx}>
                    <Avatar sx={{ width: 30, height: 30, bgcolor: ACCENT, fontWeight: "bold", fontSize: 16 }}>
                      {user?.fullName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                ) : (
                  <Button onClick={() => navigate("/login")} variant="contained" sx={primaryBtnSx}>
                    Login
                  </Button>
                )}

                <IconButton onClick={() => navigate("/wishlist")} aria-label="Wishlist" sx={iconBtnSx}>
                  <FavoriteBorderIcon sx={{ fontSize: 24 }} />
                </IconButton>

                <IconButton onClick={() => navigate("/cart")} aria-label="Cart" sx={iconBtnSx}>
                  <Badge badgeContent={cart.cart?.totalItem || 0} color="error" overlap="circular" max={99}>
                    <AddShoppingCartIcon sx={{ fontSize: 24, color: "#334155" }} />
                  </Badge>
                </IconButton>

                <Button onClick={() => navigate("/become-seller")} startIcon={<StoreIcon />} variant="outlined" sx={outlinedBtnSx}>
                  Become Seller
                </Button>
              </>
            )}
          </div>
        </div>

        {!isLarge && (
          <Collapse in={mobileSearchOpen}>
            <div className="border-t border-slate-200 bg-white px-3 py-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm focus-within:border-teal-500 focus-within:bg-white">
                <div className="flex w-full items-center gap-2 rounded-full px-2 py-1.5">
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
                    placeholder="Search products, brands and more"
                    className="ml-1 flex-1 text-sm"
                    sx={{ fontSize: 14 }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleSearch(query)}
                    disabled={!query.trim()}
                    sx={{
                      minWidth: 76,
                      borderRadius: "999px",
                      textTransform: "none",
                      fontWeight: 700,
                      px: 1.4,
                      py: 0.6,
                      bgcolor: ACCENT,
                      boxShadow: "none",
                      "&:hover": { bgcolor: ACCENT_DARK, boxShadow: "none" },
                      "&:disabled": { bgcolor: "#cbd5e1", color: "#64748b" },
                    }}
                  >
                    Search
                  </Button>
                </div>

                {showSearch && (
                  <div className="mt-2 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
                    {isSearching ? (
                      <div className="flex items-center justify-center gap-2 px-4 py-4 text-sm text-slate-500">
                        <CircularProgress size={16} sx={{ color: ACCENT }} />
                        <span>Searching...</span>
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="px-4 py-4 text-center text-sm text-slate-500">
                        No products found for this search.
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
                          className="flex cursor-pointer items-center gap-3 px-3 py-3 transition-colors hover:bg-slate-50"
                        >
                          <img src={item.images?.[0]} alt={item.title} className="h-12 w-12 rounded-lg object-contain" />
                          <div className="min-w-0 flex-1">
                            <h4 className="truncate text-sm font-semibold text-slate-800">{item.title}</h4>
                            <p className="mt-1 text-sm font-semibold text-teal-600">₹{item.sellingPrice}</p>
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

        {isLarge && showCategorySheet && (
          <div onMouseLeave={() => setShowCategorySheet(false)} onMouseOver={() => setShowCategorySheet(true)} className="categorySheet absolute left-20 right-20 top-[4.41rem] shadow-lg">
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
        if (event.key === "Enter") onClick();
      }}
      className="flex cursor-pointer items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50 active:bg-slate-100"
    >
      <span className="flex items-center gap-3 text-[15px] text-slate-700">
        {icon && <span className="flex text-slate-500">{icon}</span>}
        {label}
      </span>
      <ChevronRightIcon fontSize="small" className="text-slate-400" />
    </div>
  );
}

export default Navbar;