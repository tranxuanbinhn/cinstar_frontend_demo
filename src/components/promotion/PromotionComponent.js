import './promotionpage.css';
const PromtionComponent = () => {
return (
    <div className="promotion-page">
        <div className="promotion-page-items">
            <div className="promotion-page-item-information">
                <div className="promotion-page-item-information-title">
                    <h1 className="h1-titlle">
                    C’STUDENT - 45K CHO HỌC SINH SINH VIÊN </h1>
                    <p>Đồng giá 45K/2D cho HSSV/GV/U22 cả tuần tại mọi cụm rạp Cinestar</p>
                </div>
                <div className="promotion-page-item-information-condition">
                    <span>Điều kiện</span>
                    <li>HSSV xuất trình thẻ HSSV hoặc CCCD từ dưới 22 tuổi.</li>
                    <li>Giảng viên/ giáo viên xuất trình thẻ giảng viên.</li>
                </div>
                <div className="promotion-page-item-information-note">
                <span>Lưu ý</span>
                    <li>Mỗi thẻ mua được một vé.</li>
                    <li>Không áp dụng cho các ngày Lễ, Tết, hoặc suất chiếu có phụ thu từ nhà phát hành phim.</li>
                </div>
                <a className='button order-ticket'>Đặt vé ngay</a>
            </div>
            <div className="promotion-page-item-image">
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1723040964/c_student_fouc6z.png'/>
            </div>
        </div>
        <div className="promotion-page-items">
            <div className="promotion-page-item-information">
                <div className="promotion-page-item-information-title">
                    <h1 className="h1-titlle">
                    C'TEN - HAPPY HOUR - 45K/ 2D MỐC 10H   </h1>
                    <p>Áp dụng giá 45K/ 2D và 55K/ 3D cho khách hàng xem phim trước 10h sáng và sau 10h tối.</p>
                </div>
                <div className="promotion-page-item-information-condition">
                    <span>Điều kiện</span>
                    <li>Khách hàng là thành C’FRIEND hoặc C’VIP của Cinestar.</li>
                    <li>Áp dụng tại App/Web Cinestar hoặc mua trực tiếp tại rạp.</li>
                </div>
                <div className="promotion-page-item-information-note">
                <span>Lưu ý</span>
                    <li>Mỗi thẻ mua được một vé.</li>
                    <li>Không áp dụng cho các ngày Lễ, Tết, hoặc suất chiếu có phụ thu từ nhà phát hành phim.</li>
                </div>
                <a className='button order-ticket'>Đặt vé ngay</a>
            </div>
            <div className="promotion-page-item-image">
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1724389343/C_TEN_oiyfdd.png'/>
            </div>
        </div>
        <div className="promotion-page-items">
            <div className="promotion-page-item-information">
                <div className="promotion-page-item-information-title">
                    <h1 className="h1-titlle">
                    C'MONDAY - HAPPY DAY - ĐỒNG GIÁ 45K/ 2D </h1>
                    <p>Đồng giá 45K/2D, 55K/3D vào thứ 2 hàng tuần</p>
                </div>
                <div className="promotion-page-item-information-condition">
                    <span>Điều kiện</span>
                    <li>Áp dụng cho các suất chiếu vào ngày thứ 2 hàng tuần.</li>
                    <li>Mua vé trực tiếp tại App/Web Cinestar hoặc mua trực tiếp tại rạp.</li>
                </div>
                <div className="promotion-page-item-information-note">
                <span>Lưu ý</span>
                  
                    <li>Không áp dụng cho các ngày Lễ, Tết, hoặc suất chiếu có phụ thu từ nhà phát hành phim.</li>
                </div>
                <a className='button order-ticket'>Đặt vé ngay</a>
            </div>
            <div className="promotion-page-item-image">
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1724389343/monday_1__k0nqli.jpg'/>
            </div>
        </div>
        <div className="promotion-page-items m-bt100">
            <div className="promotion-page-item-information">
                <div className="promotion-page-item-information-title">
                    <h1 className="h1-titlle">
                    C'MEMBER - HAPPY MEMBER’S DAY - GIÁ CHỈ 45K/ 2D   </h1>
                    <p>Áp dụng giá 45K/ 2D và 55K/ 3D cho khách hàng là thành viên Cinestar vào ngày thứ 4 hàng tuần.</p>
                </div>
                <div className="promotion-page-item-information-condition">
                    <span>Điều kiện</span>
                    <li>Khách hàng là thành C’FRIEND hoặc C’VIP của Cinestar.</li>
                    <li>Áp dụng tại App/Web Cinestar hoặc mua trực tiếp tại rạp.</li>
                </div>
                <div className="promotion-page-item-information-note">
                <span>Lưu ý</span>
                    <li>Giảm thêm 10% giá trị hóa đơn bắp nước cho chủ thẻ C’FRIEND và 15% cho chủ thẻ C’VIP.</li>
                    <li>Không áp dụng cho các ngày Lễ, Tết, hoặc suất chiếu có phụ thu từ nhà phát hành phim.</li>
                </div>
                <a className='button order-ticket'>Đặt vé ngay</a>
            </div>
            <div className="promotion-page-item-image">
                <img src='https://res.cloudinary.com/daubnjjos/image/upload/v1724389343/C_MEMBER_oeqtlv.png'/>
            </div>
        </div>
    </div>
);
}
export default PromtionComponent;