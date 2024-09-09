// refreshToken.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

export const refreshToken = async () => {
  const refreshToken = Cookies.get('refreshToken');
   
  if (!refreshToken) {
    throw new Error('Not found this refreshToken');
  }

  const response = await axios.post(`${API_URL}/api/auth/refreshtoken`, { refreshToken });
  const { accessToken } = response.data;
   
   

  Cookies.set('accessToken', accessToken);
  
  return accessToken;
};
