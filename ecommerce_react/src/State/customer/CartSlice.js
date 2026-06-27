import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import api from "../../config/Api"

const  API_URL = "/api/cart";

export const fetchUserCart = createAsyncThunk("/cart/fetchUserCart",
    async(jwt,{rejectWithValue}) =>{
        try{
            const response = await api.get(API_URL,{
                headers:{
                    Authorization : `Bearer ${jwt}`,
                }
            });
            console.log("Cart fetched ", response.data);
            return response.data
        } catch(error){
            console.log(error)
        }
    }
)


export const addItemToCart = createAsyncThunk("/cart/addItemToCart",
    async(jwt,request,{rejectWithValue})=>{
        try{
            const response = await api.put(`${API_URL}/add`,request,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })

            console.log("Cart added",response.data)
            return response.data
        } catch(error){
            console.log(error)
        }
    }
)


export const deleteCartItem = createAsyncThunk("/cartdeleteCartItem",
    async(jwt,cartItemId,{rejectWithValue})=>{
        try{
            const response = await api.delete(`${API_URL}/item/${cartItemId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })

            return response.data
        }
        catch(error){
            console.log(error);
            return rejectWithValue(
                error.response.data.message || "Failed to delete cart item"
            )
        }
    }
)

export const updateCartItem = createAsyncThunk("cart/updateCartItem",
    async(jwt,cartItemId,cartItem,{rejectWithValue})=>{
        try{
            const response = await api.put(`${API_URL}/item/${cartItemId}`,
                cartItem,
                {
                    headers : {
                        Authorization : `Bearer ${jwt}`
                    }
                }
            )

            return response.data
        }
        catch(errror){
            return rejectWithValue(
                error.response.data.message || "Failed to update cart item"
            )
        }
    }
)

const initialState = {
    cart : null,
    loading : false,
    error: null,

};


const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers:{
        resetCartState : (state)=>{
            state.cart = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUserCart.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchUserCart.fulfilled,(state,action)=>{
            state.cart = action.payload;
            state.loading = false
        })

        builder.addCase(fetchUserCart.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload
        })
        builder.addCase(addItemToCart.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(addItemToCart.fulfilled,(state,action)=>{
            if(state.cart){
               state.cart.cartItems.push(action.payload);
            }
            state.loading = false;
        })

        builder.addCase(addItemToCart.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload
        })
    }
})