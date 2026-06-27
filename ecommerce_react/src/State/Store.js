import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from './seller/sellerProductSlice'
import productSlice from './customer/ProductSlice'
import authSlice from './AuthSlice'
const rootReducer = combineReducers({

  seller:sellerSlice,
  sellerProduct:sellerProductSlice,
  product:productSlice,
  auth:authSlice
})

export const store = configureStore({
  reducer: rootReducer,
})


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

