import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from '~/api/axiosInstance';



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
               
                return response.data;
            }
            catch(error)
            {
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
        const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/auth/signout`, null, config);
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
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signin`, body, config);
                return response.data;
            }
            catch(error)
            {
                return thunkAPI.rejectWithValue(error.response?.data);
            }
        }
  
)  ;
export const getById = createAsyncThunk(
    'user/getbyid',
 
        async (userName, thunkAPI) => { 
            try{
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/information/getbyid/${userName}`);
                return response.data;
            }
            catch(error)
            {
                return thunkAPI.rejectWithValue(error.response?.status);
            }
        }
  
)  ;


export const updateUser = createAsyncThunk(
    'user/update',
 
        async (data, thunkAPI) => { 
            try{
                const config = {
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                const response = await axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/information/update/${data?.userName}`, data);
                return response.data;
            }
            catch(error)
            {
                return thunkAPI.rejectWithValue(error.response?.data);
            }
        }
  
)  ;

export const changePassword = createAsyncThunk(
    'user/changepass',
 
        async (data, thunkAPI) => { 
            try{
                const object = {
                    oldPassword:data.oldPassword,
                    password:data.password,
                }
                
                const response = await axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/information/changepassword/${data?.userName}`, object);
                return response.data;
            }
            catch(error)
            {
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
        refreshToken:null,
        userdetail:null,
        alluser:null,
        pageSize:5,
        useradd:{
            error:null,
            data:null,
            loading:null
        },
        deleteUser:{
            status:false,
            error:null
        }
    },
    reducers:{
        resetUserAdd:(state, action)=>{
            const data = {
                error:null,
                data:null,
                loading:null
            }
          state.useradd=data
        },
        resetUserDelete:(state, action)=>{
            const data = {
                error:null,
                status:false
            }
          state.useradd=data
        }
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
            state.error = action.payload.message || "Something went wrong";
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
            localStorage.setItem('accessToken', action.payload?.accessToken);
            Cookies.set('refreshToken', action.payload?.refreshToken, { expires: 7 });
            

           
     
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.loading=false;
            state.error = action.payload.message || "Something went wrong";
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
    .addCase(getById.rejected, (state, action)=>{
        state.loading=false;
        state.error = action.payload || "Something went wrong";
    })
    .addCase(getById.pending, (state)=>{
        state.loading=true;
        state.error=null;
    })
    .addCase(getById.fulfilled, (state, action)=>{
       state.userdetail = action.payload;
    })
    .addCase(updateUser.rejected, (state, action)=>{
        state.loading=false;
        state.error = action.payload.message || "Something went wrong";
        state.message = null
    })
    .addCase(updateUser.pending, (state)=>{
        state.loading=true;
        state.error=null;
    })
    .addCase(updateUser.fulfilled, (state, action)=>{
       state.userdetail = action.payload;
       state.message = "Success"
    })
    .addCase(changePassword.rejected, (state, action)=>{
        state.loading=false;
        state.error = action.payload.message || "Something went wrong";
        state.message = null
    })
    .addCase(changePassword.pending, (state)=>{
        state.loading=true;
        state.error=null;
    })
    .addCase(changePassword.fulfilled, (state, action)=>{
       state.userdetail = action.payload;
       state.message = "success"
    })
}
});
export const {resetUserAdd, resetUserDelete} = userSlice.actions;
export default userSlice;   