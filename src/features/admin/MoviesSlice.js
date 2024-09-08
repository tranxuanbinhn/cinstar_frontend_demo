import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/axiosInstance";

export const getAllSystemUpcommingMovies = createAsyncThunk(
    'adminmovies/getallupcomingmovies',
    
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
export const getAllSystemNowshowingMovies = createAsyncThunk(
    'adminmovies/getallnowshowingmovies',
    
        async (_,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/movie/nowshowing`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
export const getDetailMovies = createAsyncThunk(
    'adminmovies/getdetailmovie',
    
        async (id,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/admin/movie/detail?id=${id}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
export const addMovie = createAsyncThunk(
    'admin/addmovie',
    
        async (data,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                   
                const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/admin/movie/add`, data);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
export const deleteMovie = createAsyncThunk(
    'admin/deletemovie',
    
        async (id,thunkAPI) => { 
            try{
                 
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/api/admin/movie/delete/${id}`);
                
       
                 
                return response.data;
            }
            catch(error)
            {
                 
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;
const AdminMoviesSlice = createSlice({
    name:'adminmovies',
    initialState:{
       
        systemupcommingmovies:null,
        systemnowshowingmovies:null,
        pageSize:5,
        usermovie:{
            error:null,
            data:null,
            loading:null
        },
        deleteMovie:{
            status:false,
            error:null
        }
        ,detailmovie:null
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
        .addCase(getDetailMovies.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getDetailMovies.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getDetailMovies.fulfilled, (state, action)=>{
           state.detailmovie = action.payload;
           state.message = "success"
        })
        .addCase(getAllSystemUpcommingMovies.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getAllSystemUpcommingMovies.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllSystemUpcommingMovies.fulfilled, (state, action)=>{
           state.systemupcommingmovies = action.payload;
           state.message = "success"
        })
        .addCase(getAllSystemNowshowingMovies.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            state.message = null
        })
        .addCase(getAllSystemNowshowingMovies.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllSystemNowshowingMovies.fulfilled, (state, action)=>{
           state.systemnowshowingmovies = action.payload;
           state.message = "success"
        })
        .addCase(addMovie.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            const usermovie = {
                error: action.payload,
                data:null,
                loading:null
            } 
           state.usermovie = usermovie;
    
            state.message = null
        })
        .addCase(addMovie.pending, (state)=>{
            state.loading=true;
            state.error=null;
            const useradd = {
                error: null,
                data:null,
                loading:true
            } 
           state.addMovie = useradd;
        })
        .addCase(addMovie.fulfilled, (state, action)=>{
            state.loading=true;
            state.error=null;
            const useradd = {
                error: null,
                data:action.payload,
                loading:false
            } 
           state.addMovie = useradd;
    
        })
        .addCase(deleteMovie.rejected, (state, action)=>{
            state.loading=false;
             
            state.error = action.payload;
             
            const deleteMovie = {
                status:false,
                error:state.error
            }
           state.deleteMovie = deleteMovie;
    
            state.message = null
        })
        
        .addCase(deleteMovie.fulfilled, (state, action)=>{
            const deleteMovie = {
                status:true,
                error:null
            }
           state.deleteMovie = deleteMovie;
    
        })
        }
    });
    export default AdminMoviesSlice;