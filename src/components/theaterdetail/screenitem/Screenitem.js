import { useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getThreeShowtimeByMovie } from "~/features/showtime/ShowtimeSlice";

const ScreenItem = ({ movieid }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getThreeShowtimeByMovie(movieid)).then((response) => {
            console.log('response', response);
        })
    }, [dispatch, movieid]);

    const threeshowtimes = useSelector((state) => state.showtimes.threeshowtimes[movieid]);
    
    console.log('movieid', movieid);
    console.log('threeshowtimes', threeshowtimes);

    // Nhóm các showtimes theo ngày
    const groupedShowtimes = threeshowtimes?.reduce((acc, showtime) => {
        const date = showtime.date.split(' ')[0]; 
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(showtime);
        return acc;
    }, {});

    return (
        <div className='screen-list'>
            {groupedShowtimes ? Object.keys(groupedShowtimes).map(date => (
                <div key={date} className='screen-item'>
                    <span><p>{date}</p><IoIosArrowUp/></span>
                    <div className='screen-item-inner'>
                        <p>Standard</p>
                        <div className='screen-item-inner-detail'>
                            {groupedShowtimes[date].map((showtime, index) => (
                                <a key={index}><span>{showtime.time}</span></a>
                            ))}
                        </div>
                    </div>
                </div>
            )) : (<div></div>)}
        </div>
    );
}

export default ScreenItem;
