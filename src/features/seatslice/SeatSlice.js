import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const getAllSeatByScreen = createAsyncThunk(
    'seat/getallbyscreen',
    async (id,thunkAPI)=>{
        try{
            if(id)
            {
                
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/seat/findbyscreen/${id}`);
  
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
            console.log('state.error ', state.error )
        })
       
    }
});

export default SeatSlice;   