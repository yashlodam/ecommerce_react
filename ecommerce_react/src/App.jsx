import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

// Layouts
import Navbar from "./customer/components/Navbar/Navbar";
import AdminNavbar from "./admin/components/AdminNavbar";
import SellerNavbar from "./seller/components/SellerNavbar";

// Customer pages
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/product/Product";
import ProductDetails from "./customer/pages/ProductDetails/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Wishlist from "./customer/Wishlist/Wishlist";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import BecomeSeller from "./customer/pages/Become_seller/BecomeSeller";
import PaymentSucess from "./customer/PaymentSucess";
import OrderSuccess from "./customer/OrderSuccess";
import SearchPage from "./customer/pages/SearchPage";
import DealsPage from "./customer/pages/Deals/DealsPage";
import CategoriesPage from "./customer/pages/Categories/CategoriesPage";
import Auth from "./customer/pages/Auth/Auth";
import AiChatWidget from "./customer/components/AiChat/AiChatWidget";
import CartDrawer from "./customer/components/Cart/CartDrawer";
import MobileBottomNav from "./customer/components/Navbar/MobileBottomNav";

// Seller / Admin dashboards
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/Dashboard";

// State
import { useAppDispatch, useAppSelector } from "./State/Store";
import { fetchCurrentRole, fetchUserProfile, refreshToken, setAuthChecking } from "./State/AuthSlice";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import { fetchHomePageData } from "./State/customer/CustomerSlice";

// Auth guard
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSeller = location.pathname.startsWith("/seller");
  const isAdmin = location.pathname.startsWith("/admin");
  const isCheckout = location.pathname.startsWith("/checkout") || location.pathname.startsWith("/order-success");
  const isProductDetails = location.pathname.startsWith("/product-details");
  const isCart = location.pathname.startsWith("/cart");

  // ─── Bootstrap on mount (Silent Refresh via HttpOnly cookie) ─────────────────
  useEffect(() => {
    const initialize = async () => {
      // Load live homepage categories and promotional deals
      dispatch(fetchHomePageData());

      try {
        // Attempt silent refresh using the HttpOnly refresh token cookie
        const authData = await dispatch(refreshToken()).unwrap();

        if (authData?.jwt) {
          const role = authData?.role;
          if (role === "ROLE_SELLER") {
            await dispatch(fetchSellerProfile());
          } else {
            await dispatch(fetchUserProfile());
          }
        }
      } catch {
        // No active session or refresh token expired — user continues as guest
      } finally {
        dispatch(setAuthChecking(false));
      }
    };

    initialize();
  }, [dispatch]);

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 ${!isAdmin && !isSeller && !isCheckout && !isProductDetails && !isCart ? "pb-16 md:pb-0" : ""}`}>
        {/* Show the correct navbar based on current section */}
        {isAdmin ? (
          <AdminNavbar />
        ) : isSeller ? (
          <SellerNavbar />
        ) : (
          <Navbar />
        )}

        <ScrollToTop />

        <Routes>
          {/* ── Public routes ─────────────────────────────────────────────── */}
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:productId"
            element={<ProductDetails />}
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/login" element={<Auth />} />

          {/* ── Protected customer routes ──────────────────────────────────── */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success/:orderId"
            element={
              <ProtectedRoute>
                <PaymentSucess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/*"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />

          {/* ── Protected seller routes ────────────────────────────────────── */}
          <Route
            path="/seller/*"
            element={
              <ProtectedRoute role="ROLE_SELLER">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />

          {/* ── Protected admin routes ─────────────────────────────────────── */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="ROLE_ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Customer Global Drawers & Navigation */}
        {!isAdmin && !isSeller && (
          <>
            <CartDrawer />
            {!isCheckout && !isProductDetails && !isCart && <MobileBottomNav />}
            <AiChatWidget />
          </>
        )}
      </div>
  );
}

export default App;