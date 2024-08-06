import Slider from "react-slick";
import Arrow from "../utility/Arrow";
import './promotion.css';
const Promotion = () => {
    const settings = {
        
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true, 
    prevArrow: <Arrow className="slick-prev" direction="prev" />,
    nextArrow: <Arrow className="slick-next" direction="next" />
      };
return (
    
<div className="promotion">
    <h1>KHUYẾN MÃI</h1>
    <Slider {...settings}>
        <div className="promotion-inner">
            <img src="https://res.cloudinary.com/daubnjjos/image/upload/v1722851069/km-m-2_krxawh.jpg"/>
        </div>
        <div className="promotion-inner">
            <img src="https://res.cloudinary.com/daubnjjos/image/upload/v1722851069/km-m-2_krxawh.jpg"/>
        </div>
        <div className="promotion-inner">
            <img src="https://res.cloudinary.com/daubnjjos/image/upload/v1722851069/km-m-2_krxawh.jpg"/>
        </div>
        </Slider>

        <a> <div className="all-promotion button">TẤT CẢ ƯU ĐÃI</div></a>
</div>
);
}
export default Promotion;