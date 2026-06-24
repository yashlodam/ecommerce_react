import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todosReducer from '../features/todos/todosSlice'
import filtersReducer from '../features/filters/filtersSlice'

const rootReducer = combineReducers({
    
})

export const Store = configureStore({
  reducer:rootReducer
})

