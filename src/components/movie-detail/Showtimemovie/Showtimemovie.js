import { useEffect, useState } from "react";
import { MdOndemandVideo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getShowtime, getShowtimeToOrder } from "~/features/showtime/ShowtimeSlice";
import { getTimeFromTime } from "~/features/untility/Ultility";
import { isEqual } from 'lodash'; 



const ShowTimeMovie = ({date,movieid, theaterid, time, onSetTime}) => {
 
    const dispatch = useDispatch();
    const showtime = useSelector((state)=>state.showtimes.showtimefororder[theaterid]);
 
     
    useEffect(()=>{

            const currentyear = new Date();
            const year = currentyear.getFullYear();
            const datemonth = date?.split("/");
            const month = datemonth?datemonth[1]:'';
            const day = datemonth?datemonth[0]:''; 
            const fulldate = year + '-' + month + '-' + day;
         

     
        const newObject = {formattedDate:fulldate, selectedMovie:movieid, selectedTheater:theaterid}
        dispatch(getShowtimeToOrder(newObject)).then((response)=>{
             
        })
    },[date,movieid, theaterid])
    
  
     
    return (    <div className='movie-detail-screen-item'>
        <div className='movie-detail-screen-item-alert'>
        <MdOndemandVideo></MdOndemandVideo> <p>Hiện chưa có lịch chiếu</p>
        </div>
        <div className='movie-detail-screen-item-ctn'>
         <p>Standard</p>
         <div className='movie-detail-screen-inner'>
        {showtime && showtime?.length > 0?(
            showtime?.map((item)=>(
        
           
              <a className={(isEqual(time,{value:item.timeRedis,theaterid: item.theaterId, id:item.id, screenid:item.screenId})?'bd-yl':'')} onClick={()=>onSetTime({value:item.timeRedis,theaterid: item.theaterId, id:item.id, screenid:item.screenId
              })}>{getTimeFromTime(item.timeRedis) }</a>


            ))
        ):(<div></div>)}
            </div>
        </div>
    </div>)
}
export default ShowTimeMovie;