import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const getNewMovie = createAsyncThunk(
    'movie/getnew',
    async (thunkAPI)=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/movie/newmovie`);
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)
export const getShowingMovie = createAsyncThunk(
    'movie/showingmovie',
    async (thunkAPI)=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/movie/showing`);
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)
export const getUpcommingMovie = createAsyncThunk(
    'movie/upcommingmovie',
    async (thunkAPI)=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/movie/upcomming`);
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)
export const getDetailMovie = createAsyncThunk(
    'movie/detailmovie',
    async (id,thunkAPI)=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/movie/getdetail/${id}`);
        
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)
const MovieSlice = createSlice({
   name:'movie',
    initialState:{
        movie:null,
        page:null,
        error:null,
        movieshowings:null,
        movieupcommings:null,
        loading:null,
        detailmovie:null


    },
    reducers:{},
    extraReducers:(builder)=>{
      builder.
      addCase(getNewMovie.fulfilled, (state, action)=>{
            state.movie = action?.payload;
           
      })
      .addCase(getNewMovie.rejected, (state, action)=>{
        state.error = action.payload?.message;
       
      })
      .addCase(getShowingMovie.fulfilled, (state, action)=>{
        state.movieshowings = action?.payload;
        state.loading = false;
       
      })
      .addCase(getShowingMovie.rejected, (state, action)=>{
        state.error = action.payload?.message;
        state.loading = false;
       
      })
      .addCase(getShowingMovie.pending,(state, action)=>{
        state.loading = true;
      })
      .addCase(getUpcommingMovie.fulfilled, (state, action)=>{
        state.movieupcommings = action?.payload;
        state.loading = false;
       
      })
      .addCase(getUpcommingMovie.rejected, (state, action)=>{
        state.error = action.payload?.message;
        state.loading = false;
       
      })
      .addCase(getUpcommingMovie.pending,(state, action)=>{
        state.loading = true;
      })
      .addCase(getDetailMovie.fulfilled, (state, action)=>{
        state.detailmovie = action?.payload;
        state.loading = false;
       
      })
      .addCase(getDetailMovie.rejected, (state, action)=>{
        state.error = action.payload?.message;
        state.loading = false;
       
      })
      .addCase(getDetailMovie.pending,(state, action)=>{
        state.loading = true;
      })
    }
})
export default MovieSlice;