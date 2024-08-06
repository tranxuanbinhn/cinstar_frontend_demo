import React from 'react';
import Slider from 'react-slick';
import './slider.css';
import '../utility/utility.css';
import Arrow from './Arrow';
const SliderPage = () => {
    const settings = {
     
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true, 
    prevArrow: <Arrow className="slick-prev" direction="prev" />,
    nextArrow: <Arrow className="slick-next" direction="next" />
      };
      return (
        <div className="Slider mt-1348">
      
          <Slider {...settings}>
            <div>
              <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722841944/1215x365_5__r7qq7z.jpg'/>
            </div>
         
            <div>
              <img src='   https://res.cloudinary.com/daubnjjos/image/upload/v1722842113/bay_phhjlv.png'/>
            </div>
          </Slider>
        </div>
      );
    }
    export default SliderPage;