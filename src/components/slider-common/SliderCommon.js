import Slider from "react-slick";
import Arrow from "./Arrow"; 
import './slidelist.css';
import { IoIosPlayCircle } from "react-icons/io";
const SliderCommon = (props) => {
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
          <div className="sliderlist-inner">
          <img src="https://res.cloudinary.com/daubnjjos/image/upload/v1722847606/vay-ham-tren-khong_f5tqdh.jpg" alt="Slider 1" />
          <h1>Vây hãm trên không</h1>
          <div className="trailer-order">
            <a><IoIosPlayCircle></IoIosPlayCircle>Xem trailer</a>
            <button className="button">Đặt vé</button>
          </div>
        </div>
        <div className="sliderlist-inner">
          <img src="https://res.cloudinary.com/daubnjjos/image/upload/v1722847606/vay-ham-tren-khong_f5tqdh.jpg" alt="Slider 2" />
          <h1>Vây hãm trên không</h1>
          <div className="trailer-order">
            <a><IoIosPlayCircle></IoIosPlayCircle>Xem trailer</a>
            <button>Đặt vé</button>
          </div>
        </div>
        <div className="sliderlist-inner">
          <img src="https://res.cloudinary.com/daubnjjos/image/upload/v1722847606/vay-ham-tren-khong_f5tqdh.jpg" alt="Slider 3" />
          <h1>Vây hãm trên không</h1>
          <div className="trailer-order">
            <a><IoIosPlayCircle></IoIosPlayCircle>Xem trailer</a>
            <button>Đặt vé</button>
          </div>
        </div>
        <div className="sliderlist-inner">
          <img src="https://res.cloudinary.com/daubnjjos/image/upload/v1722847606/vay-ham-tren-khong_f5tqdh.jpg" alt="Slider 4" />
          <h1>Vây hãm trên không</h1>
          <div className="trailer-order">
            <a><IoIosPlayCircle></IoIosPlayCircle>Xem trailer</a>
            <button>Đặt vé</button>
          </div>
        </div>
          </Slider>


        </div>
      );
    }
export default SliderCommon;