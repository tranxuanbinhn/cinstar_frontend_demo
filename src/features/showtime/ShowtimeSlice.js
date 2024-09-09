import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getShowtime = createAsyncThunk(
    'showtimes/getshowtime', async ({formattedDate, selectedMovie, selectedTheater},thunkAPI)=>
    { 
        try{
            const encodedDate = encodeURIComponent(formattedDate);
            let url = `/api/user/showtime?date=${encodedDate}`;
            if(selectedMovie!=null && selectedTheater==null)
            {
                url = `/api/user/showtime?date=${encodedDate}&movieid=${selectedMovie}`;
            }
            if(selectedMovie!=null && selectedTheater!=null)
            {
                url = `/api/user/showtime?date=${encodedDate}&movieid=${selectedMovie}&theaterid=${selectedTheater}`;
            }
             
            const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`);
           
            return response.data;
        }
        catch(error)
        {
           return thunkAPI.rejectWithValue(error);
        }   
    }
)
export const getShowtimeToOrder = createAsyncThunk(
    'showtimes/getshowtimetoorder', async ({formattedDate, selectedMovie, selectedTheater},thunkAPI)=>
    { 
        try{
            const encodedDate = encodeURIComponent(formattedDate);
            let url = `/api/user/showtime?date=${encodedDate}`;
            if(selectedMovie!=null && selectedTheater==null)
            {
                url = `/api/user/showtime?date=${encodedDate}&movieid=${selectedMovie}`;
            }
            if(selectedMovie!=null && selectedTheater!=null)
            {
                url = `/api/user/showtime?date=${encodedDate}&movieid=${selectedMovie}&theaterid=${selectedTheater}`;
            }
             
            const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`);
            
            return {selectedTheater,showtimefororder:response.data};
        }
        catch(error)
        {
           return thunkAPI.rejectWithValue(error);
        }   
    }
)
export const getThreeShowtimeByMovie = createAsyncThunk(
    'showtimes/getthreeshowtime', async (id,thunkAPI)=>
    {
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/showtime/getthreebymovie/${id}`);
             
            return {id,showtimes:response.data};
        }
        catch(error)
        {
           return thunkAPI.rejectWithValue(error);
        }   
    }
)
export const getShowTimeFromCurrentDateToTwoDate= createAsyncThunk(
    'showtimes/getshowtimecurrentdate', async (id,thunkAPI)=>
    {
        try{
            
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/showtime/getshowtimefromcurrentdatetotwodate`);
           
            return response.data;
        }
        catch(error)
        {
           return thunkAPI.rejectWithValue(error);
        }   
    }
)
const showtimeSlice = createSlice(
    {
        name:'showtimes',
        initialState:{
            showtimes:null,
            loading:null,
            error:null,
            threeshowtimes:{},
            showtimecurrentdate:null,
            showtimefororder:{}
        },
        reducers:{},
        extraReducers: (builder)=>{
            builder
            .addCase(getShowtime.pending, ( state)=>{
                state.loading = true;
            })
            .addCase(getShowtime.fulfilled, ( state, action)=>{
                state.loading = false;
                state.showtimes = action.payload;
            })
            .addCase(getShowtime.rejected, ( state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getThreeShowtimeByMovie.pending, ( state)=>{
                state.loading = true;
            })
            .addCase(getThreeShowtimeByMovie.fulfilled, ( state, action)=>{
                state.loading = false;
               const  {id, showtimes} = action.payload;
                state.threeshowtimes[id] = showtimes;
            })
            .addCase(getThreeShowtimeByMovie.rejected, ( state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getShowTimeFromCurrentDateToTwoDate.pending, ( state)=>{
                state.loading = true;
            })
            .addCase(getShowTimeFromCurrentDateToTwoDate.fulfilled, ( state, action)=>{
                state.loading = false;
                state.showtimecurrentdate = action.payload;
               
            })
            .addCase(getShowTimeFromCurrentDateToTwoDate.rejected, ( state, action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getShowtimeToOrder.pending, ( state)=>{
                state.loading = true;
            })
            .addCase(getShowtimeToOrder.fulfilled, ( state, action)=>{
                state.loading = false;
               const {selectedTheater,showtimefororder} = action.payload;
                state.showtimefororder[selectedTheater] = showtimefororder;
    
               
            })
            .addCase(getShowtimeToOrder.rejected, ( state, action)=>{
                state.loading = false;
                state.error = action.payload;
            });
        }
    }
)
export default showtimeSlice;