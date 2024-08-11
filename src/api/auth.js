import axios from 'axios';
import Cookies from 'js-cookie'
import store from '~/app/store'
import { loginUser, logoutUser } from '~/features/auth/UserSlice'
import axiosInstance from './axiosInstance';
import { useDispatch } from 'react-redux';
const API_URL = process.env.REACT_APP_API_URL;

 export const refreshToken = async () => {
  
  try{
    const refreshToken = Cookies.get('refreshToken');
    if(!refreshToken)
    {
        throw new Error('Not found this refreshToken');
    }
    const response = await axiosInstance.post('/api/auth/refresh', {refreshToken});
    const {accessToken} = response.data;
    store.dispatch(loginUser({
        accessToken
    }))
    return accessToken;
  }
  catch(error)
  {
    console.error('Error refreshing token:', error);
    console.error('Refresh token failed:', refreshError);
        // Xóa token và thông tin người dùng
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        store.dispatch(logoutUser()); // Dispatch action để đăng xuất
        // Chuyển hướng đến trang đăng nhập
        window.location.href = '/login';
        return Promise.reject(refreshError);
    
  }

}