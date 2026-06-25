import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";




export const fetchSellerProduct = createAsyncThunk("/sellerProduct/fetchSellerProduct",
    async(jwt)=>{
        try{

            const response = await api.get("/sellers/products",{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            })
            console.log("fetch seller Product",response.data)
            return response.data
            
        } catch(error){
            console.log(error)
        }
    }
)


export const createProduct = createAsyncThunk("/sellerProduct/createProduct",
    async(jwt)=>{
        try{

            const response = await api.post("/sellers/products",{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            })
            console.log("seller product created successfully",response.data)
            return response.data
            
        } catch(error){
            console.log(error)
        }
    }
)

const initialState = {
    products:[],
    loading:false,
    error:null,
}

const sellerProductSlice = createSlice({
    name:"SellerProduct",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchSellerProduct.pending,(state)=>{
            state.loading=true;
        }),
        builder.addCase(fetchSellerProduct.fulfilled,(state,action)=>{
            state.loading=false,
            state.products = action.payload;
        }),
        builder.addCase(fetchSellerProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        }),



        builder.addCase(createProduct.pending,(state)=>{
            state.loading=true;
        }),
        builder.addCase(createProduct.fulfilled,(state,action)=>{
            state.loading=false,
            state.products.push(action.payload)
        }),
        builder.addCase(createProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})

export default sellerProductSlice.reducer;