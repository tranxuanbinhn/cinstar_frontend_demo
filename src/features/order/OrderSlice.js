import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '~/api/axiosInstance';


export const getScreenById = createAsyncThunk(
    'order/getbyid',
    async (id,thunkAPI)=>{
        try{
           
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/screen/getbyid/${id}`);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  export const getTicket= createAsyncThunk(
    'order/getticketbyorderid',
    async (id,thunkAPI)=>{
        try{
           
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/order/ticket/${id}`);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  export const createfoodRelation = createAsyncThunk(
    'order/foodrelation',
    async (data,thunkAPI)=>{
        try{
           
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/foodrelation`, data);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  export const createticketRelation = createAsyncThunk(
    'order/ticketrelation',
    async (data,thunkAPI)=>{
        try{
           
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/ticketrelation`, data);
             
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  export const createticketOrder = createAsyncThunk(
    'order/ticketorder',
    async (data,thunkAPI)=>{
        try{
           
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/ticketorder`, data);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  export const createOrder = createAsyncThunk(
    'order/order',
    async (data,thunkAPI)=>{
        try{
           
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/order`, data);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  export const deleteOrder = createAsyncThunk(
    'order/deleteorder',
    async (id,thunkAPI)=>{
        try{
           
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/order/${id}`);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  export const getAllOrderByUser = createAsyncThunk(
    'order/getallbyuser',
    async (data,thunkAPI)=>{
        try{
           
            const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/information/getallorders/${data}`);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.status);
        }
    }
  )
const OrderSlice = createSlice({
    name:'order',
    initialState:{
        orderinfor:null,
        loading:null,
        error:null,
        time:300, 
        count:false,
        foodrelation:null,
        ticketrelation:null,
        ticketorder:null,
        orders:null,
        deletestatus:null,
        success: false,
        showticket:300,
        tickeresponse:null,
        allordergetbyuser:null
    },
    reducers:{
        orderinfor: (state, action)=> {
            state.orderinfor = action.payload;
        },
        decrementSecond:(state => {
            state.time-=1;
        }),
        showticketSecond:(state => {
            state.showticket-=1;
        }),
        setcount:(state, action) => {
            state.count = action.payload;
        },
        setcount300:(state) => {
            state.time = 300;
        },
        setsuccess:(state, action) => {
            state.success = action.payload;
        },
        
        deleteorder:(state)=>{
            state.orders = null;
        },
        deleteticketorder:(state)=>{
            state.ticketorder = null;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getScreenById.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getScreenById.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.screen=action.payload;
            
        })
        .addCase(getScreenById.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
        .addCase(createfoodRelation.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createfoodRelation.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.foodrelation=action.payload;
            
        })
        .addCase(createfoodRelation.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
        .addCase(createticketRelation.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createticketRelation.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.ticketrelation=action.payload;
            
        })
        .addCase(createticketRelation.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
        .addCase(createticketOrder.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createticketOrder.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.ticketorder=action.payload;
            
        })
        .addCase(createticketOrder.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
        .addCase(createOrder.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createOrder.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.orders=action.payload;
            
        })
        .addCase(createOrder.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
        .addCase(deleteOrder.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(deleteOrder.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.deletestatus=action.payload;
            
        })
        .addCase(getTicket.pending, (state, action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getTicket.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.tickeresponse=action.payload;
            
        })
        .addCase(getTicket.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
        .addCase(getAllOrderByUser.pending, (state, action)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllOrderByUser.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.allordergetbyuser=action.payload;
            
        })
        .addCase(getAllOrderByUser.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
    }
});
export const {orderinfor,decrementSecond,setcount,setsuccess,showticketSecond,setcount300,  deleteorder, deleteticketorder} = OrderSlice.actions;
export default OrderSlice;   