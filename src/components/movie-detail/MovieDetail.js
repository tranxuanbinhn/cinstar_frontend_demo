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
import { getShowtime, getShowTimeFromCurrentDateToTwoDate } from '~/features/showtime/ShowtimeSlice';
import { formatCurrency, getDateFromDate, getDayOfWeekFromDate } from '~/features/untility/Ultility';

import { getAllTheater, getTheaterByCity } from '~/features/theater/TheaterSlice';
import ShowTimeMovie from './Showtimemovie/Showtimemovie';
import { getAllTicket } from '~/features/ticket/TicketSlice';
import { getAllSeatByScreen } from '~/features/seatslice/SeatSlice';
import { toast, ToastContainer } from 'react-toastify';
import { getAllFood } from '~/features/food/FoodSlice';
import { getScreenById } from '~/features/screen/ScreenSlice';





const MovieDetail = () => {
    const detailmovie = useSelector((state)=> state.movie.detailmovie);
    const loadding = useSelector((state)=> state.movie.loadding);
    const showtimecurrentdate = useSelector((state)=> state.showtimes.showtimecurrentdate);
    const alltheater = useSelector((state)=> state.theater.theaters);
    const allticket = useSelector((state)=> state.ticket.allticket);
    const theaterbycity = useSelector((state)=> state.theater.theaterbycity);
    const seats = useSelector((state)=> state.seat.seat);
    const food = useSelector((state)=> state.food.allfood);
    const [second, setSecond] = useState(300);
    const screenbyid = useSelector((state)=> state.screen.screen);



    const dispatch = useDispatch();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [schedule, setSchedule] = useState(
        showtimecurrentdate && showtimecurrentdate[0]?.date
          ? getDateFromDate(showtimecurrentdate[0].date)
          : null
      );
    const [quantity, setQuantity] = useState({});
    const [quantityFood, setQuantityFood] = useState({});

    

    const [theatercity, setTheaterCity] = useState('Thành Phố Hồ Chí Minh');
    const {id} = useParams();
    const [count, isCount] = useState(false);
    const [time, setTime] = useState({});

    const handleClickGetDate = (e) => {
        const selectDate = e.currentTarget.querySelector('span').textContent;
        setSchedule(selectDate);
    }
    const handleUniqueCityTheater = () => {
        const uniqueCity =  [... new Set( alltheater?.map(item=>item.city))];
       return uniqueCity;
    }
  
    useEffect(()=> {
    setSelectedSeats({});
    setSelectedSeats([]);
    }, [quantity])
   useEffect(()=> {

    let countdown;
    if(count)
    {
         countdown =  setInterval(()=> {
             setSecond((preSecond)=> {
                 if(preSecond === 0){
                    toast('Hết thời gian chờ')
                     clearInterval(countdown);
                     window.location.reload();
                     return preSecond;
                 }
                 else{
                     return preSecond -1;
                 }
             })
         }, 1000)
         
    }
    return () => clearInterval(countdown);
   }, [count])
    const handleSetSeat = ({ id, typeSeat }) => {
    
      

        const newTickets = allticket?.map(ticket => {
            switch (ticket.type) {
              case 'TICKET_STUDENT':
              case 'TICKET_ADULT_ALONE':
                return { ...ticket, type: 'SEAT_ALONE' };
              case 'TICKET_ADULT_COUPLE':
                return { ...ticket, type: 'SEAT_COUPLE' };
              default:
                return ticket; // Giữ nguyên nếu không thuộc các trường hợp trên
            }
          });
          const ticketCounts = newTickets?.reduce((acc, ticket) => {
            acc[ticket.type] = (acc[ticket.type] || 0) + (quantity[ticket.id] || 0);
            return acc;
        }, {});
        console.log('ticketCounts',ticketCounts);
        

        // Calculate the number of seats selected per type
        const selectedSeatCounts = selectedSeats.reduce((acc, seat) => {
            acc[seat.typeSeat] = (acc[seat.typeSeat] || 0) + 1;
            return acc;
        }, {});

        // Check if the seat type matches any ticket type
        if (ticketCounts[typeSeat]) {
            // Check if the user has selected more seats than allowed
            if ((selectedSeatCounts[typeSeat] || 0) < ticketCounts[typeSeat]) {
                // Add seat to the selected seats
                setSelectedSeats(prevSeats => [...prevSeats, { id, typeSeat }]);
            } else {
                toast(`Bạn đã chọn đủ số ghế loại ${typeSeat}!`);
            }
        } else {
            toast(`Vé của bạn không khớp với loại ghế ${typeSeat}!`);
        }
    };

    const getNameSeat = () => {
        let name = [] ;
        for(let i = 0; i < selectedSeats?.length ; i++)
        {
            const seat = seats.find(seat=> String(seat.id )=== String(selectedSeats[i].id));
        
            name.push(" "+seat.name);
        }
        console.log('namemmm', name);
        return name;
    }
    const handleSeatClick = (seat) => {
       
        // Toggle seat selection
        if (selectedSeats.some(selectedSeat => selectedSeat.id === seat.id)) {
            // If the seat is already selected, remove it
            setSelectedSeats(prevSeats => prevSeats.filter(selectedSeat => selectedSeat.id !== seat.id));
        } else {
            // If the seat is not selected, attempt to add it
            
            handleSetSeat(seat);
            isCount(true);
        }
    };

    console.log('screenbyid',screenbyid);
    useEffect(()=>{
   
        dispatch(getDetailMovie(id)).then((response)=>{
 
        });
        dispatch(getShowTimeFromCurrentDateToTwoDate()).then((response)=>{
   
        });
        dispatch(getAllTheater()).then((response)=>{

        });
        dispatch(getAllTicket()).then((response)=>{

        });
        dispatch(getAllFood());

 
       
 
    }, [dispatch])
    useEffect(()=>{
        dispatch(getTheaterByCity(theatercity)).then((response)=> {
           
        })

    }, [theatercity])
    
    useEffect(()=>{
        dispatch(getAllSeatByScreen(time.screenid)).then((response)=> {
     
        })
        dispatch(getScreenById(time.screenid));
    }, [time])
  
   const getNameTheater = (id) => {
    const theater =  alltheater?.find(theater => String(theater.id)===String(id));
    return theater?.name;
   }
   console.log('fooodđ',food);
   const getTotalPrice = (object, object2) => {
    console.log('object:', object); 
  
    let total = 0;
  
    for (const id of Object.keys(object)) {
       
      const matchingTicket = allticket?.find(ticket => String(ticket.id) === String(id));
  
      if (matchingTicket) {
        const price = matchingTicket.price ?? 0; // Use nullish coalescing for default price
        const quantity = object[id];
        console.log('quantityprice:', price);
        total += price * quantity;
      } else {
        console.warn(`No ticket found for id: ${id}`);
      }
    }
    for (const id of Object.keys(object2)) {
       
        const matchingTicket = food?.find(item => String(item.id) === String(id));
        console.log('matchingTicket food', matchingTicket);
    
        if (matchingTicket) {
          const price = matchingTicket.price ?? 0; 
          const quantity = object2[id];
          console.log('quantityprice:', price);
          total += price * quantity;
        } else {
          console.warn(`No ticket found for id: ${id}`);
        }
      }
  
    console.log('total:', total);
    return total;
  };
    const handleSetCity = (e) => {
        setTheaterCity(e.target.value);
    }
    console.log('time',time);
    console.log('allticket',allticket);

    if(loadding)
    {
        return <div ><p>Loading</p></div>
    }
    
    const renderDate = () => {
       const uniqueDate = [...new Set( showtimecurrentdate?.map(item=> item.date))];
       if(uniqueDate?.length>0)
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
    const handleSettime = ({value, theaterid, id, screenid}) => {
        setTime({value, theaterid, id, screenid});
    }
    const setIncreaseFood = ({id}) => {
        setQuantityFood(preQuantity => ({
            ...preQuantity,
            [id]:(preQuantity[id] || 0) +1 
        }))
    }
    const setDecreaseFood = ({id}) => {
        setQuantityFood(preQuantity => {
            const newQuantity = (preQuantity[id] || 0) - 1;
            return {
                ...preQuantity,
                [id]:newQuantity>=0? newQuantity : 0
            }
           
        })
    }
    const setIncrease = ({ id }) => {
        const increaseQuantity = (prevQuantity) => {
          const total = Object.values(prevQuantity).reduce((acc, curr) => acc + curr, 0);
      
          if (total < 8) {
            return {
              ...prevQuantity,
              [id]: (prevQuantity[id] || 0) + 1,
            };
          } else {
            toast('Bạn chỉ được đặt tối đa 8 vé');
            return prevQuantity; // Prevent quantity increase if total is 8 or more
          }
        };
      
        setQuantity(increaseQuantity);
      };
    const setDecrease = ({id}) => {
        
        setQuantity(preQuantity => {
            const newQuantity = (preQuantity[id] || 0) - 1;
            return {
                ...preQuantity,
                [id]:newQuantity>=0? newQuantity : 0,
             
            }
           
        })
    }
    console.log('time', time);
    console.log('quantity', quantity);
    console.log('selectedSeats', selectedSeats);




    //---------create table --------------
    const organizeData = (data) => {
        const organizedData = {};
        data.forEach(item => {
            const { id, rowSeat, number, name, statusSeat ,typeSeat} = item;
            if (!organizedData[rowSeat]) {
                organizedData[rowSeat] = [];
            }
            // Thay vì lưu các giá trị riêng lẻ, lưu đối tượng ghế vào mảng
            organizedData[rowSeat].push({ id, number, name,statusSeat , typeSeat});
        });
        return organizedData;
    }

    return (
       <div >
     <div> 
    
          <ToastContainer  position='top-center' autoClose={2000} className={'sizetoast'} /></div>
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
    <div>
        {theaterbycity&&theaterbycity?.length>0 ? (
            theaterbycity?.map(theater=>(
                <div className='movie-detail-list-screen'>
                <div className='movie-detail-list-screen-title'> <h2>{theater?.name}</h2> <IoIosArrowUp></IoIosArrowUp></div>
                <p>{theater?.address}</p>
            <ShowTimeMovie date={schedule} movieid={id} theaterid={theater?.id} time={time}  onSetTime={handleSettime}></ShowTimeMovie>
               
            </div>
            ))
        ): (<div></div>)}
 

    </div>

   
    </div>
    </div >
    <div className={Object.keys(time).length > 0?'':'order-all-ctn'}>
    <div className='choose-ticket'>
        <h1 className='h1-title'>chọn loại vé </h1>
        <div className='choose-ticket-ctn'>
            {
                allticket && allticket?.length>0 ?(
                    allticket?.map((item)=> (
                        <div className='choose-ticket-inner'>
                        <h2>{item?.name}</h2>
                        <h2 className='cl-yl'>{(item?.type === 'TICKET_ADULT_COUPLE') ? 'Đôi': 'Đơn'}</h2>
        
                        <h2>{item?.price}</h2>
        
                        <div class="quantity"><button onClick={()=>setDecrease({id:item?.id})} class="quantity-btn decrease">-</button><p>{quantity[item.id] || 0}</p><button onClick={()=>setIncrease({id:item?.id})} class="quantity-btn increase">+</button></div>
        
                    </div>
                    ))
                ) : (<div></div>)
            }
           
           
        </div>
    </div>

    <div className='choose-seat'>
        <h1 className='h1-title'>Chọn ghế</h1>
        <div className='screen-image'>
            <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1723003468/img-screen_oklitm.png'/>
           <div className='screen-title'> <h3>Màn hình</h3></div>
        </div>
        {
    Object.keys(organizeData(seats ? seats : [])).map(row => (
        <div className='list-seat' key={row}>
            <div className='list-seat-sort'>
                <div className='seat-sort-item'><span>{row}</span></div>
            </div>
            <table className='tableseat'>
                <tbody>  
                    <tr>
                        {
                            organizeData(seats ? seats : [])[row].map(seat => (
                                <td onClick={() => handleSeatClick(seat)} className={selectedSeats.some(selectedSeat => selectedSeat.id === seat.id) ? 'selected' : ''} key={seat.id}>{seat.name}</td>
                            ))
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    ))
}


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
            <div className='type-seat-inner'>
                <div className='type-seat-item zzz'></div>
                <p>Ghế đôi</p>
            </div>
        </div>
    </div>
    <div className='mb100'></div>
    <div className='choose-popcorn'>
        <h1 className='h1-title'> Chọn bắp nước</h1>
        <Popcorn setIncreaseFood = {setIncreaseFood}setDecreaseFood = {setDecreaseFood}
        quantityFood = {quantityFood}
          ></Popcorn>
    </div>
    </div>
    <div className= {Object.keys(time).length > 0?'order-ticket-time':'order-ticket-time order-all-ctn'}>
        <div className='order-ticket-time-ctn'>
        <div className='order-ticket-name'>
            <h1>{detailmovie?.title}</h1>
            <p>{getNameTheater(time?.theaterid)}</p>
            <p>Phòng chiếu: {screenbyid?screenbyid.name:''} | {getNameSeat()} | {time?time?.value:''} </p>
        </div>
        <div className='order-ticket-total'>
            <div className='order-ticket-total-time'>
                <p>Thời gian giữ vé</p>
                <h3>{Math.floor(second/60)}:{second%60}</h3>
            </div>
            <div className='order-ticket-total-amount'>
                <div className='order-ticket-total-amount-top'>
                    <span>Tạm tính </span>
                    <h3>{formatCurrency(getTotalPrice(quantity, quantityFood))}</h3>
                </div>
                <button className='order-ticket-total-button'>Đặt vé</button>
            </div>
        </div>
        </div>
    </div>
       </div>
    );
}

export default MovieDetail;