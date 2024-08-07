import './categorymovie.css';
import { BiSolidMovie } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { PiSubtitlesBold } from "react-icons/pi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
const CategoryMovie = (props) => {
    return (
    <div className='category'>
       <h1>Phim dang chieu</h1>
       <div className='category-list'>
       <div className='category-item'>
            <div className='img'>
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722944792/deadpool-va-wolverine_x4zlgb.png'/>
            </div>
            <div className='information'>
                <h1>THÁM TỬ LỪNG DANH CONAN (LT) 2D: NGÔI SAO 5 CÁNH 1 TRIỆU ĐÔ (T13)
                </h1>
                <div className='information-tag'>
                <span className='cl'><CiShoppingTag/><span>Hoat hinh</span></span>
                            <span className='cl'><FaRegClock/><span>Hoat hinh</span></span>
                            <span className='cl'><FaEarthAmericas/><span>Hoat hinh</span></span>
                            <span className='cl'><PiSubtitlesBold/><span>Hoat hinh</span></span>
                            <span className='cl'><BsFillPersonFill/><span>Hoat hinh</span></span>
                </div>
                <div className='screen-list'>
                    <div className='screen-item'>
                        <span><p>Thứ Ba, 06/08/2024</p><IoIosArrowUp/></span>
                        <div className='screen-item-inner'>
                            <p>Standard</p>
                            <div className='screen-item-inner-detail'>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                
                            </div>
                            </div>
                            
                    </div>
                </div>
             <div className='smst'>
             <a className='showmore-st'>Xem thêm lịch chiếu </a>
             </div>
            </div>
        </div>
        <div className='category-item'>
            <div className='img'>
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722944792/deadpool-va-wolverine_x4zlgb.png'/>
            </div>
            <div className='information'>
                <h1>THÁM TỬ LỪNG DANH CONAN (LT) 2D: NGÔI SAO 5 CÁNH 1 TRIỆU ĐÔ (T13)
                </h1>
                <div className='information-tag'>
                <span className='cl'><CiShoppingTag/><span>Hoat hinh</span></span>
                            <span className='cl'><FaRegClock/><span>Hoat hinh</span></span>
                            <span className='cl'><FaEarthAmericas/><span>Hoat hinh</span></span>
                            <span className='cl'><PiSubtitlesBold/><span>Hoat hinh</span></span>
                            <span className='cl'><BsFillPersonFill/><span>Hoat hinh</span></span>
                </div>
                <div className='screen-list'>
                    <div className='screen-item'>
                        <span><p>Thứ Ba, 06/08/2024</p><IoIosArrowUp/></span>
                        <div className='screen-item-inner'>
                            <p>Standard</p>
                            <div className='screen-item-inner-detail'>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                
                            </div>
                            </div>
                            
                    </div>
                </div>
             <div className='smst'>
             <a className='showmore-st'>Xem thêm lịch chiếu </a>
             </div>
            </div>
        </div>
        <div className='category-item'>
            <div className='img'>
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722944792/deadpool-va-wolverine_x4zlgb.png'/>
            </div>
            <div className='information'>
                <h1>THÁM TỬ LỪNG DANH CONAN (LT) 2D: NGÔI SAO 5 CÁNH 1 TRIỆU ĐÔ (T13)
                </h1>
                <div className='information-tag'>
                <span className='cl'><CiShoppingTag/><span>Hoat hinh</span></span>
                            <span className='cl'><FaRegClock/><span>Hoat hinh</span></span>
                            <span className='cl'><FaEarthAmericas/><span>Hoat hinh</span></span>
                            <span className='cl'><PiSubtitlesBold/><span>Hoat hinh</span></span>
                            <span className='cl'><BsFillPersonFill/><span>Hoat hinh</span></span>
                </div>
                <div className='screen-list'>
                    <div className='screen-item'>
                        <span><p>Thứ Ba, 06/08/2024</p><IoIosArrowUp/></span>
                        <div className='screen-item-inner'>
                            <p>Standard</p>
                            <div className='screen-item-inner-detail'>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                <a><span>17:05</span></a>
                                
                            </div>
                            </div>
                            
                    </div>
                </div>
             <div className='smst'>
             <a className='showmore-st'>Xem thêm lịch chiếu </a>
             </div>
            </div>
        </div>
       </div>
    </div>);
}

export default CategoryMovie;