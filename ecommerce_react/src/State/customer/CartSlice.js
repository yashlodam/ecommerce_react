import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


import { sumCartItemMrpPrice } from "../../Util/sumCartItemMrpPrice";
import { sumCartItemSellingPrice } from "../../Util/sumCartItemSellingPrice"
import { applyCoupon } from "./CouponSlice";
import { api } from "../../config/Api";

const API_URL = "/api/cart";

export const fetchUserCart = createAsyncThunk("/cart/fetchUserCart",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });
      console.log("Cart fetched ", response.data);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)


export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ jwt, request }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(
        "/api/cart/add",
        request,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Fetch updated cart
      dispatch(fetchUserCart(jwt));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item"
      );
    }
  }
);


export const deleteCartItem = createAsyncThunk(
  "cart/deleteItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {

    try {

      await api.delete(
        `/api/cart/item/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );

      return cartItemId;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message || "Delete failed"
      );

    }

  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateItem",
  async (
    { jwt, cartItemId, cartItem },
    { rejectWithValue }
  ) => {

    try {

      const response = await api.put(
        `/api/cart/item/${cartItemId}`,
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }
      );
      console.log("cart item updating....")
      console.log(response.data)
      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data?.message || "Update failed"
      );

    }

  }
);



const initialState = {
  cart: null,
  loading: false,
  error: null,

};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.loading = false
    })

    builder.addCase(fetchUserCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })
    builder.addCase(addItemToCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
  
  state.loading = false;
});

    builder.addCase(addItemToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })


    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
  if (state.cart) {
    state.cart.cartItems = state.cart.cartItems.filter(
      (item) => item.id !== action.payload
    );

    state.cart.totalMrpPrice = sumCartItemMrpPrice(state.cart.cartItems);

    state.cart.totalSellingPrice = sumCartItemSellingPrice(
      state.cart.cartItems
    );

    state.cart.totalItem = state.cart.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  state.loading = false;
});
    builder.addCase(updateCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateCartItem.fulfilled, (state, action) => {
  if (state.cart) {
    const index = state.cart.cartItems.findIndex(
      (item) => item.id === action.meta.arg.cartItemId
    );

    if (index !== -1) {
      state.cart.cartItems[index] = {
        ...state.cart.cartItems[index],
        ...action.payload,
      };
    }

    state.cart.totalMrpPrice = sumCartItemMrpPrice(state.cart.cartItems);
    state.cart.totalSellingPrice = sumCartItemSellingPrice(state.cart.cartItems);
    state.cart.totalItem = state.cart.cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
  }

  state.loading = false;
});
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload
    })
    builder.addCase(applyCoupon.fulfilled, (state, action) => {
      state.loading = false
      state.cart = action.payload
    })
  }
})


export default cartSlice.reducer;
export const { resetCartState } = cartSlice.actions;