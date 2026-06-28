import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StoreIcon from '@mui/icons-material/Store';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CategorySheet from './CategorySheet';
import { mainCategory } from '../../../data/category/mainCategory';
import { useNavigate } from 'react-router-dom';
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import Collapse from "@mui/material/Collapse";
import { store, useAppDispatch, useAppSelector } from '../../../State/Store';
import { fetchUserProfile } from '../../../State/AuthSlice';

const ACCENT = "#00927c";
const ACCENT_DARK = "#007563";

// Shared button styling so every CTA in the navbar/drawer looks consistent
const primaryBtnSx = {
  bgcolor: ACCENT,
  textTransform: "none",
  fontWeight: 600,
  borderRadius: "10px",
  boxShadow: "none",
  "&:hover": { bgcolor: ACCENT_DARK, boxShadow: "none" },
  "&:active": { bgcolor: ACCENT_DARK },
};

const outlinedBtnSx = {
  borderColor: ACCENT,
  color: ACCENT,
  textTransform: "none",
  fontWeight: 600,
  borderRadius: "10px",
  "&:hover": { borderColor: ACCENT_DARK, color: ACCENT_DARK, bgcolor: "rgba(0,146,124,0.06)" },
};

const iconBtnSx = {
  borderRadius: "10px",
  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
};

