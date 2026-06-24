import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import todosReducer from "../features/todos/todosSlice";
import filtersReducer from "../features/filters/filtersSlice";

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;