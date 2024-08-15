import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const getAllTheater= createAsyncThunk(
    'theater/getall',
    async (thunkAPI)=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/theater/findall`);
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
)


export const getDetailTheater= createAsyncThunk(
  'theater/getdetail',
  async (id,thunkAPI)=>{
      try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/theater/detail/${id}`);
          return response.data;
      }
      catch(error)
      {
          return thunkAPI.rejectWithValue(error.response?.data);
      }
  }
)
export const getTheaterByCity= createAsyncThunk(
  'theater/gettheaterbycity',
  async (city,thunkAPI)=>{
      try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/theater/findallbycity?city=${city}`);
          return response.data;
      }
      catch(error)
      {
          return thunkAPI.rejectWithValue(error.response?.data);
      }
  }
)
export const getDetailTheaterForManyMovie= createAsyncThunk(
  'theater/getdetailformanymovie',
  async (id,thunkAPI)=>{
      try{
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/theater/detail/${id}`);

          return {id, getdetailformanymovie:response.data};
      }
      catch(error)
      {
          return thunkAPI.rejectWithValue(error.response?.data);
      }
  }
)

const TheaterSlice = createSlice({
   name:'theater',
    initialState:{
        theaters:null,
        theaterdetail:null,
        error:null,
        moviedetailformanymovie:{},
        loading:null,
        theaterbycity:null
      },
    reducers:{},
    extraReducers:(builder)=>{
      builder.
      addCase(getAllTheater.fulfilled, (state, action)=>{
            state.theaters = action?.payload;
            state.loading = false;
           
      })
      .addCase(getAllTheater.rejected, (state, action)=>{
        state.error = action.payload?.message;
        state.loading = false;
       
      })
      .addCase(getAllTheater.pending, (state, action)=>{
   
        state.loading = true;
       
      })
      .addCase(getDetailTheater.fulfilled, (state, action)=>{
        state.theaterdetail = action?.payload;
        state.loading = false;
       
  })
  .addCase(getDetailTheater.rejected, (state, action)=>{
    state.error = action.payload?.message;
    state.loading = false;
   
  })
  .addCase(getDetailTheater.pending, (state, action)=>{

    state.loading = true;
   
  })
  .addCase(getDetailTheaterForManyMovie.fulfilled, (state, action)=>{
    const {id, getdetailformanymovie} = action.payload;
    state.moviedetailformanymovie[id] =  getdetailformanymovie;
    state.loading = false;
   
})
.addCase(getDetailTheaterForManyMovie.rejected, (state, action)=>{
state.error = action.payload?.message;
state.loading = false;

})
.addCase(getDetailTheaterForManyMovie.pending, (state, action)=>{

state.loading = true;

})
.addCase(getTheaterByCity.fulfilled, (state, action)=>{
    state.theaterbycity = action.payload;
  state.loading = false;
 
})
.addCase(getTheaterByCity.rejected, (state, action)=>{
state.error = action.payload?.message;
state.loading = false;

})
.addCase(getTheaterByCity.pending, (state, action)=>{

state.loading = true;

})
    }
})
export default TheaterSlice;