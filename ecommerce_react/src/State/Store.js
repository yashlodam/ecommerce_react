import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice"

const rootReducer = combineReducers({

  seller:sellerSlice,
  
})

export const store = configureStore({
  reducer: rootReducer,
})


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

