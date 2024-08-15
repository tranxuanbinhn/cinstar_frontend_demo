
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
function App() {
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
        </Routes>
       
        </BrowserRouter>
          
    </div>
  );
}

export default App;
