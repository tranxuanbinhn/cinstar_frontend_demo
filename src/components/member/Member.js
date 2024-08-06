import './member.css';
const Member  =() => {
return (
    <div className="member">
        <h1 className='title'>CHƯƠNG TRÌNH THÀNH VIÊN</h1>
        <div className="member-inner">
            <div className="member-items">
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722875260/Desktop519x282_CMember_v3c3t8.webp'/>
                <h1>THÀNH VIÊN C'FRIEND</h1>
                <p>Thẻ C'Friend nhiều ưu đãi cho thành viên mới</p>
                <a><div className="button">TÌM  hiểu ngay</div></a>
            </div>
            <div className="member-items">
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1722875260/Desktop519x282_CMember_v3c3t8.webp'/>
                <h1>THÀNH VIÊN C'FRIEND</h1>
                <p>Thẻ C'Friend nhiều ưu đãi cho thành viên mới</p>
                <a><div className="button">TÌM  hiểu ngay</div></a>
            </div>
        </div>
    </div>
);
}
export default Member;