import './categorymovie.css';
import { BiSolidMovie } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { PiSubtitlesBold } from "react-icons/pi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { getThreeShowtimeByMovie } from '~/features/showtime/ShowtimeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ScreenItem from '../screenitem/Screenitem';
import { Link } from 'react-router-dom';

const CategoryMovie = ({theatermovies,typecategory}) => {


    
    const renderTypeCategory = () => {
        console.log('theatermovies', theatermovies);
        if(typecategory === 'showing')
        {
            return   <h1>Phim đang chiếu</h1>
        }
        if(typecategory === 'upcomming'){
            return   <h1>Phim sắp chiếu</h1>
        }
        if(typecategory === 'special'){
            return   <h1>Suất chiếu đặc biệt</h1>
        }
        if(typecategory === 'price'){
            return   <h1>Bảng giá</h1>
        }
    }
    return (
    <div className='category'>
     
     {renderTypeCategory()}
       <div className='category-list'>
        {
            theatermovies&&theatermovies.length>0 ?(theatermovies.map(theatermovie=>(
                <div className='category-item'>
                <div className='img'>
                    <img src={process.env.REACT_APP_API_IMG_URL+theatermovie.posterPath}  alt={theatermovie.title}/>
                </div>
                <div className='information'>
                    <h1>{theatermovie?.title}
                    </h1>
                    <div className='information-tag'>
                    <span className='cl'><CiShoppingTag/><span>Hoat hinh</span></span>
                                <span className='cl'><FaRegClock/><span>Hoat hinh</span></span>
                                <span className='cl'><FaEarthAmericas/><span>Hoat hinh</span></span>
                                <span className='cl'><PiSubtitlesBold/><span>{theatermovie?.releaseDate}</span></span>
                                <span className='cl'><BsFillPersonFill/><span>Hoat hinh</span></span>
                    </div>
                  <ScreenItem movieid={theatermovie?.id}></ScreenItem>
                 <div className='smst'>
                 <Link className='showmore-st' to={`/movie-detail/${theatermovie?.id}`}>Xem thêm lịch chiếu </Link>
                 </div>
                </div>
            </div>
            ))):(<div className='alert-error'>
                <div className='img-alert'>
                    <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1723525904/movie-updating_isgdly.png'/>

                </div>

                <h1 className='h1-title'>Đang cập nhập</h1>
            </div>)
        }
      
       </div>
    </div>);
}

export default CategoryMovie;