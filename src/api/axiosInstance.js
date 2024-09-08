import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = axios.create({
    baseURL:API_URL,
})
axiosInstance.interceptors.request.use(
    config => {
        
         const accessToken = localStorage.getItem('accessToken');

         config.headers['Content-Type'] = 'application/json';
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }


        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;