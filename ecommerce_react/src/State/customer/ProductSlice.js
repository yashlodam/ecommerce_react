import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5454";

export const fetchProductById = createAsyncThunk("products/fetchProductById",
    async(productId ,{isRejectedWithValue})=>{
        try{
            const response = await axios.get(`${API_URL}/ products/${productId}`)

            console.log("fetch Product By id",response.data);

        } catch(error){
            console.log("error :"+error)
            
        }
    }
)


export const searchProduct = createAsyncThunk("products/searchProduct",
    async(query ,{isRejectedWithValue})=>{
        try{
            const response = await axios.get(`${API_URL}/ products/search`,{
                params:{
                    query,
                },
            })

            console.log("search products :",response.data);

        } catch(error){
            console.log("error :"+error)
            
        }
    }
)


export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: {
          ...params,
          pageNumber: params?.pageNumber ?? 0,
        },
      });

      console.log("Fetched Products:", response.data);

      return response.data;
    } catch (error) {
      console.error("Fetch Products Error:", error);

      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);


const intialState = {
    product:null,
    products:[],
    totalPages:1,
    loading:false,
    error:null,
    searchProduct:[]
}


const productSlice = createSlice({
    name:"products",
    intialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProductById.pending,(state)=>{
            state.loading=true
        });
         builder.addCase(fetchProductById.fulfilled,(state,action)=>{
            state.loading=false
            state.product = action.payload
        })
         builder.addCase(fetchProductById.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.error
        })

    }
})