import './header.css';
import { LuPopcorn } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { TiLocation } from "react-icons/ti";
import { AiOutlineSchedule } from "react-icons/ai";

function Header(props)
{
    return(
        <div className='header-ctn'>
              <div className="header">
        <div className="header-top">
            <a className="header-logo">
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722827207/header-logo_t4ycje.png' />
            </a>
            <div className="header-action ">
                <a className="header-action-order1 button-primary">
                <IoTicketOutline></IoTicketOutline>
                <span>ĐẶT VÉ NGAY</span>
            </a>
            <a className="header-action-order2 button-primary">
           <LuPopcorn/>
            <span>ĐẶT BẮP NƯỚC</span>
            </a>
            </div>
            <div className="header-mid-right">
                <div className="header-search">
                    <input className='search' type='text' placeholder='Tìm phim, rạp'>
                 
                    </input>
                    <span className='search-button'><CiSearch></CiSearch></span>

                </div>
                <div className="header-login">
                    <span> <CgProfile /></span>
                    <a>Đăng nhập</a>
                </div>

                <div className="header-language"></div>

            </div>
        </div>
        <div className="header-under">
            <div className="header-under-left">
                <ul><span><TiLocation></TiLocation></span> Chọn rạp</ul>
                <a> <span><AiOutlineSchedule></AiOutlineSchedule></span> Lịch chiếu</a>
            </div>
            <ul className="header-menu">
                <li className="header-menu-item"><a>Khuyến mãi</a></li>
                <li className="header-menu-item"><a>Thuê sự kiện</a></li>
                <li className="header-menu-item"><a>Tất cả các giải trí</a></li>
                <li className="header-menu-item"><a>Giới thiệu</a></li>

            </ul>

        </div>

     <div className='theater'>
        <li>Quoc Thanh</li>
        <li>Quoc Thanh</li>
        <li>Quoc Thanh</li>
        <li>Quoc Thanh</li>
        <li>Quoc Thanh</li>
        <li>Quoc Thanh</li>
        <li>Quoc Thanh</li>
     </div>
        </div>
        </div>
      
    );
}

export default Header;