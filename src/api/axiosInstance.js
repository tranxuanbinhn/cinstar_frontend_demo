import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshToken } from './auth';
const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
    baseURL:API_URL,
})
axiosInstance.interceptors.response.use(
    response=>response,
    async error => {
        const {config, response} = error;
        if (response.status === 401 && !config.__isRetryRequest) {
            config.__isRetryRequest = true; 
            try {
                const accessToken = refreshToken();
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(config);
            }
            catch(refreshError)
            {
                console.error('Refresh token failed:', refreshError);
            }
        }
        return Promise.reject(error);
    }
    
)
export default axiosInstance;