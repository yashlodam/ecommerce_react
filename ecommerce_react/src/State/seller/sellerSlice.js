import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerProfile = createAsyncThunk("/sellers/fetchSellerProfile",
    async(jwt)=>{
        try{

            const response = await api.get("/sellers/profile",{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            })

            console.log("FETCH seller profile",response);
            
        } catch(error){
            console.log(error)
        }
    }
)