import Slider from "react-slick";
import Arrow from "./Arrow"; 
import './slidelist.css';
import { IoIosPlayCircle } from "react-icons/io";
const SliderCommon = ({showingmovie}) => {
  console.log('showingmoasssssvie',showingmovie)
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
  
          

          <Slider {...settings}>
            {showingmovie&&showingmovie.length>0?(
              showingmovie.map((item)=>(
                <div className="sliderlist-inner">
                <img src={process.env.REACT_APP_API_IMG_URL+item?.posterPath} alt="Slider 1" />
                <h1>{item?.title}</h1>
                <div className="trailer-order">
                  <a><IoIosPlayCircle></IoIosPlayCircle>Xem trailer</a>
                  <button className="button">Đặt vé</button>
                </div>
              </div>
              
              ))
            ):(<div>Không có để hiển thị</div>)}
       
          </Slider>


        </div>
      );
    }
export default SliderCommon;