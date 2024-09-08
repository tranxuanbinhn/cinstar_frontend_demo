import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createpayment, getResultPayment } from "~/features/payment/PaymentSlice";
import './result.css';
import { createfoodRelation, createticketRelation, deleteOrder } from "~/features/order/OrderSlice";
import { setsuccess } from "~/features/time/TimeSlice";
const Result = () => {
    const errorpayment = useSelector((state)=>state.payment.errorpayment);
    const dispatch = useDispatch();
    const result = useSelector((state)=>state.payment.result);
    
    const a = useSelector((state)=> state.order.ticketrelation);
    const b = useSelector((state)=> state.order.foodrelation);
    const orders = useSelector((state)=> state.order.orders);
    const [dispatched, setDispatched] = useState(false);
    const navigate = useNavigate();



   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);


   const data = {
    vnp_Amount: queryParams.get('vnp_Amount'),
    vnp_BankCode: queryParams.get('vnp_BankCode'),
    vnp_CardType: queryParams.get('vnp_CardType'),
    vnp_OrderInfo: queryParams.get('vnp_OrderInfo'),
    vnp_PayDate: queryParams.get('vnp_PayDate'),
    vnp_ResponseCode: queryParams.get('vnp_ResponseCode'),
    vnp_TmnCode: queryParams.get('vnp_TmnCode'),
    vnp_TransactionNo: queryParams.get('vnp_TransactionNo'),
    vnp_TransactionStatus: queryParams.get('vnp_TransactionStatus'),
    vnp_TxnRef: queryParams.get('vnp_TxnRef'),
    vnp_SecureHash: queryParams.get('vnp_SecureHash'),
}
    useEffect(()=>{
       
        if (result === null) {
             
            dispatch(getResultPayment(data)).then((response) => {
               
            });
          }
    
    },[data.vnp_SecureHash, dispatch,result])
    if(errorpayment)
    {
        toast('Giao dịch không thành công, đang trở về trang chủ');
        const id = orders?.id;
        dispatch(deleteOrder(id));
        window.location.href = '/';
    }
    useEffect(() => {
        if (result&&dispatched===false) {
            toast('Giao dịch thành công, đang chuyển hướng đến trang lấy vé');
            dispatch(setsuccess(true));
            const paymentDTO = {
                amount: orders.totalPrice,
                paymentMethod:"VNPAY",
                orderId:orders.id
            }
            dispatch(createpayment(paymentDTO));
            setDispatched(true)
          navigate('/ticket');

        }
    }, [result, dispatched]);
     
     
     

     




return(<div className="result">
   
</div>);
}
export default Result;