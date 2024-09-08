import { IoIosPlayCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import './movieshow.css';



const MovieUpcomming = () => {
    const upcommingMovie = useSelector((state)=> state.movie.movieupcommings);
    return (<div className="movie-showing-list">
           {
               upcommingMovie && upcommingMovie?.length > 0 ? (
                upcommingMovie?.map((movieshowing) => (
                   <Link to={`/movie-detail/${movieshowing.id}`}>
                     <div className="sliderlist-inner" key={movieshowing.id}>
                        <img src={process.env.REACT_APP_API_IMG_URL + movieshowing.posterPath} alt={movieshowing.title} />
                        <h1>{movieshowing.title}</h1>
                        <div className="trailer-order">
                            <a><IoIosPlayCircle />Xem trailer</a>
                            <button className="button">Đặt vé</button>
                        </div>
                    </div>
                   </Link>
                ))
            ) : (
                <div>No movies available</div>
            )
            }
    </div>);
}
export default MovieUpcomming;