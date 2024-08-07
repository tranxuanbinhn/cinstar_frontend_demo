import './moviedetail.css';
import { CiShoppingTag } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { PiSubtitlesBold } from "react-icons/pi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { FaPlayCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";
import Popcorn from '../orderpopcorn/popcorn/Popcorn';

const MovieDetail = () => {
    return (
       <div >
         <div className='movie-detail'>
        <div className='img'>
            <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722944792/deadpool-va-wolverine_x4zlgb.png'/>
        </div>
        <div className='information'>
            <h1 >THÁM TỬ LỪNG DANH CONAN (LT) 2D: NGÔI SAO 5 CÁNH 1 TRIỆU ĐÔ (T13)
            </h1>
            <div className='information-tag movie-detail-tag'>
            <span className='cl '><CiShoppingTag/><span>Hoat hinh</span></span>
                        <span className='cl'><FaRegClock/><span>Hoat hinh</span></span>
                        <span className='cl'><FaEarthAmericas/><span>Hoat hinh</span></span>
                        <span className='cl'><PiSubtitlesBold/><span>Hoat hinh</span></span>
                        <span className='cl'><BsFillPersonFill/><span>Hoat hinh</span></span>
            </div>
            <div className='movie-detail-description'>
                <h1>mô tả</h1>
                <p>Khởi chiếu: Thứ Sáu, 02/08/2024</p>
            </div>
            <div className='movie-detail-description'>
                <h1>NỘI DUNG PHIM</h1>
                <p>Trong khi đến Hakodate tham gia một giải kiếm đạo, Conan và Heiji đụng độ siêu trộm Kaito Kid - khi hắn đang nhắm tới một thanh kiếm Nhật được cất giấu trong nhà kho của một gia đình tài phiệt. Thi thể một tay buôn vũ khí khét tiếng được phát hiện với vết chém hình chữ thập, và trùng hợp thay, "kho báu" mà gã truy lùng dường như cũng có liên quan mật thiết đến thanh kiếm cổ mà Kid đang nhắm tới.</p>
            </div>
            <div className='trailer'>
               <FaPlayCircle/> <a>Xem Trailer</a>
            </div>

       
        </div>
        
    </div>
    <div className='order-ticket'>
        <div className='schedule'>
            <h1 className='h1-title'>Lịch chiếu</h1>
            <div className='schedule-inner'>
                <div className='schedule-item'>
                    <span>06/08</span>
                    <span>Thứ 7</span>
                </div>
                <div className='schedule-item'>
                    <span>06/08</span>
                    <span>Thứ 7</span>
                </div>
                <div className='schedule-item'>
                    <span>06/08</span>
                    <span>Thứ 7</span>
                </div>
            </div>
        </div>

    <div className='movie-detail-list-theater'>
    <div className='title'>
        <h1 className='h1-title'>Danh sách rạp</h1>
        <div className='dropdown'>
            <FaLocationDot/>
            <p>HO CHI MINH</p>
        </div>
    </div>
    <div className='movie-detail-list-screen'>
        <div className='movie-detail-list-screen-title'> <h2>Cinstar</h2> <IoIosArrowUp></IoIosArrowUp></div>
        <p>vị trí</p>
        <div className='movie-detail-screen-item'>
            <div className='movie-detail-screen-item-alert'>
            <MdOndemandVideo></MdOndemandVideo> <p>Hiện chưa có lịch chiếu</p>
            </div>
        <div className='movie-detail-screen-item-ctn'>
        <p>Standard</p>
        <div className='movie-detail-screen-inner'>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
            <a>8:15</a>
        </div>
        </div>
        </div>
       
    </div>

   
    </div>
    </div>
    <div className='choose-popcorn'>
        <h1 className='h1-title'> Chọn bắp nước</h1>
        <Popcorn></Popcorn>
    </div>
       </div>
    );
}

export default MovieDetail;