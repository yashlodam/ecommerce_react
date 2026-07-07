import React, { useEffect } from 'react'
import Navbar from './customer/components/Navbar/Navbar'
import { ThemeProvider } from '@emotion/react'
import customeTheme from "./Theme/customeTheme";
import Home from './customer/pages/Home/Home';
import Product from './customer/pages/product/Product';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ProductDetails from './customer/pages/ProductDetails/ProductDetails';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import BecomeSeller from './customer/pages/Become_seller/BecomeSeller';
import SellerDashboard from './seller/pages/SellerDashboard/SellerDashboard';
import Dashboard from './admin/pages/Dashboard/Dashboard';
import AdminDashboard from './admin/pages/Dashboard/Dashboard';
import { store, useAppDispatch, useAppSelector } from './State/Store';

import LoginForm from './customer/pages/Auth/LoginForm';
import Auth from './customer/pages/Auth/Auth';
import { fetchCurrentRole, fetchUserProfile } from './State/AuthSlice';
import PaymentSucess from './customer/PaymentSucess';
import Wishlist from './customer/Wishlist/Wishlist';
import { homeCategories } from './data/HomeCategories';
import { createHomeCategories } from './State/customer/CustomerSlice';
import ScrollToTop from './ScrollToTop';
import SearchPage from './customer/pages/SearchPage';
import AdminNavbar from './admin/components/AdminNavbar';
import { fetchSellerProfile } from './State/seller/sellerSlice';
import SellerNavbar from './seller/components/SellerNavbar';

function App() {
  
  const { auth, seller } = useAppSelector((store) => store);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

useEffect(() => {

    const initialize = async () => {

        const jwt = localStorage.getItem("jwt");

        if (!jwt) {
            dispatch(createHomeCategories(homeCategories));
            return;
        }

        try {

            const role = await dispatch(fetchCurrentRole(jwt)).unwrap();

            if (role === "ROLE_SELLER") {
                await dispatch(fetchSellerProfile(jwt));
            } else {
                await dispatch(fetchUserProfile(jwt));
            }

        } catch (error) {
            console.log(error);
        }

        dispatch(createHomeCategories(homeCategories));
    };

    initialize();

}, [dispatch]);


const renderNavbar = () => {

    if (auth.role === "ROLE_ADMIN") {
        return <AdminNavbar />;
    }

    if (auth.role === "ROLE_SELLER") {
        return <SellerNavbar />;
    }

    return <Navbar />;
};

  return (
    <ThemeProvider theme={customeTheme}>
      <div>
        {renderNavbar()}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success/:orderId" element={<PaymentSucess />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;