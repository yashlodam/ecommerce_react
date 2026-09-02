import React, { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import customeTheme from "./Theme/customeTheme";
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
import Auth from "./customer/pages/Auth/Auth";

// Seller / Admin dashboards
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/Dashboard";

// State
import { useAppDispatch, useAppSelector } from "./State/Store";
import { fetchCurrentRole, fetchUserProfile } from "./State/AuthSlice";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import { createHomeCategories } from "./State/customer/CustomerSlice";
import { homeCategories } from "./data/HomeCategories";

// Auth guard
import ProtectedRoute from "./Routes/ProtectedRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSeller = location.pathname.startsWith("/seller");
  const isAdmin = location.pathname.startsWith("/admin");

  // ─── Bootstrap on mount ─────────────────────────────────────────────────────
  useEffect(() => {
    const initialize = async () => {
      const jwt = localStorage.getItem("jwt");

      // Always seed home categories for the homepage
      dispatch(createHomeCategories(homeCategories));

      if (!jwt) return;

      try {
        const role = await dispatch(fetchCurrentRole()).unwrap();

        if (role === "ROLE_SELLER") {
          await dispatch(fetchSellerProfile());
        } else {
          await dispatch(fetchUserProfile());
        }
      } catch {
        // JWT is invalid / expired — the 401 interceptor will handle redirect
      }
    };

    initialize();
  }, [dispatch]);

  return (
    <ThemeProvider theme={customeTheme}>
      <div>
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
      </div>
    </ThemeProvider>
  );
}

export default App;