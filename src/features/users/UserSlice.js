import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import { load } from 'npm';

export const registerUser = createAsyncThunk(
    'user/register',
 
        async (userdata, thunkAPI) => { 
            try{
                const respones = await axios.post('', userdata);
                return respones.data;
            }
            catch(error)
            {
                return thunkAPI.rejectWithValue(error.respones.data);
            }
        }
  
)  ;
const userSlice = createSlice({
    name:'User',
    initialState:{
        userInfor:null,
        loading:null,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled, (action,state)=>{
            state.loading=false;
       
            state.userInfor=action.payload;
        })
        .addCase(registerUser.rejected, (action,state)=>{
            state.loading=false;
       
            state.error=action.payload;
        })
    }
});
export default userSlice;