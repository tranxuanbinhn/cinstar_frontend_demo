import {configureStore} from '@reduxjs/toolkit';
import userSlice from './features/users/UserSlice';

const store = configureStore({
    reducer:{
        user:userSlice
    }
})
export default store;