import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const initialState = {
    transactions : [],
    transaction : null,
    loading : false,
    error:null
}


export const fetchTransactionsBySeller = createAsyncThunk("transactions/fetchTransactionsBySeller",
    async(jwt,{rejectWithValue})=>{
        try{
            const response = await api.get("/api/transactions/seller",{
                headers:{
                    Authorization: `Bearer ${jwt}`
                }
            })

            console.log("fetchtransactionsByseller",response.data);

            return response.data;
        }
        catch(error){
            if(error.response){
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue("Failed to fetch transactions");
        }
    }
)