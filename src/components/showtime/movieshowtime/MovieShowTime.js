import { AiOutlineSchedule } from "react-icons/ai";
import { BiSolidMovie } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { PiSubtitlesBold } from "react-icons/pi";
import { BsFillPersonFill } from "react-icons/bs";
import { getDetailMovie } from "~/features/movie/MovieSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Movie from "./movie/Movie";
const MovieShowtime = ({movie,movieId}) => {
    //const moviedetail = useSelector((state)=> state.movie.detailmovie);
    const loadding = useSelector((state)=> state.movie.loadding);
    const dispatch = useDispatch();
    const [moviedetail, setMovieDetail] = useState();
    const [categorizedByTheaterId, setCategorizedByTheaterId] = useState({});
   
   

  useEffect(() => {

    const categorizedData = categorizeByTheaterId(movie);
     
    setCategorizedByTheaterId(categorizedData);
  }, [movie]);

    useEffect(()=> {
       
        dispatch(getDetailMovie(movieId)).then((response)=>{
         setMovieDetail(response?.payload)
        })
    },[movieId])

    
    const categorizeByTheaterId = (movies) => {
        return movies.reduce((acc, current) => {
          const theaterId = current.theaterId;
          
        
          if (!acc[theaterId]) {
            acc[theaterId] = [];
          }
          
       
          acc[theaterId].push(current);
          
          return acc;
        }, {});
      };

    if(loadding)
    {
        return <div>Loadding</div>
    }
     
    return(<div className='movie'>
        <div className='movie-left'>
            <img src={`${process.env.REACT_APP_API_IMG_URL}${moviedetail?.posterPath}`}/>
            <h1>{moviedetail?.title}</h1>
            <div className='des'>
          
                <span><FaRegClock/><p>{moviedetail?.runtime}</p></span>
         
            </div>
        </div>
        <div>
        {Object.keys(categorizedByTheaterId).length > 0 ? (
        Object.keys(categorizedByTheaterId).map((theaterId) => (
          <Movie key={theaterId} theaterId={theaterId} movies={categorizedByTheaterId[theaterId]} movieid={movieId} />
        ))
      ) : (
        <div>Không có dữ liệu</div>
      )}   
        </div>
    </div>)
}

export default MovieShowtime;