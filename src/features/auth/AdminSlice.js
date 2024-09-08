import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/axiosInstance";

export const getAllUser = createAsyncThunk(
    'admin/getalluser',
    
        async ({newPage, pageSize},thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/user?page=${newPage}&limit=${pageSize}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
export const addUser = createAsyncThunk(
    'admin/adduser',
    
        async (data,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                   
                const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/admin/user`, data);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
export const deleteUser = createAsyncThunk(
    'admin/deleteuser',
    
        async (id,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/admin/user/${id}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
const AdminSlice = createSlice({
    name:'admin',
    initialState:{
       
        userdetail:null,
        alluser:null,
        pageSize:5,
        useradd:{
            error:null,
            data:null,
            loading:null
        },
        deleteUser:{
            status:false,
            error:null
        }
    },
    reducers:{
        resetUserAdd:(state, action)=>{
            const data = {
                error:null,
                data:null,
                loading:null
            }
          state.useradd=data
        },
        resetUserDelete:(state, action)=>{
            const data = {
                error:null,
                status:false
            }
          state.useradd=data
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllUser.rejected, (state, action)=>{
            state.loading=false;

            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getAllUser.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllUser.fulfilled, (state, action)=>{
           state.alluser = action.payload;
           state.message = "success"
        })
        .addCase(addUser.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            const useradd = {
                error: action.payload,
                data:null,
                loading:null
            } 
           state.useradd = useradd;
    
            state.message = null
        })
        .addCase(addUser.pending, (state)=>{
            state.loading=true;
            state.error=null;
            const useradd = {
                error: null,
                data:null,
                loading:true
            } 
           state.useradd = useradd;
        })
        .addCase(addUser.fulfilled, (state, action)=>{
            state.loading=true;
            state.error=null;
            const useradd = {
                error: null,
                data:action.payload,
                loading:true
            } 
           state.useradd = useradd;
    
        })
        .addCase(deleteUser.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            const deleteUser = {
                status:false,
                error:state.error
            }
           state.deleteUser = deleteUser;
    
            state.message = null
        })
        
        .addCase(deleteUser.fulfilled, (state, action)=>{
            const deleteUser = {
                status:true,
                error:null
            }
           state.deleteUser = deleteUser;
    
        })
        }
    });
    export default AdminSlice;