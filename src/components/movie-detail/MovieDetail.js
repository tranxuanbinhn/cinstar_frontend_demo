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
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailMovie, getid } from '~/features/movie/MovieSlice';
import { getShowtime, getShowTimeFromCurrentDateToTwoDate } from '~/features/showtime/ShowtimeSlice';
import { formatCurrency, getDateFromDate, getDayOfWeekFromDate, getTimeFromTime } from '~/features/untility/Ultility';

import { getAllTheater, getTheaterByCity } from '~/features/theater/TheaterSlice';
import ShowTimeMovie from './Showtimemovie/Showtimemovie';
import { getAllTicket, saveticketrelation } from '~/features/ticket/TicketSlice';
import { getAllSeatByScreen } from '~/features/seatslice/SeatSlice';
import { toast, ToastContainer } from 'react-toastify';
import { getAllFood, savefoodrelation } from '~/features/food/FoodSlice';
import { getScreenById } from '~/features/screen/ScreenSlice';
import { decrementSecond, orderinfor, setcount } from '~/features/order/OrderSlice';
import { decrementTimeCounter, resetTimeCounter, setpayment } from '~/features/time/TimeSlice';





const MovieDetail = () => {
    const detailmovie = useSelector((state)=> state.movie.detailmovie);
    const loadding = useSelector((state)=> state.movie.loadding);
    const showtimecurrentdate = useSelector((state)=> state.showtimes.showtimecurrentdate);
    const alltheater = useSelector((state)=> state.theater.theaters);
    const allticket = useSelector((state)=> state.ticket.allticket);
    const theaterbycity = useSelector((state)=> state.theater.theaterbycity);
    const seats = useSelector((state)=> state.seat.seat);
    const food = useSelector((state)=> state.food.allfood);
    const ticketrelation = useSelector((state)=> state.ticket.ticketrelation);
    const [isCounting, setIsCounting] = useState(false);
 

    const screenbyid = useSelector((state)=> state.screen.screen);
    const second = useSelector((state)=> state.order.time);
    const count = useSelector((state)=>state.order.count);

    useEffect(() => {
    }, [count]);
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
   
    const [time, setTime] = useState({});


    const handleClickGetDate = (e) => {
        const selectDate = e.currentTarget.querySelector('span').textContent;
        setSchedule(selectDate);
    }
    const handleUniqueCityTheater = () => {
        const uniqueCity =  [... new Set( alltheater?.map(item=>item.city))];
       return uniqueCity;
    }

    //--------------set time---------------------

    const timecounter = useSelector((state) => state.time.timecounter);
    const location = useLocation();

    useEffect(() => {
       if(isCounting)
       {
        if (location.pathname === `/movie-detail/${id}` || location.pathname === '/checkout') {
            const interval = setInterval(() => {


                if (timecounter > 1) {
                    dispatch(decrementTimeCounter());
                } else {
                    clearInterval(interval);
                    window.location.reload(); 
                }
                
            }, 1000);

            return () => clearInterval(interval);
        }
       }
    }, [dispatch, location, isCounting, timecounter]);


  
    useEffect(()=> {
    //setSelectedSeats({});
    setSelectedSeats([]);
    }, [quantity])



    const handleSetSeat = ({ id, typeSeat }) => {
    
      

        const newTickets = allticket?.map(ticket => {
            switch (ticket.type) {
              case 'TICKET_STUDENT':
              case 'TICKET_ADULT_ALONE':
                return { ...ticket, type: 'SEAT_ALONE' };
              case 'TICKET_ADULT_COUPLE':
                return { ...ticket, type: 'SEAT_COUPLE' };
              default:
                return ticket; 
            }
          });
          const ticketCounts = newTickets?.reduce((acc, ticket) => {
            acc[ticket.type] = (acc[ticket.type] || 0) + (quantity[ticket.id] || 0);
            return acc;
        }, {});

        

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
                setIsCounting(true);
            } else {
                toast(`Bạn đã chọn đủ số ghế loại này!`);
            }
        } else {
            toast(`Vé của bạn không khớp với loại ghế !`);
        }
    };

    const getNameSeat = () => {
        let name = [] ;
        for(let i = 0; i < selectedSeats?.length ; i++)
        {
            const seat = seats.find(seat=> String(seat.id )=== String(selectedSeats[i].id));
        
            name.push(" "+seat.name);
        }
        
        return name;
    }
    const handleSeatClick = (seat) => {
       
       
        if (selectedSeats.some(selectedSeat => selectedSeat.id === seat.id)) {
         
            setSelectedSeats(prevSeats => prevSeats.filter(selectedSeat => selectedSeat.id !== seat.id));
        } else {
      
            
            handleSetSeat(seat);
          
            dispatch(getid(id));
            //setIsCounting(true); 
            dispatch(resetTimeCounter())
 
        }
    };
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
    console.log('time', time)
    useEffect(()=>{
        const data = {
            id:time?.screenid,
            showtimeid:time?.id
        }
        dispatch(getAllSeatByScreen(data)).then((response)=> {
        })
   if(time)
   {
    dispatch(getScreenById(time.screenid));
   }
    }, [time])
  
   const getNameTheater = (id) => {
    const theater =  alltheater?.find(theater => String(theater.id)===String(id));
    return theater?.name;
   }
   
   const getAddressTheater = (id) => {
    const theater =  alltheater?.find(theater => String(theater.id)===String(id));
    return theater?.address;
   }

   const getTotalPrice = (object, object2) => {

  
    let total = 0;
  
    for (const id of Object.keys(object)) {
       
      const matchingTicket = allticket?.find(ticket => String(ticket.id) === String(id));
  
      if (matchingTicket) {
        const price = matchingTicket.price ?? 0; // Use nullish coalescing for default price
        const quantity = object[id];

        total += price * quantity;
      } else {
  
      }
    }
    for (const id of Object.keys(object2)) {
       
        const matchingTicket = food?.find(item => String(item.id) === String(id));

    
        if (matchingTicket) {
          const price = matchingTicket.price ?? 0; 
          const quantity = object2[id];
          total += price * quantity;
        } else {
          console.warn(`No ticket found for id: ${id}`);
        }
      }
    return total;
  };
    const handleSetCity = (e) => {
        setTheaterCity(e.target.value);
    }

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



    const handleClickOrder = () => {
        const number =  Object.values(quantity).reduce((accumulator, currentValue) => {
              return accumulator + currentValue;
            }, 0)
          let namefood = [];
          for (const id of Object.keys(quantityFood)) {
         
              const matchingTicket = food?.find(item => String(item.id) === String(id));
         
          
              if (matchingTicket) {
                const name = matchingTicket.name; 
              namefood.push(name +" ");
              }
            }
   
          const objcet = {
              moviename:detailmovie?.title,
              theatername:getNameTheater(time?.theaterid),
              theateraddress:getAddressTheater(time?.theaterid),
              showtime:time?.value,
              screen:screenbyid.name,
              numberticket:number,
              numberseat:getNameSeat(),
              total:getTotalPrice(quantity, quantityFood), 
              namefood: namefood
  }
          dispatch(orderinfor(objcet));

        //  -------Create ticket relation-------------
        const entriesTicket = Object.entries(quantity);
        const seats = selectedSeats;
        let i ;
        for(i= 0; i< entriesTicket.length; i++)
        {
           
          for(let j = 0; j < entriesTicket[i][1]; j++)
            {
            
                const ticket= allticket.find(ticket => String(ticket.id )=== String(entriesTicket[i][0]));

                let selectseaeet;
                if(ticket.type ==="TICKET_ADULT_COUPLE")
                {
                     selectseaeet =  seats.shift(seat=>String(seat.typeSeat)==="SEAT_COUPLE");
                }
                if(ticket.type ==="TICKET_ADULT_ALONE" ||ticket.type === "TICKET_STUDENT")
                    {
                         selectseaeet =  seats.shift(seat=>String(seat.typeSeat)==="SEAT_ALONE");
                    }
              
                const ticketRelation = {
                    ticketId:entriesTicket[i][0],
                    showtimeId:time?.id,
                    seatId:selectseaeet?.id,


                }
         
                dispatch(saveticketrelation(ticketRelation));

            }
        }
        //  -------Create food relation-------------
    
        const foodentries = Object.entries(quantityFood);
            for(let t = 0; t < foodentries.length; t ++)
            {
                
                const foodrelation = {
                    foodId: foodentries[t][0],
                    quantity: foodentries[t][1]

                }
                dispatch(savefoodrelation(foodrelation));
            }
            dispatch(setpayment(true))
                
      }

    //---------create table --------------
    const organizeData = (data) => {
        const organizedData = {};
        data.forEach(item => {
            const { id, rowSeat, number, name, statusSeat ,typeSeat,status} = item;
            if (!organizedData[rowSeat]) {
                organizedData[rowSeat] = [];
            }
            // Thay vì lưu các giá trị riêng lẻ, lưu đối tượng ghế vào mảng
            organizedData[rowSeat].push({ id, number, name,statusSeat , typeSeat,status});
        });
        return organizedData;
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
            {/*<span className='cl '><CiShoppingTag/><span>Hoat hinh</span></span>*/}
                        <span className='cl'><FaRegClock/><span>{detailmovie?.runtime}</span></span>
                        {/*<span className='cl'><FaEarthAmericas/><span></span></span>*/}
                        {/*<span className='cl'><PiSubtitlesBold/><span>Hoat hinh</span></span>
                        <span className='cl'><BsFillPersonFill/><span>Hoat hinh</span></span>*/}
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
        
                        <h2>{formatCurrency(item?.price)}</h2>
        
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
                                <td   onClick={() => {
                                    if (!seat?.status) {
                                        handleSeatClick(seat);
                                    }
                                }}  className={selectedSeats.some(selectedSeat => selectedSeat.id === seat.id) ? 'selected seat-hv' : `seat-hv ${seat?.status? 'occupied' : ''}`} key={seat.id}>{seat.name}</td>
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
            <p>Phòng chiếu: {screenbyid?screenbyid.name:''} | {getNameSeat()} | {time?getTimeFromTime(time?.value):''} </p>
        </div>
        <div className='order-ticket-total'>
            <div className='order-ticket-total-time'>
                <p>Thời gian giữ vé</p>
                <h3>{Math.floor(timecounter/60)}:{timecounter%60}</h3>
            </div>
            <div className='order-ticket-total-amount'>
                <div className='order-ticket-total-amount-top'>
                    <span>Tạm tính </span>
                    <h3>{formatCurrency(getTotalPrice(quantity, quantityFood))}</h3>
                </div>
              <Link to={'/checkout'}>
              <button disabled={selectedSeats.length===0?true:false} onClick={handleClickOrder} className='order-ticket-total-button'>Đặt vé</button>
              </Link>
            </div>
        </div>
        </div>
    </div>
       </div>
    );
}

export default MovieDetail;