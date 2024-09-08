import './showtime.css';
import { AiOutlineSchedule } from "react-icons/ai";
import { BiSolidMovie } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import SliderCommon from '../slider-common/SliderCommon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShowtime } from '~/features/showtime/ShowtimeSlice';
import { getShowingMovie } from '~/features/movie/MovieSlice';
import { getAllTheater } from '~/features/theater/TheaterSlice';
import MovieShowtime from './movieshowtime/MovieShowTime';

const Showtime = () => {
    const [showtimedate, setShowTimeData]  = useState({
        date:'',
    });
    const showtimes = useSelector((state)=> state.showtimes.showtimes);
    const showingmovie = useSelector((state)=> state.movie.movieshowings);
    const alltheater = useSelector((state)=> state.theater.theaters);
    const loadding = useSelector((state)=> state.movie.loadding);
   
    const dispatch = useDispatch();
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedTheater, setSelectedTheater] = useState(null);

    //--------function select movie------------
    const handleMovieChange = (event) => {
        setSelectedMovie(event.target.value);
    }
     //--------function select theater------------
     const handleTheaterChange = (event) => {
        setSelectedTheater(event.target.value);
    }

    useEffect(() => {
        const today = new Date();
        const next5Days = [];

        for (let i = 0; i < 5; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);
            next5Days.push(nextDate);
        }

        setDates(next5Days);
    }, []);
    useEffect(() => {
        const today = new Date();
        setSelectedDate(today);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');   
        const formattedDate = `${year}-${month}-${day} 00:00:00`;  
    
        setShowTimeData(prestate => ({
            ...prestate,
            date: formattedDate
        }));
    }, []);
    console.log('showtimes', showtimes)
    useEffect(() => {
 
   
        if (showtimedate.date) {
            console.log('showtimedate.date', showtimedate.date)
            console.log('date', showtimedate)
            dispatch(getShowtime(showtimedate)).then(response => {
                console.log('showtimedate', response)
            });
        }
    }, [showtimedate, dispatch]);
    useEffect(() => {
       dispatch(getShowingMovie());
       dispatch(getAllTheater());
       
    }, [dispatch]);
    
    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('vi-VN', options);
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    useEffect(()=> {
        const selectedday = new Date(selectedDate);
        const year = selectedday.getFullYear();
        const month = String(selectedday.getMonth() + 1).padStart(2, '0'); // Tháng từ 0-11, nên cần cộng thêm 1
        const day = String(selectedday.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        

        console.log('formattedDate', formattedDate);
        console.log('selectedMovie', selectedMovie);

        console.log('selectedTheater', selectedTheater);


        dispatch(getShowtime({formattedDate, selectedMovie, selectedTheater})).then((response)=> {
            console.log('response is', response);
        });
        
    },[selectedDate, selectedMovie, selectedTheater])
    if(loadding)
    {
        return <div>Loading</div>;
    }

    const categorizedByMovieId = showtimes?.reduce((acc, current) => {
        const movieId = current.movieId; 
    
        if (!acc[movieId]) {
            acc[movieId] = [];
        }
    
        acc[movieId].push(current);
        return acc;
    }, {}); 
    console.log('categorizedByMovieId',categorizedByMovieId)
    return (
        <div className='showtime'>
            <div className='showtime-select'>
                <div className='showtime-select-item mw290'>
                    <div className='title'>
                        <h1>
                            1. Ngày
                        </h1>
                        <span><AiOutlineSchedule /></span>
                    </div>
                    <form> 
                    <select onChange={handleDateChange} value={selectedDate}>
            {dates.map((date, index) => (
                <option key={index} value={date.toISOString()}>
                    {formatDate(date)}
                </option>
            ))}
        </select>
                    </form>
                </div>
                <div className='showtime-select-item mw590'>
                    <div className='title'>
                        <h1>
                            2. Phim
                        </h1>
                        <span><BiSolidMovie /></span>
                    </div>
                    <form> 
                    <select onChange={handleMovieChange} value={selectedMovie}>
                        {showingmovie && showingmovie?.length > 0 ? ( 
                            showingmovie?.map((movie)=> (
                    
                            <option key={movie.id} value={movie.id}>{movie.title}</option>
                     
                            ))
                        
                    ) : (<div>Không có phim nào</div>)}
                           </select>
                    </form>
                </div>
                <div className='showtime-select-item mw290'>
                    <div className='title'>
                        <h1>
                            3.Rạp
                        </h1>
                        <span><MdLocationPin /></span>
                    </div>
                    <form> 
                        <select onChange={handleTheaterChange} value={selectedTheater}>
                          {
                           alltheater && alltheater?.length>0?
                           (
                            alltheater.map((theater)=> (
                                <option key={theater.id} value={theater.id}>{theater.name}</option>
                            ))
                           ):
                           (
                           <div></div>
                        )
                           }
                        </select>
                    </form>
                </div>
            </div>
            <div className='list-movies'>
            {
   categorizedByMovieId && Object.keys(categorizedByMovieId).length > 0 ? (
        Object.keys(categorizedByMovieId).map((movieId) => (
            <MovieShowtime movieId={movieId} movie={categorizedByMovieId[movieId]} />
        ))
    ) : (
        <div>Không có dữ liệu</div>
    )
}
            </div>
            
            <SliderCommon showingmovie={showingmovie}></SliderCommon>
        </div>
    );
}
export default Showtime;