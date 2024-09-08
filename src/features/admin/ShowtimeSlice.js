import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/axiosInstance";


export const updateShowtime = createAsyncThunk(
    'adminshowtimes/getallupcomingmovies',
    
        async (_,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/movie/upcoming`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
export const getShowtimes = createAsyncThunk(
    'adminshowtimes/getallshowtime',
    
        async (data,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/showtime?page=${data.page}&limit=${data.pageSize}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;

export const addShowtime = createAsyncThunk(
    'adminshowtimes/addshowtime',
    
        async (data,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                   
                const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/admin/showtime/many`, data);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
export const deleteShowtime = createAsyncThunk(
    'adminshowtimes/deleteshowtime',
    
        async (id,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/admin/showtime/${id}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
const AdminShowtimeSlice = createSlice({
    name:'adminshowtimes',
    initialState:{
       
        showtimes:null,
        pageSize:10,
        actionShowtime:{
            error:null,
            data:null,
            loading:null,
            status:null
        },
        deleteMovie:{
            status:false,
            error:null
        }
        ,detailmovie:null
    },
    reducers:{
     
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getShowtimes.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getShowtimes.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getShowtimes.fulfilled, (state, action)=>{
           state.showtimes = action.payload;
         
        })
        .addCase(addShowtime.rejected, (state, action)=>{
            state.loading=false;
     
            state.error = action.payload;
            const  actionShowtime={
                error:action.payload,
                data:null,
                loading:null
            }
            state.actionShowtime=actionShowtime
            state.message = null
        })
        .addCase(addShowtime.pending, (state)=>{
            state.loading=true;
            state.error=null;
            const  addShowtime={
                error:null,
                data:null,
                loading:true
               
            }
            state.actionShowtime=addShowtime
        })
        .addCase(addShowtime.fulfilled, (state, action)=>{
      
           const  addShowtime={
            error:null,
            data:action.payload,
            loading:null
           
        }
        state.actionShowtime=addShowtime
        })
        .addCase(deleteShowtime.rejected, (state, action)=>{
            state.loading=false;
     
            state.error = action.payload;
            const  actionShowtime={
                error:action.payload,
                data:null,
                loading:null
                ,
                status:null
            }
            state.actionShowtime=actionShowtime
            state.message = null
        })
        .addCase(deleteShowtime.pending, (state)=>{
            state.loading=true;
            state.error=null;
            const  addShowtime={
                error:null,
                data:null,
                loading:true,
                status:null
               
            }
            state.actionShowtime=addShowtime
        })
        .addCase(deleteShowtime.fulfilled, (state, action)=>{
      
           const  addShowtime={
            error:null,
            data:action.payload,
            loading:null,
            status:true
           
        }
        state.actionShowtime=addShowtime
        })
       
       
        }
    });
    export default AdminShowtimeSlice;