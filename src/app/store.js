import {configureStore } from '@reduxjs/toolkit';
import userSlice from '~/features/auth/UserSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import MovieSlice from '~/features/movie/MovieSlice';
import showtimeSlice from '~/features/showtime/ShowtimeSlice';
import TheaterSlice from '~/features/theater/TheaterSlice';
import TicketSlice from '../features/ticket/TicketSlice';
import SeatSlice from '~/features/seatslice/SeatSlice';
import FoodSlice from '~/features/food/FoodSlice';
import ScreenSlice from '~/features/screen/ScreenSlice';


const persistConfig = {
    key: 'root',
    storage,
  };
  const persistTheaterConfig = {
    key: 'theater',
    storage,
  };
  const persistMovieConfig = {
    key: 'movie',
    storage,
  };
  const persistShowtimeConfig = {
    key: 'showtime',
    storage,
  };
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
const persistedTheaterReducer = persistReducer(persistTheaterConfig, TheaterSlice.reducer);
const persistedMovieReducer = persistReducer(persistMovieConfig, MovieSlice.reducer);
const persistedShowtimeReducer = persistReducer(persistShowtimeConfig, showtimeSlice.reducer);
const store = configureStore({
    reducer:{
        user:persistedReducer,
        movie:persistedMovieReducer,
        showtimes:persistedShowtimeReducer,
        theater:persistedTheaterReducer,
        ticket:TicketSlice.reducer,
        seat:SeatSlice.reducer,
        food:FoodSlice.reducer,
        screen:ScreenSlice.reducer
 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
          serializableCheck: false, // Tắt kiểm tra tính serializable
          immutableCheck: false,    // Tắt kiểm tra tính immutable (nếu cần)
        }),
})
export const persistor = persistStore(store);

export default store;