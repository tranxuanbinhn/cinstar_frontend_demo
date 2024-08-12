import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
export const getShowtime = createAsyncThunk(
    'showtimes/getshowtime',
    {
        
    }
)
const showtimeSlice = createSlice(
    {
        name:'showtimes',
        initialState:{
            showtimes:null,
            loading:null,
            error:null
        },
        reducers:{},
        extraReducers: (builder)=>{
            builder
            .addCase();
        }
    }
)