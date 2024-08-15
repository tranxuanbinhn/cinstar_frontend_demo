import './moviedetail.css';
import { CiShoppingTag } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { PiSubtitlesBold } from "react-icons/pi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { FaPlayCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";
import Popcorn from '../orderpopcorn/popcorn/Popcorn';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailMovie } from '~/features/movie/MovieSlice';
import { getShowTimeFromCurrentDateToTwoDate } from '~/features/showtime/ShowtimeSlice';
import { getDateFromDate, getDayOfWeekFromDate } from '~/features/untility/Ultility';
import OrderTicket from './OrderTicket';
import { getAllTheater, getTheaterByCity } from '~/features/theater/TheaterSlice';
const MovieDetail = () => {
    const detailmovie = useSelector((state)=> state.movie.detailmovie);
    const loadding = useSelector((state)=> state.movie.loadding);
    const showtimecurrentdate = useSelector((state)=> state.showtimes.showtimecurrentdate);
    const alltheater = useSelector((state)=> state.theater.theaters);
    const theaterbycity = useSelector((state)=> state.theater.theaterbycity);
    const dispatch = useDispatch();
    const [schedule, setSchedule] = useState(getDateFromDate(showtimecurrentdate[0]?.date));
    const [theatercity, setTheaterCity] = useState('Thành Phố Hồ Chí Minh');
    const {id} = useParams();
    const handleClickGetDate = (e) => {
        const selectDate = e.currentTarget.querySelector('span').textContent;
        setSchedule(selectDate);
    }
    const handleUniqueCityTheater = () => {
        const uniqueCity =  [... new Set( alltheater?.map(item=>item.city))];
       return uniqueCity;
    }
    console.log('showtimecurrentdate',showtimecurrentdate);
   
    useEffect(()=>{
   
        dispatch(getDetailMovie(id)).then((response)=>{
 
        });
        dispatch(getShowTimeFromCurrentDateToTwoDate()).then((response)=>{
   
        });
        dispatch(getAllTheater()).then((response)=>{

        });
       
 
    }, [dispatch])
    useState(()=>{
        dispatch(getTheaterByCity(theatercity)).then((response)=> {
            console.log('cityresponse', response);
        })
        console.log('city', theatercity);
    }, [theatercity])
 
  
   
    const handleSetCity = (e) => {
        setTheaterCity(e.target.value);
    }
    console.log('theaterbycity',theaterbycity);
    console.log('theatercity',theatercity);
    if(loadding)
    {
        return <div ><p>Loading</p></div>
    }
    
    const renderDate = () => {
       const uniqueDate = [...new Set( showtimecurrentdate?.map(item=> item.date))];
       if(uniqueDate.length>0)
       {
            return uniqueDate.map((date, index)=>
            (   
                <div onClick={(e)=> handleClickGetDate(e)} key={index} className={(schedule===getDateFromDate(date))?'on-click schedule-item':'schedule-item' }>
                <span>{getDateFromDate(date)}</span>
                <span>{getDayOfWeekFromDate(date)}</span> 
            </div>
            ))
       }
    }
    return (
       <div >
         <div className='movie-detail'>
       
       
            <div className='img'>
            <img src={process.env.REACT_APP_API_IMG_URL+detailmovie?.posterPath}/>
        </div>
        <div className='information'>
            <h1 >{detailmovie?.title}
            </h1>
            <div className='information-tag movie-detail-tag'>
            <span className='cl '><CiShoppingTag/><span>Hoat hinh</span></span>
                        <span className='cl'><FaRegClock/><span>Hoat hinh</span></span>
                        <span className='cl'><FaEarthAmericas/><span>{detailmovie?.runtime}</span></span>
                        <span className='cl'><PiSubtitlesBold/><span>Hoat hinh</span></span>
                        <span className='cl'><BsFillPersonFill/><span>Hoat hinh</span></span>
            </div>
            <div className='movie-detail-description'>
                <h1>mô tả</h1>
                <p>Khởi chiếu: {detailmovie?.releaseDate}</p>
            </div>
            <div className='movie-detail-description'>
                <h1>NỘI DUNG PHIM</h1>
                <p>{detailmovie?.overview}</p>
            </div>
            <div className='trailer'>
               <FaPlayCircle/> <a>Xem Trailer</a>
            </div>

       
        </div>
    </div>
    <div className='order-ticket'>
        <div className='schedule'>
            <h1 className='h1-title'>Lịch chiếu</h1>
            <div className='schedule-inner'>
                {
                    renderDate()
                    
                }
               
            </div>
        </div>

    <div className='movie-detail-list-theater'>
    <div className='title'>
        <h1 className='h1-title'>Danh sách rạp</h1>
                <select className='dropdown' onChange={handleSetCity}>

             
            {
                handleUniqueCityTheater()&&handleUniqueCityTheater()?.length>0?(
                    handleUniqueCityTheater()?.map((theater)=>(
                        <option  value={theater}>{theater}</option>
                    ))
                ):(<div></div>)
            }
               </select>
            
    
    </div>
    <div className='movie-detail-list-screen'>
        <div className='movie-detail-list-screen-title'> <h2>Cinstar</h2> <IoIosArrowUp></IoIosArrowUp></div>
        <p>vị trí</p>
        <div className='movie-detail-screen-item'>
            <div className='movie-detail-screen-item-alert'>
            <MdOndemandVideo></MdOndemandVideo> <p>Hiện chưa có lịch chiếu</p>
            </div>
        <div className='movie-detail-screen-item-ctn'>
        <p>Standard</p>
        <div className='movie-detail-screen-inner'>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
        </div>
        </div>
        </div>
       
    </div>

   
    </div>
    </div>
    <div className='choose-ticket'>
        <h1 className='h1-title'>chọn loại vé </h1>
        <div className='choose-ticket-ctn'>
            <div className='choose-ticket-inner'>
                <h2>Người lớn</h2>
                <h2 className='cl-yl'>đơn</h2>

                <h2>45000 VND</h2>

                <div class="quantity"><button class="quantity-btn decrease">-</button><p>1</p><button class="quantity-btn increase">+</button></div>

            </div>
            <div className='choose-ticket-inner'>
                <h2>hssv, người cao tuổi</h2>
                <h2 className='cl-yl'>đơn</h2>

                <h2>45000 VND</h2>

                <div class="quantity"><button class="quantity-btn decrease">-</button><p>1</p><button class="quantity-btn increase">+</button></div>

            </div>
            <div className='choose-ticket-inner'>
                <h2>Người lớn</h2>
                <h2 className='cl-yl'>đôi</h2>

                <h2>45000 VND</h2>

                <div class="quantity"><button class="quantity-btn decrease">-</button><p>1</p><button class="quantity-btn increase">+</button></div>

            </div>
        </div>
    </div>

    <div className='choose-seat'>
        <h1 className='h1-title'>Chọn ghế</h1>
        <div className='screen-image'>
            <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1723003468/img-screen_oklitm.png'/>
           <div className='screen-title'> <h3>Màn hình</h3></div>
        </div>
        <div className='list-seat'>
            <div className='list-seat-sort'>
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
                <div className='seat-sort-item'><span>A</span></div> 
            </div>
            <table>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
                <tr>
                    <td>A1</td>
                    <td>A2</td>
                    <td>A3</td>
                    <td>A4</td>
                </tr>
            </table>
        </div>

        <div className='type-seat'>
            <div className='type-seat-inner'>
                <div className='type-seat-item'></div>
                <p>Ghế Thường</p>
            </div>
            <div className='type-seat-inner'>
                <div className='type-seat-item bk-cl-yl'></div>
                <p>Ghế Chọn</p>
            </div>
            <div className='type-seat-inner'>
                <div className='type-seat-item bk-cl-gr'></div>
                <p>Ghế Đã đặt</p>
            </div>
        </div>
    </div>
    <div className='mb100'></div>
    <div className='choose-popcorn'>
        <h1 className='h1-title'> Chọn bắp nước</h1>
        <Popcorn></Popcorn>
    </div>
    <OrderTicket></OrderTicket>
       </div>
    );
}

export default MovieDetail;