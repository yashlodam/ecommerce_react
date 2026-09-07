import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from './seller/sellerProductSlice'
import sellerDealSlice from './seller/sellerDealSlice'
import productSlice from './customer/ProductSlice'
import authSlice from './AuthSlice'
import cartSlice from './customer/CartSlice'
import orderSlice from './customer/OrderSlice'
import wishlistSlice from './customer/WishlistSlice'
import sellerOrderSlice from './seller/sellerOrderSlice'
import transactionSlice from './seller/transactionSlice'
import homeSlice from './customer/CustomerSlice'
import homeCategorySlice from './admin/adminSlice'
import adminFetchSlice from './admin/adminFetchSlice'
import couponSlice from './customer/CouponSlice'
import chatSlice from './customer/ChatSlice'
import notificationSlice from './customer/notificationSlice'

const appReducer = combineReducers({
  seller: sellerSlice,
  sellerProduct: sellerProductSlice,
  sellerDeal: sellerDealSlice,
  product: productSlice,
  auth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  sellerOrder: sellerOrderSlice,
  transaction: transactionSlice,
  customer: homeSlice,
  home: homeSlice,
  coupon: couponSlice,
  admin: homeCategorySlice,
  homeCategory: homeCategorySlice,
  adminFetch: adminFetchSlice,
  chat: chatSlice,
  notifications: notificationSlice,
})

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout/fulfilled' || action.type === 'auth/logout/pending') {
    // Preserve public catalog data while purging all user session data immediately
    state = {
      product: state?.product,
      customer: state?.customer,
      home: state?.home,
      admin: state?.admin,
      homeCategory: state?.homeCategory,
      adminFetch: state?.adminFetch,
      auth: {
        jwt: null,
        role: null,
        otpSend: false,
        isLoggedIn: false,
        user: null,
        loading: false,
        authChecking: false,
        error: null,
      },
    };
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
})


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

