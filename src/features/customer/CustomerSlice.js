import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const saveCustomer = createAsyncThunk(
    'customer/save',
    async (data,thunkAPI)=>{
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/customer`, data);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
const CustomerSlice = createSlice({
    name:'customer',
    initialState:{
        customer:null,
        loading:null,
        error:null,
        draftcustomer:null
    },
    reducers:{
        draftcustomer:(state, action)=> {
            state.savecustomer=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(saveCustomer.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(saveCustomer.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.customer=action.payload;
            
        })
        .addCase(saveCustomer.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
       
    }
});
export const {draftcustomer} = CustomerSlice.actions;
export default CustomerSlice;   