function Navbar() {

  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const { cart } = useAppSelector((store) => store)
  console.log("Navbar response", cart)

  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dispatch = useAppDispatch()

  const { isLoggedIn, user } = useAppSelector(store => store.auth)
  console.log(isLoggedIn)
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserProfile(localStorage.getItem("jwt")));
    }
  }, [dispatch, isLoggedIn]);

  const closeDrawer = () => setOpenDrawer(false);

  return (
    <>
      {/* ---------------- Mobile drawer: the single source of nav links on small screens ---------------- */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={closeDrawer}
        PaperProps={{ sx: { width: 300 } }}
      >
        <div className="h-full flex flex-col">

          {/* Profile header - acts as the only "account" entry point on mobile */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => { navigate("/account/orders"); closeDrawer(); }}
            className="flex items-center gap-3 p-5 text-white cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            <Avatar
              sx={{ width: 48, height: 48, border: "2px solid rgba(255,255,255,0.6)" }}
              src="https://yt3.ggpht.com/IQswhTaRAllO-9swJEwsLX3NO0OK_SrLrOFlTfLsjqrAwez9cSQ4cNOac0Ox9reNMsCOhg0hUA=s88-c-k-c0x00ffffff-no-rj"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base leading-tight truncate">
                {isLoggedIn ? "Zosh" : "Welcome"}
              </p>
              <p className="text-xs text-white/80 truncate">
                {isLoggedIn ? "View your account" : "Sign in to continue"}
              </p>
            </div>
            <IconButton
              onClick={(e) => { e.stopPropagation(); closeDrawer(); }}
              size="small"
              sx={{ color: "white", alignSelf: "flex-start" }}
              aria-label="Close menu"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">

            <div className="py-2">
              <DrawerRow
                icon={<ReceiptLongOutlinedIcon fontSize="small" />}
                label="My Orders"
                onClick={() => { navigate("/account/orders"); closeDrawer(); }}
              />
              <DrawerRow
                icon={<ShoppingCartOutlinedIcon fontSize="small" />}
                label="Cart"
                onClick={() => { navigate("/cart"); closeDrawer(); }}
              />
              <DrawerRow
                icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
                label="Wishlist"
                onClick={() => { navigate("/wishlist"); closeDrawer(); }}
              />
            </div>

            <p className="px-5 pt-3 pb-1 text-xs font-semibold tracking-wide text-gray-400 uppercase">
              Shop by category
            </p>
            <div className="pb-2">
              {mainCategory.map((item) => (
                <DrawerRow
                  key={item.categoryId}
                  label={item.name}
                  onClick={() => { navigate(`/products/${item.categoryId}`); closeDrawer(); }}
                />
              ))}
            </div>
          </div>

          {/* Footer action, pinned to bottom - only place "Become a Seller" lives on mobile */}
          <div className="p-4 border-t">
            <Button
              fullWidth
              variant="outlined"
              startIcon={<StoreIcon />}
              sx={{ ...outlinedBtnSx, py: 1.2 }}
              onClick={() => { navigate("/become-seller"); closeDrawer(); }}
            >
              Become a Seller
            </Button>
          </div>

        </div>
      </Drawer>

      <Box className="sticky top-0 left-0 right-0 bg-white shadow-sm" sx={{ zIndex: 2 }}>
        <div className='flex items-center justify-between gap-2 px-3 sm:px-5 lg:px-20 h-[65px] lg:h-[70px] '>
          <div className='flex items-center gap-2 lg:gap-10 min-w-0'>
            <div className='flex items-center gap-1 min-w-0'>
              {!isLarge && (
                <IconButton onClick={() => setOpenDrawer(true)} aria-label="Open menu" sx={iconBtnSx}>
                  <MenuIcon />
                </IconButton>
              )}
              <h1
                onClick={() => navigate('/')}
                className='logo cursor-pointer text-lg md:text-2xl font-semibold truncate'
                style={{ color: ACCENT }}
              >
                ShopSphere
              </h1>
            </div>

            {/* Category list + account/wishlist/seller actions: desktop only.
              On mobile, all of this lives exclusively in the drawer above, so nothing is duplicated. */}
            {isLarge && (
              <ul className='flex gap-2 lg:gap-4 items-center font-medium text-gray-800'>
                {mainCategory.map((item, index) => {
                  return (
                    <li
                      key={item.categoryId ?? index}
                      onMouseLeave={() => setShowCategorySheet(false)}
                      onMouseEnter={() => {
                        setSelectedCategory(item.categoryId);
                        setShowCategorySheet(true);
                      }}
                      className="mainCategory hover:text-primary hover:border-b-2 h-[70px] px-4 border-primary flex items-center cursor-pointer transition-colors"
                    >
                      {item.name}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Desktop / tablet search bar - inline, always visible */}
          {isLarge && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-1.5 transition-colors focus-within:bg-gray-200">
                <SearchIcon fontSize="small" className="text-gray-500" />
                <InputBase
                  placeholder="Search products, brands and more"
                  className="ml-2 flex-1 text-sm"
                  sx={{ fontSize: 14 }}
                />
              </div>
            </div>
          )}

          <div className='flex gap-0.5 sm:gap-2 lg:gap-6 items-center shrink-0'>
            {/* Mobile: keep only the two highest-frequency actions in the top bar - search and cart.
              Account, wishlist and become-seller all live in the drawer, so they aren't shown twice. */}
            {!isLarge && (
              <>
                <IconButton onClick={() => setMobileSearchOpen((v) => !v)} aria-label="Search" sx={iconBtnSx}>
                  <SearchIcon />
                </IconButton>
                <IconButton onClick={() => navigate("/cart")} aria-label="Cart" sx={iconBtnSx}>
                  <Badge badgeContent={0} color="error" overlap="circular" max={9}>
                    <AddShoppingCartIcon className='text-gray-700' sx={{ fontSize: 26 }} />
                  </Badge>
                </IconButton>
              </>
            )}

            {/* Desktop: full action set */}
            {isLarge && (
              <>
                {isLoggedIn ? (
                  <IconButton
                    onClick={() => navigate("/account/orders")}
                    aria-label="Account"
                    sx={iconBtnSx}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: "primary.main",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {user?.fullName?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>
                ) : (
                  <Button onClick={() => navigate("/login")} variant='contained' sx={primaryBtnSx}>
                    Login
                  </Button>
                )}

                <IconButton aria-label="Wishlist" sx={iconBtnSx}>
                  <FavoriteBorderIcon sx={{ fontSize: 26 }} />
                </IconButton>

                <IconButton
                  onClick={() => navigate("/cart")}
                  aria-label="Cart"
                  sx={iconBtnSx}
                >
                  <Badge
                    badgeContent={cart.cart?.totalItem || 0}
                    color="error"
                    overlap="circular"
                    max={99}
                  >
                    <AddShoppingCartIcon
                      className="text-gray-700"
                      sx={{ fontSize: 26 }}
                    />
                  </Badge>
                </IconButton>

                <Button
                  onClick={() => navigate("/become-seller")}
                  startIcon={<StoreIcon />}
                  variant='outlined'
                  sx={outlinedBtnSx}
                >
                  Become Seller
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Expandable mobile search bar */}
        {!isLarge && (
          <Collapse in={mobileSearchOpen}>
            <div className="px-3 py-2 border-b bg-white">
              <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2 transition-colors focus-within:bg-gray-200">
                <SearchIcon fontSize="small" className="text-gray-500" />
                <InputBase
                  autoFocus
                  placeholder="Search products, brands and more"
                  className="ml-2 flex-1 text-sm"
                  sx={{ fontSize: 14 }}
                />
              </div>
            </div>
          </Collapse>
        )}

        {
          isLarge && showCategorySheet && (
            <div
              onMouseLeave={() => setShowCategorySheet(false)}
              onMouseOver={() => setShowCategorySheet(true)}
              className='categorySheet absolute top-[4.41rem] left-20 right-20 shadow-lg'
            >
              <CategorySheet selectedCategory={selectedCategory} setShowSheet={setShowCategorySheet} />
            </div>
          )
        }
      </Box>
    </>
  )
}

function DrawerRow({ icon, label, onClick }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      className="flex items-center justify-between gap-3 px-5 py-3.5 cursor-pointer active:bg-gray-100 hover:bg-gray-50 transition-colors"
    >
      <span className="flex items-center gap-3 text-[15px] text-gray-800">
        {icon && <span className="text-gray-500 flex">{icon}</span>}
        {label}
      </span>
      <ChevronRightIcon fontSize="small" className="text-gray-400" />
    </div>
  )
}

export default Navbar;