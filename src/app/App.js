
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import OrderPage from '../pages/OrderPage'
import OrderPop from '../pages/OrderPop';
import ShowTimePage from '../pages/ShowTimePage';
import TheaterDetailPage from '../pages/TheaterDetailPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import SearchPage from '../pages/SearchPage';
import PromotionPage from '../pages/PromotionPage';
import LoginPage from '../pages/LoginPage';
import PersonPage from '~/pages/PersonPage';
import CheckOutPage from '~/pages/CheckoutPage';
import ResultPage from '~/pages/ResultPage';
import TicketPage from '~/pages/TicketPage';
import MovieShowingPage from '~/pages/MovieShowingPage';
import MovieUpcomingPage from '~/pages/MovieUpcomingPage';
//import { AdminRoutes } from '~/admin/routes/AdminRoutes';
import React, { lazy, useEffect } from 'react'

import UsersAdmin from '~/admin/pages/Users';
import OrdersAdmin from '~/admin/pages/Orders';



import ShowtimeManagement from '~/admin/pages/ShowtimeManagement';
import MoviesAdmin from '~/admin/pages/Movie';
import MoviesTheaterAdmin from '~/admin/pages/MovieTheater';
import Sidebar from '~/admin/components/Sidebar';
import AdminLayout from '~/admin/components/AdminLayout';
import MessageApp from '~/admin/components/chat/ChatApp';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '~/pages/NotFoundPage';

//import Layout from '~/admin/container/Layout';
function App() {
  ////const Layout = lazy(() => import('../admin/container/Layout'))
  //useEffect(() => {
  //  // 👆 daisy UI themes initialization
  //  themeChange(false)
  //}, [])

  return (
    <div className="App ">
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage></HomePage>}/>
        <Route path="/order" element={<OrderPage/>}/>
        <Route path="/popcorn-drink" element={<OrderPop/>}/>
        <Route path="/showtimes" element={<ShowTimePage/>}/>
        <Route path="/theater/:id" element={<TheaterDetailPage/>}/>
        <Route path="/movie-detail/:id" element={<MovieDetailPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/promotion" element={<PromotionPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/account/account-profile/" element={<PersonPage/>}/>
        <Route path="/checkout/" element={<CheckOutPage/>}/>
        <Route path="/result/" element={<ResultPage/>}/>
        <Route path="/ticket/" element={<TicketPage/>}/>
        <Route path="/movie/showing" element={<MovieShowingPage/>}/>
        <Route path="/movie/upcoming" element={<MovieUpcomingPage/>}/>
        <Route path='*' element={<NotFoundPage></NotFoundPage>}/>

             <Route path="/admin" element={<PrivateRoute admin={true} component={AdminLayout}/>}>
                <Route path="orders" element={<OrdersAdmin />} />
                <Route path="movies" element={<MoviesAdmin />} />
                <Route path="moviestheater" element={<MoviesTheaterAdmin />} />
                <Route path="showtimes" element={<ShowtimeManagement />} />
                <Route path="users" element={<UsersAdmin />} />
            
              
            </Route>

        </Routes>
       
        </BrowserRouter>
          
    </div>
  );
}

export default App;
