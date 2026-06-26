import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice"
import sellerProductSlice from './seller/sellerProductSlice'
import productSlice from './customer/ProductSlice'
const rootReducer = combineReducers({

  seller:sellerSlice,
  sellerProduct:sellerProductSlice,
  product:productSlice
})

export const store = configureStore({
  reducer: rootReducer,
})


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

