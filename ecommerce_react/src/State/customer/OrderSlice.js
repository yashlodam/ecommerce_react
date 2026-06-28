import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import axios from "axios";

const API_URL = "/api/orders";

export const fetchUserOrderHistory = createAsyncThunk("orders/fetchUserOrderHistory",
    async(jwt,{rejectWithValue})=>{
        try{
            const response = await api.get(`${API_URL}/user`,{
                headers:{
                    Authorization : `Bearer ${jwt}`
                }
            })

            console.log("order history fetched",response.data);
            return response.data
        }
        catch(error){
            console.log("error",error.response);
            return rejectWithValue(
                error.response.data.error || "Failed to fetch order history"
            );
        }
        
    }
)


export const fetchOrderById = createAsyncThunk("orders/fetchOrderById",
    async({orderId,jwt},{rejectWithValue})=>{
        try{
            const response = await api.get(`${API_URL}/${orderId}`,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log("order fetched",response.data)
            return response.data;
        }
        catch(error){
            console.log("error",error.response);
            return rejectWithValue(
                "Failed to fetch order"
            );
        }
    
    }

)

export const createOrder = createAsyncThunk("orders/createOrder",
    async({address,jwt,paymentGateway},{rejectWithValue})=>{
        try{
            const response = await api.post(API_URL,address,{
                headers:{
                    Authorization: `Bearer ${jwt}`
                },
                params:{
                    paymentMethod:paymentGateway
                }
            })

            console.log("order created",response.data);
            if(response.data.payment_link_url){
                window.location.href = response.data.payment_link_url
            }
            return response.data;
        }
        catch(error){
           console.log("error",error.response)
           return rejectWithValue("Failed to create order") 
        }
    }
)

export const fetchOrderItemById = createAsyncThunk("/orders/fetchOrderItemById",
    async({orderItemId,jwt},{rejectWithValue})=>{
        try{
            const response = await api.get(`${API_URL}/item/${orderItemId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })

            console.log("order item fetched",response.data);
            return response.data
        }
        catch(error){
            console.log("error",error.response);
            return rejectWithValue("Failed to create order");
        }
    }
)

export const paymentSuccess = createAsyncThunk("orders/paymentSucess",
    async({paymentId,jwt,paymentLinkId},{rejectWithValue})=>{
        try{
            const response = await api.get(`/api/payment/${paymentId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
                params:{paymentLinkId}
            })

            console.log("payment success",response.data)
            return response.data
        }
        catch(error){
            return rejectWithValue("Failed to process payemnt");
        }

    }
)


export const cancelOrder = createAsyncThunk("orders/cancelOrder",
    async(orderId,{rejectWithValue})=>{
        try{
            const response = await api.put(`${API_URL}/${orderId}/cancel`,{},{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            console.log("cancel order ",response.data)

            return response.data;
        }
        catch(error){
            console.log("error",error.response)
            if(axios.isAxiosError(error) && error.response){
                return rejectWithValue(error.response.data)
            }

            return rejectWithValue("An error occurred while cancelling the order");
        }
    }
)

const initialState = {
    orders : [],
    orderCanceled: false,
    loading : true,
    error: null,
    currentOrder:null,
    paymentOrder: null

}

const orderSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchUserOrderHistory.pending,(state)=>{
            state.loading = true;
            state.error = null;
            state.orderCanceled = false;
        })
        .addCase(fetchUserOrderHistory.fulfilled,(state,action)=>{
            state.orders = action.payload;
            state.loading = false;
        })
        .addCase(fetchUserOrderHistory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload

        })

        //fetch order by id
        .addCase(fetchOrderById.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrderById.fulfilled,(state,action)=>{
            state.currentOrder = action.payload;
            state.loading = false
        })
        .addCase(fetchOrderById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        //create a new order
        .addCase(createOrder.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.paymentOrder = action.payload;
            state.loading = false;
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })

        // fetch order item by id
    }
})