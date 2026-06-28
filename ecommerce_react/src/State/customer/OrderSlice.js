import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

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