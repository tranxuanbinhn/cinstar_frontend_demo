import Slider from "react-slick";
import Arrow from "./Arrow"; 
import './slidelist.css';
import { IoIosPlayCircle } from "react-icons/io";
import { Link } from "react-router-dom";
const SlideList = ({ nameTitle, movieshowings }) => {

    const settings = {
        
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true, 
    prevArrow: <Arrow className="slick-prev" direction="prev" />,
    nextArrow: <Arrow className="slick-next" direction="next" />
      };
      return (
        <div className="SliderList">
         <h1>{nameTitle}</h1>
          
         
          <Slider {...settings}>
            {
               movieshowings && movieshowings.length > 0 ? (
                movieshowings.map((movieshowing) => (
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
        
       
          </Slider>

    <a ><div className="viewmore button">Xem thêm</div></a>
        </div>
      );
    }
export default SlideList;