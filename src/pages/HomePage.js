import Header from "~/components/header/Header";
import SliderPage from "~/components/slider/slider";
import Order from "~/components/order/Order";
import SlideList from "~/components/slider-list/SlideLists";
import Promotion from "~/components/promotion-component/Promotion";
import Member from "~/components/member/Member";
import Entertaiment from "~/components/entertaiment/Entertaiment";
import FooterCP from "~/components/footer/FooterCP";
import './style/homepage.css';
import '../components/utility/utility.css';
import {useSelector, useDispatch} from 'react-redux';
import { getShowingMovie, getUpcommingMovie } from "~/features/movie/MovieSlice";
import { useEffect } from "react";

function HomePage()
{
    const userInfor = useSelector((state)=> state.user.userInfor);
    const showingMovies = useSelector((state)=> state.movie.movieshowings);
    const upcommingMovie = useSelector((state)=> state.movie.movieupcommings);
    const loading = useSelector((state)=> state.movie.loading);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getShowingMovie()).then((response)=>{
         
        })
        dispatch(getUpcommingMovie()).then((response)=>{
         
        })
       
    }, [dispatch])
    if(loading)
    {
        return <div>Loading</div>;
    }
    
    return (
        <div className="homepage ">
            <Header userInfor={userInfor}></Header>
            <div className=" background-color">
            <div className="container">
            
            <SliderPage></SliderPage>
            <Order></Order>
            <SlideList nameTitle="PHIM ĐANG CHẾU" movieshowings={showingMovies}/>
            <SlideList nameTitle="PHIM SẮP CHIẾU" movieshowings={upcommingMovie}/>
            <Promotion></Promotion>
            <Member></Member>
            <Entertaiment></Entertaiment>
            </div>
            </div>
          
            
            <FooterCP></FooterCP>
        </div>
    );
}
export default HomePage;