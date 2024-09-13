import { useDispatch, useSelector } from 'react-redux';
import './person.css';
import { useEffect, useState } from 'react';
import { changePassword, getById, updateUser } from '~/features/auth/UserSlice';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import FormUpdate from './FormUpdate';
import { FormPasssword } from './FormPassword';
import { getAllOrderByUser } from '~/features/order/OrderSlice';
import { formatCurrency } from '~/features/untility/Ultility';
import { getTheaterByOrder } from '~/features/theater/TheaterSlice';
export const Person = () => {
    const [page,setPage] = useState('infor');
const {register, handleSubmit, watch, formState:{errors}} = useForm();

    const userInfor = useSelector((state)=> state.user.userInfor);
    const userdetail = useSelector((state)=> state.user.userdetail);
    const allordergetbyuser = useSelector((state)=> state.order.allordergetbyuser);
    const theaterbyorder =  useSelector((state)=> state.theater.theaterbyorder);


    const gettheaterbyorder = (id) => {
        const data = {
            userName: userInfor?.username,
            id:id
        }
        dispatch(getTheaterByOrder(data));

    }
       
    const handleClick = (value) => {
        setPage(value);
    }
    const dispatch = useDispatch();
    if(!userInfor)
    {
        window.location.href = '/';
    }
    useEffect(()=> {
        dispatch(getById(userInfor?.username))
        dispatch(getAllOrderByUser(userInfor?.username))
    }, [dispatch,userInfor])
    
    return (<div>
        <div className="person-ctn">
            <div className="person-left">
                <div className="person-name">
                    <h2>Name</h2>
                </div>
                <div className="person-infor">
                    <div onClick={()=>handleClick('infor')} className={page==='infor'?"customer-information yl":"customer-information"}>Thông tin người dùng</div>
                    <div onClick={()=>handleClick('history')} className={page==='history'?"order-history yl":"order-history" }>Lịch sử mua hàng</div>
                </div>
                <div className='logout-button'>
                    <p>Logout</p>
                </div>
            </div>
            <div className={page==='infor'?"person-right displayblock":"person-right"}>
                <h1>Thông Tin khách hàng</h1>
                <div className="person-right-change">
                  

            <FormUpdate></FormUpdate>
            <FormPasssword></FormPasssword>
                 
                 
                </div>
               
            </div>
            <div className={page==='history'?'infor-history-order displayblock':"infor-history-order"}>
                <h1>Lịch sử mua hàng</h1>
                <div className='infor-history-order-inner'>
                  <table>
                    <tr>
                        <td>Mã đơn</td>
                        <td>Hoạt động</td>
                        <td>Chi nhánh</td>
                        <td>Ngày</td>
                        <td>Tổng cộng</td>
                    </tr>
                 {
                    allordergetbyuser&&allordergetbyuser?.length > 0 ? (
                        allordergetbyuser?.map(order => (
                            <tr>
                            <th>{order?.ordercode}</th>
                            <th>Hoạt động</th>
                            <th onClick={()=>gettheaterbyorder(order?.id)}>{theaterbyorder[order?.id]?.name}</th>
                            <th>{(order?.createDate).slice(0,10)}</th>
                            <th>{formatCurrency(order?.totalPrice)}</th>
                        </tr>
                        ))
                    ) : (<div>Không có nội dung hiển thị</div>)
                 }
                   
                  </table>

                </div>
            </div>
        </div>
    </div>);
}