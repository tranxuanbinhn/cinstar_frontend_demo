import Header from "~/components/header/Header";

import Order from "~/components/order/Order";
import SlideList from "~/components/slider-list/SlideLists";

import FooterCP from "~/components/footer/FooterCP";
import './style/homepage.css';
import '../components/utility/utility.css';
import { useSelector } from "react-redux";
function HomePage()
{
    const showingMovies = useSelector((state)=> state.movie.movieshowings);
    const upcommingMovie = useSelector((state)=> state.movie.movieupcommings);
    return (
        <div className="homepage ">
            <Header></Header>
            <div className=" background-color  mt-1500">
            <div className="container ">
            
      
      
            <SlideList nameTitle="PHIM ĐANG CHẾU" movieshowings={showingMovies}linkmovie={'/movie/showing'}/>
            <SlideList nameTitle="PHIM SẮP CHIẾU" movieshowings={upcommingMovie} linkmovie={'/movie/upcoming'}/>
            
            </div>
            </div>
          
            
            <FooterCP></FooterCP>
        </div>
    );
}
export default HomePage;