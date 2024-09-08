// refreshToken.js
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL;

export const refreshToken = async () => {
  const refreshToken = Cookies.get('refreshToken');
  console.log('refreshToken',refreshToken)
  if (!refreshToken) {
    throw new Error('Not found this refreshToken');
  }

  const response = await axios.post(`${API_URL}/api/auth/refresh`, { refreshToken });
  const { accessToken } = response.data;
  console.log('response',response)
  console.log('accessToken',accessToken)

  Cookies.set('accessToken', accessToken);
  
  return accessToken;
};
