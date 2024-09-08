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
import { decrementSecond, setcount, setcount300 } from '~/features/order/OrderSlice';
import ChatUser from '../chat/ChatUser';



function Header(props)
{
    const theaters = useSelector((state)=>state.theater.theaters)
    const loading = useSelector((state)=>state.theater.loading)
    const userInfor = useSelector((state)=> state.user.userInfor);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const count = useSelector((state)=>state.order.count);
    const second = useSelector((state)=>state.order.time);
    const getid = useSelector((state)=> state.movie.id);

    //useEffect(()=> {

    //    let countdown;
    //    if(count && second>0)
    //    {
    //        countdown = setInterval(() => {
              
    //              dispatch(decrementSecond());
     
                
    //          }, 1000);
    //    }
    //    if (count && second === 0) {

    //        clearInterval(countdown);
    //        toast('Hết thời gian chờ');

    //        dispatch(setcount(false));

    //        navigate(`/movie-detail/${getid}`);
            

    //    }
        
      
    //    return () => clearInterval(countdown);
    //   }, [count,second])

    
    const handleSearch = () => {
        if(search.trim())
        {
            dispatch(getByFind(search)).then((response)=>{

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
               
                toast('Logout failed. Please try again.');
            });
    };
    useEffect(()=>{
        dispatch(getAllTheater()).then((response)=>{
    
        })
    }
,[])
if(loading)
    {
        return <div><p>loading...</p></div>
    }
    return(
        <div className='header-ctn'>
            <ChatUser></ChatUser>
           <div> <ToastContainer position='top-center'></ToastContainer></div>
              <div className="header">
        <div className="header-top">
            <Link to={'/'} className="header-logo">
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722827207/header-logo_t4ycje.png' />
            </Link>
            <div className="header-action ">
                <a className="header-action-order1 button-primary">
                <IoTicketOutline></IoTicketOutline>
               <Link to={'/order'}><span>ĐẶT VÉ NGAY</span></Link> 
            </a>
       
            </div>
            <div className="header-mid-right">
                <div className="header-search">
                    <input onKeyDown={handleKeyPress} value={search} onChange={handleSetSearch} className='search' type='text' placeholder='Tìm phim, rạp'>
                 
                    </input>
                    <span onClick={handleSearch} className='search-button'><CiSearch></CiSearch></span>

                </div>
                {userInfor ? (
                            <div className="header-user-info">
                                <div className='hvb'>
                                <span className='cl-main hv'>Xin chào, {userInfor?.username}</span>
                               
                               <div className='infor'>
                                    <div> <IoPersonCircleSharp /><Link style={{color:'#f8f0fa'}} to={'/account/account-profile'}>Trang cá nhân</Link></div>
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
                <div className='choose-theater'>
                        <div className='bright'></div>
                     <a className='hover-a'><span><TiLocation></TiLocation></span> Chọn rạp</a>
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