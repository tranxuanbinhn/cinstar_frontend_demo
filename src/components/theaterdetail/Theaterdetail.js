import './theaterdetail.css';
import CategoryMovie from './category-movie/CategoryMovie';
import Promotion from '../promotion/Promotion';
const Theaterdetail = () => {
    
    return (
        <div className='theater-container'>
            <div className='banner'>
               <div className='banner-img'>
               <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722943312/01-Quoc-Thanh-masthead_h4e4bm.jpg'/>
               </div>
                <div className='banner-infor'>
                    <h1>CinStar Quoc Thanh</h1>
                    <p>271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Thành Phố Hồ Chí Minh</p>
                </div>
            </div>
            <div className='type-movie'>
                <li className='type-movie-item'>Phim đang chiếu</li>
                <li className='type-movie-item'>Phim đang chiếu</li>
                <li className='type-movie-item'>Phim đang chiếu</li>
                <li className='type-movie-item'>Phim đang chiếu</li>

            </div>
            
            <CategoryMovie/>
            <div className='pb150'></div>
            <Promotion/>
            <div className='pb150'></div>
        </div>
    );
}

export default Theaterdetail;