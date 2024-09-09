import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export const getAllFood = createAsyncThunk(
    'food/getall',
    async (thunkAPI)=>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/food/getall`);
  
            return response.data;
        }
        catch(error)
        {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
  )
const FoodSlice = createSlice({
    name:'food',
    initialState:{
        allfood:null,
        loading:null,
        error:null,
        foodrelation:{}
    },
    reducers:{
        savefoodrelation: (state, action)=> {
         
         
            const { foodId, ...rest } = action.payload;
            if (!state.foodrelation[foodId]) {
                state.foodrelation[foodId] = [];
            }
            state.foodrelation[foodId] = {
                ...state.foodrelation[foodId],
                ...rest,
            };
        },
        deletefoodrelation:(state)=>{
            state.foodrelation = {}
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllFood.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllFood.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.allfood=action.payload;
            
        })
        .addCase(getAllFood.rejected, (state, action)=>{
            state.loading=false;
        
            state.error = action.payload || "Something went wrong";
             
        })
       
    }
});
export const {savefoodrelation,deletefoodrelation} = FoodSlice.actions;
export default FoodSlice;   