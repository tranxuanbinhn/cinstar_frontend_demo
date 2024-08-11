import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


export const registerUser = createAsyncThunk(
    'user/register',
 
        async (userdata, thunkAPI) => { 
            try{
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                  const body = JSON.stringify(userdata);
                
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, body, config);
                console.log('response.data:', response.data);
                return response.data;
            }
            catch(error)
            {
                console.log('error.response.data', error.response.data);
                return thunkAPI.rejectWithValue(error.response?.data);
            }
        }
  
)  ;
export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        const accessToken = state.user.accessToken; 
        const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Use the stored access token
            },
          };
          console.log('log', config)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signout`, null, config);
        localStorage.clear();
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data);
      }
    }
  );
export const loginUser = createAsyncThunk(
    'user/login',
 
        async (userdata, thunkAPI) => { 
            try{
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                  const body = JSON.stringify(userdata);
                console.log('userdata',userdata);
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signin`, body, config);
                
       
                console.log('response.data:', response.data);
                return response.data;
            }
            catch(error)
            {
                console.log('error.response.data', error.response.data);
                return thunkAPI.rejectWithValue(error.response?.data);
            }
        }
  
)  ;
const userSlice = createSlice({
    name:'user',
    initialState:{
        userInfor:null,
        loading:null,
        error:null,
        message:null,
        accessToken:null,
        refreshToken:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
           
        
            state.loading=false;
            state.message=action.payload?.message;
            
        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.loading=false;
            console.log('action.payload.message',action.payload.message)
            state.error = action.payload.message || "Something went wrong";
            console.log('state.error ', state.error )
        })
        .addCase(loginUser.pending, (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            const user = {
                id: action.payload?.id,
                username: action.payload?.username,
                email: action.payload?.email,
                roles: action.payload?.roles,
            }
           
            state.loading=false;

            state.userInfor = user;
            state.accessToken = action.payload?.accessToken;
            Cookies.set('refreshToken', action.payload?.refreshToken, { expires: 7 });
           
     
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.loading=false;
            console.log('action.payload.message',action.payload.message)
            state.error = action.payload.message || "Something went wrong";
            console.log('state.error ', state.error )
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.userInfor  = null;
       
    })
    .addCase(logoutUser.rejected, (state, action)=>{
        state.loading=false;
        
        state.error = action.payload || "Something went wrong";
        
    })
    }
});

export default userSlice;   