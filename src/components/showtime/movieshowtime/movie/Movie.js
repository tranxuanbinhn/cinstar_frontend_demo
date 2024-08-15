import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getDetailTheater, getDetailTheaterForManyMovie } from "~/features/theater/TheaterSlice";
import { useDispatch } from "react-redux";

const Movie = ({movies,theaterId}) => {
    const dispatch = useDispatch();
    const theaterdetail = useSelector((state)=> state.theater.moviedetailformanymovie[theaterId])
    const loadding = useSelector((state)=> state.theater.loadding)

 
    useEffect(()=>{
        dispatch( getDetailTheaterForManyMovie(theaterId)).then((response)=>{
    
    });
    },[])
    const groupByTheaterId = movies.reduce((acc, current) => {
        const theaterId = current.theaterId;
      
      
        if (!acc[theaterId]) {
          acc[theaterId] = [];
        }
      
  
        acc[theaterId].push(current.time);
      
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
        {groupByTheaterId[theaterId].map((time, index) => (
            <a key={index} href="#">
              <span>{time}</span>
            </a>
          ))}
            

        </div>
    </div>
</div>)
}
export default Movie;