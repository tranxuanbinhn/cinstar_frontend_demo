import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const getAllSeatByScreen = createAsyncThunk(
    'seat/getallbyscreen',
    async (data,thunkAPI)=>{
        try{
            if(data?.showtimeid)
            {
                
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/seat/findbyscreen/${data.id}/${data.showtimeid}`);
  
            return response.data;
            }
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
const SeatSlice = createSlice({
    name:'seat',
    initialState:{
        seat:null,
        loading:null,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllSeatByScreen.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllSeatByScreen.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.seat=action.payload;
            
        })
        .addCase(getAllSeatByScreen.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
       
    }
});

export default SeatSlice;   