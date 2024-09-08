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
import OrderSlice from '~/features/order/OrderSlice';
import CustomerSlice from '~/features/customer/CustomerSlice';
import PaymentSlice from '~/features/payment/PaymentSlice';
import authMiddleware from '~/features/auth/authMiddleware';
import TimeSlice from '~/features/time/TimeSlice';
import headerSlice from '~/features/headers/headerSlice';
import rightDrawerSlice from '~/features/leads/rightDrawerSlice';
import modalSlice from '~/features/leads/modalSlice';
import leadsSlice from '~/features/leads/leadSlice';
import AdminSlice from '~/features/auth/AdminSlice';
import AdminMoviesSlice from '~/features/admin/MoviesSlice';
import AdminShowtimeSlice from '~/features/admin/ShowtimeSlice';
import AdminScreenSlice from '~/features/admin/ScreenSlice';
import AdminOrderSlice from '~/features/admin/OrderSlice';
import AdminCustomerSlice from '~/features/admin/CustomerSlice';
import MessageSlice from '~/features/message/MessageSlice';


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
  const persistTicketConfig = {
    key: 'food',
    storage,
  };
  const persistFoodConfig = {
    key: 'ticket',
    storage,
  };
  const persistOrderConfig = {
    key: 'order',
    storage,
  };
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
const persistedTheaterReducer = persistReducer(persistTheaterConfig, TheaterSlice.reducer);
const persistedMovieReducer = persistReducer(persistMovieConfig, MovieSlice.reducer);
const persistedShowtimeReducer = persistReducer(persistShowtimeConfig, showtimeSlice.reducer);
const persistedFoodReducer = persistReducer(persistFoodConfig, FoodSlice.reducer);
const persistedOrderReducer = persistReducer(persistOrderConfig, OrderSlice.reducer);


const persistedTicketReducer = persistReducer(persistTicketConfig, TicketSlice.reducer);

const store = configureStore({
    reducer:{
        user:persistedReducer,
        movie:persistedMovieReducer,
        showtimes:persistedShowtimeReducer,
        theater:persistedTheaterReducer,
        ticket:persistedTicketReducer,
        seat:SeatSlice.reducer,
        food:persistedFoodReducer ,
        screen:ScreenSlice.reducer,
        order:persistedOrderReducer, 
        customer:CustomerSlice.reducer,
        payment:PaymentSlice.reducer,
        time:TimeSlice.reducer,
        header:headerSlice.reducer,
        rightDrawer:rightDrawerSlice.reducer,
        modal:modalSlice.reducer,
        lead:leadsSlice.reducer,
        adminuser:AdminSlice.reducer,
        adminmovies:AdminMoviesSlice.reducer,
        adminshowtimes:AdminShowtimeSlice.reducer,
        adminscreens:AdminScreenSlice.reducer,
        adminorders:AdminOrderSlice.reducer,
        admincustomer:AdminCustomerSlice.reducer,
        message: MessageSlice.reducer
        
 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({

          serializableCheck: false, // Tắt kiểm tra tính serializable
          immutableCheck: false,    // Tắt kiểm tra tính immutable (nếu cần)
        }).concat(authMiddleware),
})
export const persistor = persistStore(store);

export default store;