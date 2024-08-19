import './checkout.css';

export const Checkout = () => {
    return (<div>
        <div className="checkout-ctn">
            <h1>Trang Thanh toán</h1>
            <div className="checkout-title">
                <div className='checkout-title-innter'><span>1</span> <h2>Thông tin khách hàng</h2></div><div className='border-white'><div></div></div>
                <div className='checkout-title-innter'><span>2</span> <h2>Thanh toán</h2></div><div className='border-white'><div></div></div>
                <div className='checkout-title-innter'><span>3</span> <h2>Thông tin phim</h2></div>
            </div>
            <div className="checkout-information">
                <div className="checkout-information-left">
                    <form>
                        <div>
                            <span>Họ và tên:</span>
                            <input placeholder="Họ và tên"/>
                        </div>
                        <div>
                            <span>Số điện thoại:</span>
                            <input placeholder="Số điện thoại"/>
                        </div>
                        <div>
                            <span>Email:</span>
                            <input placeholder="Email"/>
                        </div>
                        <div className='policy-in'>
                        <input type="checkbox"/> <p>Đảm bảo mua vé đúng với số tuổi quy định</p>
                        </div>
                        <div className='policy-in'>
                        <input type="checkbox"/> <p>Đồng ý với điều khoản của CineStar</p>
                        </div>
                        <button>Tiếp tục</button>
                    </form>
                </div>
                <div className="checkout-information-right">
            
                        <div className='infor-title'><h2>Ma DA</h2> <div className="timekeepticket">
                            <h2>Thời gian giữ vé</h2>
                            <div>20:20</div>
                        </div></div>
                       
                        <div className="infor-theater">
                            <h2>CineStar Quốc Thanh</h2>
                            <p>739283912332</p>
                        </div>
                        <div className="timeforticket">
                            <h3>Thời gian</h3>
                            <p>      22:00</p>
                        </div>
                        <div className="infor-screen">
                            <div>
                                <span>Phòng chiếu</span>
                            <span>01</span>
                                </div>
                                <div>
                                <span>Số vé</span>
                            <span>01</span>
                                </div>
                                <div>
                                <span>Loại vé</span>
                            <span>01</span>
                                </div>
                        </div>
                        <div className="infor-seat" >
                            <div>
                                <span>Loại ghế</span>
                                <span>Ghế thường</span>
                            </div>
                            <div>
                                <span>Loại ghế</span>
                                <span>Ghế thường</span>
                            </div>
                        </div>
                        <div className="infor-food">
                            <h3>Bắp nước</h3>
                          <div>  <span>1 Combo Couple</span></div>
                        </div>
                        <div className="infor-total">
                            <h1>Số tiền cần thanh toán</h1>
                            <h1 className='white'>555000000000</h1>
                        </div>
                 
                </div>

            </div>
        </div>
    </div>);

}