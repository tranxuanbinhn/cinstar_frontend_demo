import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDetailTheater, getDetailTheaterForManyMovie } from "~/features/theater/TheaterSlice";
import { useDispatch } from "react-redux";
import { getTimeFromTime } from "~/features/untility/Ultility";
import { Link } from "react-router-dom";

const Movie = ({movies,theaterId, movieid}) => {
    const dispatch = useDispatch();
    const theaterdetail = useSelector((state)=> state.theater.moviedetailformanymovie[theaterId])
    const loadding = useSelector((state)=> state.theater.loadding)
    //const [movieid, setMovieId] = useState();


 
    useEffect(()=>{
        dispatch( getDetailTheaterForManyMovie(theaterId)).then((response)=>{
    
    });
    },[])

     
    const groupByTheaterId = movies.reduce((acc, current) => {
        const theaterId = current.theaterId;
      
      
        if (!acc[theaterId]) {
          acc[theaterId] = [];
        }
      
  
        acc[theaterId].push(current.timeRedis);
      
        return acc;
      }, {});

    if(loadding)
    {
        return <div>Loadding</div>
    }
return ( <div className='movie-right'>
    <div className='theater-movie'>
        <p>Cinstar</p>
        <h1>{theaterdetail?.name}</h1>
        <p>{theaterdetail?.address}</p>
    </div>
    <div className='screen'>
        <p>Standard</p>
        <div className='screen-list'>
        {groupByTheaterId[theaterId].map((timeRedis, index) => (
            <Link to={`/movie-detail/${movieid}`}>
             <span>{getTimeFromTime(timeRedis) }</span>
            </Link>
             
           
          ))}
            

        </div>
    </div>
</div>)
}
export default Movie;