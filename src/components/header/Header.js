import './header.css';
import { LuPopcorn } from "react-icons/lu";
import { IoTicketOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { TiLocation } from "react-icons/ti";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoPersonCircleSharp } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { logoutUser } from '~/features/auth/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllTheater } from '~/features/theater/TheaterSlice';
import { getByFind } from '~/features/movie/MovieSlice';


function Header(props)
{
    const theaters = useSelector((state)=>state.theater.theaters)
    const loading = useSelector((state)=>state.theater.loading)
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    
    const handleSearch = () => {
        if(search.trim())
        {
            dispatch(getByFind(search)).then((response)=>{
                console.log('isssssssss', response)
            })
            navigate('/search')
        }
    }
    const handleSetSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleKeyPress = (e) => {
        if(e.key === 'Enter')
        {
            handleSearch();
        }
    }

    const logout = () => {
        dispatch(logoutUser())
            .then((response) => {
            
                    window.location.href = '/';
              
            })
            .catch((error) => {
                console.error('Logout error:', error);
                toast('Logout failed. Please try again.');
            });
    };
    useEffect(()=>{
        dispatch(getAllTheater()).then((response)=>{
            console.log('response', response);
        })
    }
,[])
if(loading)
    {
        return <div><p>loading...</p></div>
    }
    return(
        <div className='header-ctn'>
            <ToastContainer position='top-center'></ToastContainer>
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
                    <input onKeyDown={handleKeyPress} value={search} onChange={handleSetSearch} className='search' type='text' placeholder='Tìm phim, rạp'>
                 
                    </input>
                    <span onClick={handleSearch} className='search-button'><CiSearch></CiSearch></span>

                </div>
                {props.userInfor ? (
                            <div className="header-user-info">
                                <div className='hvb'>
                                <span className='cl-main hv'>Xin chào, {props.userInfor.username}</span>
                               
                               <div className='infor'>
                                    <div> <IoPersonCircleSharp /><a>Trang cá nhân</a></div>
                                    <div onClick={logout}><TbLogout2></TbLogout2><a>Đăng xuất</a></div>
                                </div>
                               </div>
                            </div>
                        ) : (
                            <div className="header-login">
                                <span><CgProfile /></span>
                                <a href="/login">Đăng nhập</a>
                            </div>
                        )}
                <div className="header-language"></div>

            </div>
        </div>
        <div className="header-under">
            <div className="header-under-left">
                <div className='choose-theater'> <a><span><TiLocation></TiLocation></span> Chọn rạp</a>
               <div className='choose-ctn'>
               <div className='choose-theater-items'>
                {theaters && theaters?.length>0? (
                    theaters?.map((theater)=>(
                        <li key={theater?.id}><Link to={`/theater/${theater.id}`}>{theater?.name}</Link></li>
                    ))
                    ):(<div>Error</div>) }
                    
              
                </div>
               </div>
                </div>
               <Link to={'/showtimes'}><span><AiOutlineSchedule></AiOutlineSchedule></span> Lịch chiếu</Link> 
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