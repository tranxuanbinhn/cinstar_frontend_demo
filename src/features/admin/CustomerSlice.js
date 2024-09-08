import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/axiosInstance";

export const getCustomerByid = createAsyncThunk(
    'admincustomer/getcustomer',
    
        async (id,thunkAPI) => { 
            try{
                console.log('action work')
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/customer/getbyid/${id}`);
                
       
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

export const getUserByid = createAsyncThunk(
    'admincustomer/getuserr',
    
        async (id,thunkAPI) => { 
            try{
                console.log('action work')
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/user/detail/${id}`);
                
       
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
            console.log('action.payload.message',action.payload.message)
            state.error = action.payload;
            console.log('state.error ', state.error )
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
            console.log('action.payload.message',action.payload.message)
            state.error = action.payload;
            console.log('state.error ', state.error )
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