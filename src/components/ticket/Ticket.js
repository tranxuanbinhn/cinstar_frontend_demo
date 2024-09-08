import { useDispatch, useSelector } from 'react-redux';
import './ticket.css';
import { deleteOrder, getTicket } from '~/features/order/OrderSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatCurrency, getDateFromDate, getDayOfWeekFromDate, getTimeFromTime } from '~/features/untility/Ultility';
import { setsuccess, showticketSecond } from '~/features/time/TimeSlice';

const Ticket = () => {
const success = useSelector((state)=>state.time.success);
const showticket = useSelector((state)=>state.time.showticket);
const tickeresponse = useSelector((state)=>state.order.tickeresponse);
const orders = useSelector((state)=> state.order.orders);
const error = useSelector((state)=> state.order.error);
const navigate = useNavigate();
const dispatch = useDispatch();
 
useEffect(()=>{

},[])
useEffect(()=> {

    let countdown;

    if(success && showticket>0)
    {
        countdown = setInterval(() => {
          
          
                 dispatch(getTicket);
                dispatch(getTicket(orders?.id));
                dispatch(showticketSecond());
          }, 1000);
    }
    if (success && showticket === 0) {
        clearInterval(countdown);
        toast('Hết thời gian chờ');
        navigate(`/`);
        dispatch(setsuccess(false));
        dispatch(deleteOrder())
        
    }
    
  
    return () => clearInterval(countdown);
   }, [success,showticket])
   
   
   
   if(!success)
   {
    toast('Some error')
    return (<div className='pd-b150'>
        <h1>404 Error Page #3</h1>
<p class="zoom-area"> </p>
<section class="error-container">
  <span>4</span>
  <span><span class="screen-reader-text">0</span></span>
  <span>4</span>
</section>
<div class="link-container">
  <a target="_blank" href="https://www.silocreativo.com/en/creative-examples-404-error-css/" class="more-link">Visit the original article</a>
</div>
    </div>)
   }
   if(error)
   {
    toast('Some error')
   }
return (
    <div className='ticket-ctn'>
    <div className='ticket-ctn-item'><h2>Chúng tôi đã gửi vé vào email của bạn</h2>
    <div>Trờ về trang chủ trong {Math.floor(showticket/60)} phút:{showticket%60} giây</div></div>
    <div class="ticket created-by-anniedotexe">
        <div class="left">
            <div class="image">
                <p class="admit-one">
                    <span>ADMIT ONE</span>
                    <span>ADMIT ONE</span>
                    <span>ADMIT ONE</span>
                </p>
                <div class="ticket-number">
                   <img src={process.env.REACT_APP_API_IMG_URL+tickeresponse?.img}/>
                </div>
            </div>
            <div class="ticket-info">
                <p class="date">
                    <span>{getDayOfWeekFromDate(tickeresponse?.date)}</span>
                    <span class="june-29">{getDateFromDate(tickeresponse?.date)}</span>
                    <span>{tickeresponse?.date.split('-')[0]}</span>
                </p>
                <div class="show-name">
                    <h1>{tickeresponse?.nameMovie}</h1>
                
                </div>
                <div class="time">
                    <p>{getTimeFromTime(tickeresponse?.time)}</p>
                    <p>Screen <span></span>{tickeresponse?.screen}</p>
                    <p>Seat <span></span>{tickeresponse?.numberSeat}</p>
                    <p>Food <span></span>{tickeresponse?.food}</p>
                </div>
                <p class="location"><span>{tickeresponse?.nameTheater}</span>
                    <span class="separator"><i class="far fa-smile"></i></span><span>{tickeresponse?.addressTheater}</span>
                </p>
            </div>
        </div>
        <div class="right">
            <p class="admit-one">
                <span>ADMIT ONE</span>
                <span>ADMIT ONE</span>
                <span>ADMIT ONE</span>
            </p>
            <div class="right-info-container">
                <div class="show-name">
                    <h1>SOUR Prom</h1>
                </div>
                <div class="time">
     
                    <p>Tổng tiền: <span>@</span></p>
                    <h1>  {formatCurrency(tickeresponse?.total)}</h1>
                </div>
              
                <p class="ticket-number">
                    {tickeresponse?.orderCode}
                </p>
            </div>
        </div>
    </div>
    </div>

);
}
export default Ticket;