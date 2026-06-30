import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from './seller/sellerProductSlice'
import productSlice from './customer/ProductSlice'
import authSlice from './AuthSlice'
import cartSlice from './customer/CartSlice'
import orderSlice from './customer/OrderSlice'
import wishlistSlice from './customer/WishlistSlice'
import sellerOrderSlice from './seller/sellerOrderSlice'
const rootReducer = combineReducers({

  seller:sellerSlice,
  sellerProduct:sellerProductSlice,
  product:productSlice,
  auth:authSlice,
  cart:cartSlice,
  order:orderSlice,
  wishlist: wishlistSlice,
  sellerOrder: sellerOrderSlice

})

export const store = configureStore({
  reducer: rootReducer,
})


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

