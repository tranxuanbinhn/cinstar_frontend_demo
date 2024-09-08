import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/axiosInstance";

export const getAllOrder = createAsyncThunk(
    'adminorders/getallorders',
    
        async (data,thunkAPI) => { 
            try{
                console.log('action work')
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/order?page=${data.page}&limit=${data.pageSize}`);
                
       
                console.log('response.data:', response.data);
                return response.data;
            }
            catch(error)
            {
                console.log('error.response.data', error.response?.status);
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
            console.log('state.error ', state.error )
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