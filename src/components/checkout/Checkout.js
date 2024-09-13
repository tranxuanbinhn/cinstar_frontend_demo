import { useDispatch, useSelector } from 'react-redux';
import './checkout.css';
import { formatCurrency, getTimeFromTime } from '~/features/untility/Ultility';
import { useForm } from 'react-hook-form';
import { draftcustomer, saveCustomer } from '~/features/customer/CustomerSlice';
import { useEffect, useState } from 'react';
import { paymentOrder } from '~/features/payment/PaymentSlice';
import { toast, ToastContainer } from 'react-toastify';
import { createfoodRelation, createOrder, createticketOrder, createticketRelation, deleteticketorder, setcount, setcount300 } from '~/features/order/OrderSlice';
import { deleteticketrelation } from '~/features/ticket/TicketSlice';
import { deletefoodrelation } from '~/features/food/FoodSlice';
import { decrementTimeCounter, setpayment } from '~/features/time/TimeSlice';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';



export const Checkout = () => {
    const order = useSelector((state)=> state.order.orderinfor);
    const second = useSelector((state)=> state.order.time);
    const userInfor = useSelector((state)=> state.user.userInfor);
    const payment = useSelector((state)=> state.payment.payment)
    const error = useSelector((state)=> state.payment.error)
    const [typepayment, setTypePayment] = useState();
    const ticketrelation = useSelector((state)=> state.ticket.ticketrelation);
    const foodrelation = useSelector((state)=> state.food.foodrelation);
    const ticketrelations = useSelector((state)=> state.order.ticketrelation);
    const foodrelations = useSelector((state)=> state.order.foodrelation);
    const ticketorder =  useSelector((state)=> state.order.ticketorder);
    const customer =  useSelector((state)=> state.customer.customer);
    const customererr =  useSelector((state)=> state.customer.error);
    const orders =  useSelector((state)=> state.order.orders);
    const success =  useSelector((state)=> state.order.success);
    const paymenstatus =  useSelector((state)=> state.time.payment);

    //console.log('ticketrelations state',ticketrelations)

    
    const [page, setPage] = useState();
    const [cancel, setCancel] = useState(false);



    const {register, handleSubmit, watch, formState:{errors}} = useForm();
    const dispatch = useDispatch();
     
     

     



    useEffect(()=> {
        if(userInfor)
        {
            setPage('payment');
        }
        else{
            setPage('informationcustomer');
        }
    }, [])
    const onSubmit= (data) => {
        dispatch(saveCustomer(data));
        setPage('payment');
 
    }
    const handSelectPayment = (typepayment) => {
        setTypePayment(typepayment);
    }
    const handlePayment = async () => {
        const data = {
            infor:'thanh toan ve xem phim',
            total:order?.total
        }
        dispatch(setcount(false));
        await handleOrder();
        await dispatch(paymentOrder(data)).unwrap().then((response)=>{
            window.location.href = `${response.redirect_url}`
        });
        
    }
    const handlecreateOrderData = (ticketorder) => {
           let userId;
           let customerId;
           if(userInfor)
            {
                userId=userInfor.id;
            } else{
                customerId = customer?.id;
            }
            const  orderDTO = {
                ticketorderId:ticketorder.id,
                userId:userId===undefined?null:userId,
                customerId:customerId===undefined?null:customerId,
                totalPrice:Number(order?.total)
            }
             
            dispatch(createOrder(orderDTO)).unwrap().then();
    }
    const handleOrder = async () => {
        const tickets = [];
        const foods = [];

        for (let id in ticketrelation) {
             
            const obj = ticketrelation[id];
            let showtimeId = obj['showtimeId'];
            let ticketId = obj['ticketId'];
            const ticketobject = {
                ticketId: Number(ticketId),
                seatId: Number(id),
                showtimeId: showtimeId
            };
            tickets.push(ticketobject);
        }

         

        for (let id in foodrelation) {
             
            const obj = foodrelation[id];
            let quantity = obj['quantity'];

            const foodobject = {
                quantity: quantity,
                foodId: Number(id)
            };
            foods.push(foodobject);
        }

         
         
  
        
        const ticketrelationdata = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/ticketrelation`, tickets);

       var foodrelationdata;
        if (foods.length > 0) {

        foodrelationdata = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/foodrelation`, tickets);    
         }
         const ticketRelationIds = ticketrelationdata.data?.map(item=>item.id);
            let foodIds;
            if(foodrelationdata!=undefined)
            {
                foodrelationdata = foodrelations.map(item=>item.id);
            }
            const  ticketOrderDTO = {
                ticketRelationIds:ticketRelationIds,
                foodIds:foodIds
            }
            const ticketOrder = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/ticketorder`, ticketOrderDTO);

            const order= await handlecreateOrderData(ticketOrder?.data);
            
        
        dispatch(setcount300())

    } 
     
     
     
     

    const deleteticket = () => {
        dispatch(deleteticketorder());
    }

    //useEffect(()=>{
        //if(ticketrelations?.length >0){
        //    const ticketRelationIds = ticketrelations.map(item=>item.id);
        //    let foodIds;
        //    if(foodrelations?.length>0)
        //    {
        //        foodIds = foodrelations.map(item=>item.id);
        //    }
        //    const  ticketOrderDTO = {
        //        ticketRelationIds:ticketRelationIds,
        //        foodIds:foodIds
        //    }
        //    dispatch(createticketOrder(ticketOrderDTO)).unwrap().then(
        //    );
        //     dispatch(deleteticketorder())
        //}
        
    //},[ticketrelations])

    const timecounter = useSelector((state) => state.time.timecounter);
    const location = useLocation();
    useEffect(() => {
 
         if (location.pathname === '/checkout') {
             const interval = setInterval(() => {
 
 
                 if (timecounter > 0) {
                    
                     dispatch(decrementTimeCounter());
                 } else {
                    clearInterval(timecounter);
                    toast.info("Thời gian đã hết! Chuyển về trang chủ trong 3 giây...", {
                        onClose: () => {
                            window.location.href = '/'; // Chuyển về trang chủ sau khi thông báo đóng
                        }
                    });
                    setTimeout(() => {
                        window.location.href = '/'; // Chuyển về trang chủ sau 3 giây
                    }, 3000);
                 }
                 
             }, 1000);
 
             return () => clearInterval(interval);
         }

     }, [dispatch, location,timecounter]);
 
    //useEffect(()=>{
    //    if(ticketorder && Object.keys(ticketorder).length > 0){
    //       let userId;
    //       let customerId;
    //       if(userInfor)
    //        {
    //            userId=userInfor.id;
    //        } else{
    //            customerId = customer?.id;
    //        }
    //        const  orderDTO = {
    //            ticketorderId:ticketorder.id,
    //            userId:userId===undefined?null:userId,
    //            customerId:customerId===undefined?null:customerId,
    //            totalPrice:Number(order?.total)
    //        }
             
    //        dispatch(createOrder(orderDTO)).unwrap().then()
             
             
    //    }
    //},[ticketorder])

    
    if(customererr)
    {
        toast('Customer error');
    }
    const Cancel= () => {
        setCancel(true);
        window.location.href = '/'
    }
     
     
    if(!paymenstatus)
    {
        toast('Có lỗi ');
        window.location.href = '/';
        return (<div className='pd-b150'>
            <h1>404 Error Page #3</h1>
    <p class="zoom-area"> </p>
    <section class="error-container">
      <span>4</span>
      <span><span class="screen-reader-text">0</span></span>
      <span>4</span>
    </section>
    <div class="link-container">
     <Link to={'/'}>Trở về trang chủ</Link>
    </div>
        </div>)
    }
    return (<div>
        <div className="checkout-ctn">
            <div><ToastContainer/></div>
            <h1>Trang Thanh toán</h1>
            <div className="checkout-title">
                <div className='checkout-title-innter'><span>1</span> <h2 className={page==='informationcustomer'?'co-yl':''}>Thông tin khách hàng</h2></div><div className='border-white'><div></div></div>
                <div className='checkout-title-innter'><span>2</span> <h2 className={page==='payment'?'co-yl':''}>Thanh toán</h2></div>
           
            </div>
            <div className="checkout-information">
                <div className="checkout-information-left">
                    <div  className={page==='payment'?'list-payment':'display-none list-payment'}>
                        <div className={typepayment==='vnpay'?'payment-choose payment-item':'payment-item'} onClick={()=>handSelectPayment('vnpay')}>
                            <h2>Thanh toán qua VNPAY </h2>
                        </div>
                        <div className='payment-button'>
                            <button onClick={Cancel}>Quay lại</button>
                            <button className={typepayment?'':'bg-c'} disabled={typepayment?false:true} onClick={handlePayment}>Thanh toán</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className={page==='informationcustomer'?'display-block':'display-none'}>
                  
                        <div >
                            <p> <span>Họ và tên:</span> <span style={{color:'red'}}>*</span></p>
                            <input {...register('name',{required:'Full name is requier'})} placeholder={errors.name?errors.name.message:"Full name"}
                          
                            />
                       
                        </div>
                        <div>
                            <p> <span>Số điện thoại:</span> <span style={{color:'red'}}>*</span></p>
                            <input {...register('phoneNumber',{required:'Phone number is required',
                            pattern:'/^\d{10}$/'})} placeholder={errors.phoneNumber?errors.phoneNumber.message:"Số điện thoại"}/>
                        
                        </div>
                        <div>
                            <p> <span>Email:</span> <span style={{color:'red'}}>*</span></p>
                            <input {...register('email', {required:"Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address"
                      }
                 })}  placeholder={errors.email?errors.email.message:"Email"}/>
           
                        </div>
                        <div className='policy-in'>
                        <input {...register('policy', {required:'phải tick vào ô này'})} type="checkbox"/> <p>Đảm bảo mua vé đúng với số tuổi quy định</p>
                        {errors.policy&&<p style={{color:'red'}}>{errors.policy.message}</p>}
                        </div>
                        <div className='policy-in'>
                        <input  {...register('policyin', {required:'phải tick vào ô này'})} type="checkbox"/> <p>Đồng ý với điều khoản của CineStar</p>
                        {errors.policyin&&<p style={{color:'red'}}>{errors.policyin.message}</p>}
                        </div>
                        <button>Tiếp tục</button>
                    </form>
                </div>
                <div className="checkout-information-right">
            
                        <div className='infor-title'><h2 className='fw-600'>{order?.moviename}</h2> <div className="timekeepticket">
                            <h2>Thời gian giữ vé</h2>
                            <div>{Math.floor(timecounter/60)}:{timecounter%60}</div>
                        </div></div>
                       
                        <div className="infor-theater">
                            <h2>{order?.theatername}</h2>
                            <p>{order?.theateraddress}</p>
                        </div>
                        <div className="timeforticket">
                            <h3>Thời gian</h3>
                            <p>{getTimeFromTime(order?.showtime)}</p>
                        </div>
                        <div className="infor-screen">
                            <div>
                                <span>Phòng chiếu</span>
                            <span>{order?.screen}</span>
                                </div>
                                <div>
                                <span>Số vé</span>
                            <span>{order?.numberticket}</span>
                                </div>
                                
                        </div>
                        <div className="infor-seat" >
                            <div>
                                <span>Loại ghế</span>
                                <span>Ghế thường</span>
                            </div>
                            <div>
                                <span>Số ghế</span>
                                <span>{order?.numberseat}</span>
                            </div>
                        </div>
                        <div className="infor-food">
                            <h3>Bắp nước</h3>
                          <div>  <span>{order?.namefood}</span></div>
                        </div>
                        <div className="infor-total">
                            <h1>Số tiền cần thanh toán</h1>
                            <h1 className='white'>{formatCurrency(order?.total)}</h1>
                        </div>
                 
                </div>

            </div>
        </div>
    </div>);

}