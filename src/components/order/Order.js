import './order.css';
const Order = () => {
 return (<div className="order">
    <div className="order_left">
        <h1>ĐẶT VÉ NHANH</h1>
    </div>
    <div className="order_right">
        <form>
            <div className='select'
             name=''><span>Chọn Rạp</span>
             <div className='select-inner'><span>Select</span></div>
             </div>
             
            <div className='select'
             name=''><span>Chọn Phim</span>
             <div className='select-inner'><span>Select</span></div>
             </div>
             
            <div className='select'
             name=''><span>Chọn Ngày</span>
             <div className='select-inner'><span>Select</span></div>
             </div>
             
            <div className='select'
             name=''><span>Chọn Suất</span>
             <div className='select-inner'><span>Select</span></div>
             </div>
             
            <button>ĐẶT NGAY</button>
        </form>
    </div>
 </div>);   
}
export default Order;