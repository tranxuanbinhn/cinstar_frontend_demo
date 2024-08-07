
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage'
import OrderPop from './pages/OrderPop';
import ShowTimePage from './pages/ShowTimePage';
import TheaterDetailPage from './pages/TheaterDetailPage';
import MovieDetailPage from './pages/MovieDetailPage';
function App() {
  return (
    <div className="App ">
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage></HomePage>}/>
        <Route path="/order" element={<OrderPage/>}/>
        <Route path="/popcorn-drink" element={<OrderPop/>}/>
        <Route path="/showtimes" element={<ShowTimePage/>}/>
        <Route path="/theaters" element={<TheaterDetailPage/>}/>
        <Route path="/movie-detail" element={<MovieDetailPage/>}/>
        </Routes>
       
        </BrowserRouter>
          
    </div>
  );
}

export default App;
