import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/axiosInstance";

export const getMessageBySenderAndReceiver = createAsyncThunk(
    'message/getmessage',
    
        async (data,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/message/${data.sender}/${data.receiver}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;

const MessageSlice = createSlice({
    name:'message',
    initialState:{
       
        message:null,
        showmessage:false,
        loading:null,
        error:null
       
    },
    reducers:{
     showMessage : (state)=> {
        state.showmessage = !state.showmessage;
     }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getMessageBySenderAndReceiver.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getMessageBySenderAndReceiver.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getMessageBySenderAndReceiver.fulfilled, (state, action)=>{
           state.message = action.payload;
         
        })
    }})
    export const {showMessage}= MessageSlice.actions;
    export default MessageSlice;