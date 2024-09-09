import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/axiosInstance";

export const getCustomerByid = createAsyncThunk(
    'admincustomer/getcustomer',
    
        async (id,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/customer/getbyid/${id}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;

export const getUserByid = createAsyncThunk(
    'admincustomer/getuserr',
    
        async (id,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/user/detail/${id}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;


const AdminCustomerSlice = createSlice({
    name:'admincustomer',
    initialState:{
       
        customer:null,
        user:null,
        error:null,
        loading:null
        
       
    },
    reducers:{
     
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getCustomerByid.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getCustomerByid.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getCustomerByid.fulfilled, (state, action)=>{
           state.customer = action.payload;
         
        })
        .addCase(getUserByid.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getUserByid.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getUserByid.fulfilled, (state, action)=>{
           state.user = action.payload;
         
        })
    }})

    export default AdminCustomerSlice;