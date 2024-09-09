import React, { useEffect } from 'react';
import Slider from 'react-slick';
import './slider.css';
import '../utility/utility.css';
import Arrow from './Arrow';
import { useSelector,useDispatch } from 'react-redux';
import { getNewMovie } from '~/features/movie/MovieSlice';
const SliderPage = () => {
  const newmovies =  useSelector((state)=> state.movie.movie);
  const loadding =  useSelector((state)=> state.movie.loadding);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getNewMovie()).then((response)=>{
       
    })
   
  },[dispatch])
  if(loadding)
  {
    return <div>Loading...</div>;
  }
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
                  <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722842113/bay_phhjlv.png'/>
                </div>
                <div>
                  <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1725768960/chang-nu-phi-cong_dw9wzn.webp'/>
                </div>
        

            
           
          </Slider>
        </div>
      );
    }
    export default SliderPage;