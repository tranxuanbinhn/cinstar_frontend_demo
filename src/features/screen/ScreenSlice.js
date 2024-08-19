import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const getScreenById = createAsyncThunk(
    'screen/getbyid',
    async (id,thunkAPI)=>{
        try{
           
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/screen/getbyid/${id}`);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
const ScreenSlice = createSlice({
    name:'screen',
    initialState:{
        screen:null,
        loading:null,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getScreenById.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getScreenById.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.screen=action.payload;
            
        })
        .addCase(getScreenById.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
            console.log('state.error ', state.error )
        })
       
    }
});

export default ScreenSlice;   