import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";


const API_URL = '/admin';

export const updateHomeCategory = createAsyncThunk("homeCategory/updateHomeCategory",
    async({id,data},{rejectWithValue})=>{
        try{
            const response = await api.patch(`${API_URL}/home-category/${id}`,data);

            console.log("category updated",response)

            return response.data;
        }
        catch(error){
            console.log("error",error)
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data)
            }
            else{
                return rejectWithValue('An error occurred while updating the category')
            }
        }
    }
)