import './moviedetail.css'
const OrderTicket = () => {
    return (
        <div className='order-ticket-time'>
        <div className='order-ticket-time-ctn'>
        <div className='order-ticket-name'>
            <h1>DEADPOOL VÀ WOLVERINE 2D (T18)</h1>
            <p>Cinestar Hai Bà Trưng (TP.HCM)</p>
        </div>
        <div className='order-ticket-total'>
            <div className='order-ticket-total-time'>
                <p>Thời gian giữ vé</p>
                <h3>5:00</h3>
            </div>
            <div className='order-ticket-total-amount'>
                <div className='order-ticket-total-amount-top'>
                    <span>Tạm tính </span>
                    <h3>0 VND</h3>
                </div>
                <button className='order-ticket-total-button'>Đặt vé</button>
            </div>
        </div>
        </div>
    </div>
    );
}
export default OrderTicket;