import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/axiosInstance";

export const getAllOrder = createAsyncThunk(
    'adminorders/getallorders',
    
        async (data,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/order?page=${data.page}&limit=${data.pageSize}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;

const AdminOrderSlice = createSlice({
    name:'adminorders',
    initialState:{
       
        orders:null,
       
    },
    reducers:{
     
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllOrder.rejected, (state, action)=>{
            state.loading=false;

            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getAllOrder.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllOrder.fulfilled, (state, action)=>{
           state.orders = action.payload;
         
        })
    }})

    export default AdminOrderSlice;