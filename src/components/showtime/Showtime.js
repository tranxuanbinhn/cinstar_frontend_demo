import './showtime.css';
import { AiOutlineSchedule } from "react-icons/ai";
import { BiSolidMovie } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { PiSubtitlesBold } from "react-icons/pi";
import { BsFillPersonFill } from "react-icons/bs";
const Showtime = () => {
    return (
        <div className='showtime'>
            <div className='showtime-select'>
                <div className='showtime-select-item mw290'>
                    <div className='title'>
                        <h1>
                            1. Ngày
                        </h1>
                        <span><AiOutlineSchedule /></span>
                    </div>
                    <form> 
                        <select>
                            <option value="Thứ 5">Thứ 5</option>
                        </select>
                    </form>
                </div>
                <div className='showtime-select-item mw590'>
                    <div className='title'>
                        <h1>
                            1. Ngày
                        </h1>
                        <span><BiSolidMovie /></span>
                    </div>
                    <form> 
                        <select>
                            <option value="Thứ 5">Thứ 5</option>
                        </select>
                    </form>
                </div>
                <div className='showtime-select-item mw290'>
                    <div className='title'>
                        <h1>
                            1. Ngày
                        </h1>
                        <span><MdLocationPin /></span>
                    </div>
                    <form> 
                        <select>
                            <option value="Thứ 5">Thứ 5</option>
                        </select>
                    </form>
                </div>
            </div>
            <div className='list-movies'>
                <div className='movie'>
                    <div className='movie-left'>
                        <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722926234/conan-movie-27_ipdyhd.png'/>
                        <h1>THÁM TỬ LỪNG DANH CONAN (LT) 2D: NGÔI SAO 5 CÁNH 1 TRIỆU ĐÔ (T13)</h1>
                        <div className='des'>
                            <span><CiShoppingTag/><p>Hoat hinh</p></span>
                            <span><FaRegClock/><p>Hoat hinh</p></span>
                            <span><FaEarthAmericas/><p>Hoat hinh</p></span>
                            <span><PiSubtitlesBold/><p>Hoat hinh</p></span>
                            <span><BsFillPersonFill/><p>Hoat hinh</p></span>
                        </div>
                    </div>
                    <div className='movie-right'>
                        <div className='theater-movie'>
                            <p>CINstar</p>
                            <h1>hai ba trung</h1>
                            <p>135 Hai Bà Trưng, Phường Bến Nghé ,Quận 1,Thành Phố Hồ Chí Minh</p>
                        </div>
                        <div className='screen'>
                            <p>Standard</p>
                            <div className='screen-list'>
                                <a><span>8:00</span></a>
                                <a><span>8:00</span></a>
                                <a><span>8:00</span></a>
                                <a><span>8:00</span></a>
                                <a><span>8:00</span></a>
                                <a><span>8:00</span></a>
                                <a><span>8:00</span></a>
                                <a><span>8:00</span></a>
                                <a><span>8:00</span></a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='showtime-sm button'>Xem TẤT cả lịch chiếu</div>
        </div>
    );
}
export default Showtime;