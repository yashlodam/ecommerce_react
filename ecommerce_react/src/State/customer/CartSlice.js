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