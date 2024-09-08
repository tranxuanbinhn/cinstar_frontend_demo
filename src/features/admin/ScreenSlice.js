import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/axiosInstance";

export const getAllScreenByTheaterId = createAsyncThunk(
    'adminscreen/getallscreen',
    
        async (id,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/screen/${id}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;

const AdminScreenSlice = createSlice({
    name:'adminscreen',
    initialState:{
       
        screens:null,
       
    },
    reducers:{
     
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllScreenByTheaterId.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getAllScreenByTheaterId.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllScreenByTheaterId.fulfilled, (state, action)=>{
           state.screens = action.payload;
         
        })
    }})

    export default AdminScreenSlice;