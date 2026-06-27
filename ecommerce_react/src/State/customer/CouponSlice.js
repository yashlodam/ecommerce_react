import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "/api/coupons";

export const applyCoupon = createAsyncThunk("coupon/applyCoupon",
    async({apply,code,orderValue,jwt},{rejectWithValue})=>{
        try{
            const response = await api.post(`${API_URL}/apply`,null,{
                params: {apply,code,orderValue},
                headers: {
                    Authorization:`Bearer ${jwt}`
                },

            })

            console.log("apply coupon",response.data)
            return response.data
        } 
        catch(error){
            
        }
    }
)