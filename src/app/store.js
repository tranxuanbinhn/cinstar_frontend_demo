import {configureStore } from '@reduxjs/toolkit';
import userSlice from '~/features/auth/UserSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import MovieSlice from '~/features/movie/MovieSlice';


const persistConfig = {
    key: 'root',
    storage,
  };
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
const store = configureStore({
    reducer:{
        user:persistedReducer,
        movie:MovieSlice.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
          serializableCheck: false, // Tắt kiểm tra tính serializable
          immutableCheck: false,    // Tắt kiểm tra tính immutable (nếu cần)
        }),
})
export const persistor = persistStore(store);

export default store;