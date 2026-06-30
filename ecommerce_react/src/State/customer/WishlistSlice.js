import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from "../../config/Api"


const initialState = {
    wishlist:null,
    loading : false,
    error : null
}


export const getWishlistByUserId = createAsyncThunk("wishlist/getWishlistByUserId",
    async(userId ,{rejectWithValue})=>{
        try{
            const response = await api.get(`/api/wishlist/${userId}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                },
            })
            console.log("whishlist fetch",response.data);

            return response.data;
        }
        catch(error){
            console.log("error",error)
            return rejectWithValue(
                error.response?.data.message || "Failed to fetch wishlist"
            )
        }
    }
)

export const addProductToWishlist = createAsyncThunk("wishlist/addProductToWishlist",
    async({productId,jwt},{rejectWithValue})=>{
        try{
            const response = await api.post(`/api/wishlist/add-product/${productId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })

            console.log("add product",response.data)

            return response.data;
        }
        catch(error){
            return rejectWithValue(
                error.response?.data.message || "Failed to add product to wishlist"
            )
        }
    }
)


const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        resetWishlistState:(state)=>{
            state.wishlist = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(getWishlistByUserId.pending,(sta))
    }
})