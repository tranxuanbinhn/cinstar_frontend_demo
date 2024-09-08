import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const paymentOrder = createAsyncThunk(
    'payment/buy',
    async (data,thunkAPI)=>{
        try{
           
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/vnpay/make?vnp_OrderInfor=${data.infor}&vnp_OrderType=190001&vnp_Amount=${data.total}&vnp_Locale=vn`);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  export const createpayment = createAsyncThunk(
    'payment/create',
    async (data,thunkAPI)=>{
        try{
           
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/payment`,data);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
  export const getResultPayment = createAsyncThunk(
    'payment/result',
    async (data,thunkAPI)=>{
        try{
           
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/vnpay/result?vnp_Amount=${data.vnp_Amount}&vnp_BankCode=${data.vnp_BankCode}
                &vnp_BankTranNo=${data.vnp_BankTranNo}&vnp_CardType=${data.vnp_CardType}&vnp_OrderInfo=${data.vnp_OrderInfo}&vnp_PayDate=${data.vnp_PayDate}&vnp_ResponseCode=${data.vnp_ResponseCode}
                &vnp_TmnCode=${data.vnp_TmnCode}&vnp_TransactionNo=${data.vnp_TransactionNo}&vnp_TransactionStatus=${data.vnp_TransactionStatus}
                &vnp_TxnRef=${data.vnp_TxnRef}&vnp_SecureHash=${data.vnp_SecureHash}`);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
const PaymentSlice = createSlice({
    name:'payment',
    initialState:{
     
        loading:null,
        error:null,
        payment:null,
        result:null,
        errorpayment:null,
        createpayment:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(paymentOrder.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(paymentOrder.fulfilled, (state, action)=>{
           
            
            state.loading=false;
            state.payment=action.payload;
            
        })
        .addCase(paymentOrder.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
        .addCase(getResultPayment.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getResultPayment.fulfilled, (state, action)=>{
           
            
            state.loading=false;
            state.result=action.payload;
            
        })
        .addCase(getResultPayment.rejected, (state, action)=>{
            state.loading=false;
        
            state.errorpayment = action.payload || "Something went wrong";
             
        })
        .addCase(createpayment.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createpayment.fulfilled, (state, action)=>{
           
            
            state.loading=false;
            state.createpayment=action.payload;
            
        })
        .addCase(createpayment.rejected, (state, action)=>{
            state.loading=false;
        
            state.errorpayment = action.payload || "Something went wrong";
             
        })
       
    }
});

export default PaymentSlice;   