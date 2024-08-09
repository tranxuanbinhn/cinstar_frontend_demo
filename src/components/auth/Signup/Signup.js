import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import './signup.css';
function SignUp (){
    const [toggle, setToggle] = useState(false);
    const Trigger = () =>{
        setToggle(!toggle)
    }
    return (
        
         <div className='form'>
         <form >
             <div className='filed'>
                 <label>Họ và tên <span>*</span></label>
                 <input placeholder='Họ và tên'></input>
             </div>
             <div className='filed'>
                 <label>Họ và tên <span>*</span></label>
                 <input placeholder='Họ và tên'></input>
             </div>
             <div className='filed'>
                 <label>Họ và tên <span>*</span></label>
                 <input placeholder='Họ và tên'></input>
             </div>
             <div className='filed'>
                 <label>Họ và tên <span>*</span></label>
                 <input placeholder='Họ và tên'></input>
             </div>
             <div className='filed'>
                 <label>Họ và tên <span>*</span></label>
                 <input placeholder='Họ và tên'></input>
             </div>
             <div className='filed'>
                 <label>Họ và tên <span>*</span></label>
                 <input placeholder='Họ và tên'></input>
             </div>
             <div className='filed'>
                 <label>Họ và tên <span>*</span></label>
                 <input placeholder='Họ và tên'></input>
             </div>
             <div className='filed'>
                 <label>Họ và tên <span>*</span></label>
                 <input placeholder='Họ và tên'></input>
             </div>
             <div className='policy'>
                 <span onClick={Trigger}><IoIosArrowForward></IoIosArrowForward><p>Chính sách bảo mật</p></span>
                 <div className='policy-content'>
                     {toggle && (   <div className='policy-inner'>
                         <h1>1. TỔNG QUAN VỀ CHÍNH SÁCH BẢO MẬT</h1>
                         <p>CINESTAR hiểu rằng Khách Hàng quan tâm đến việc dữ liệu cá nhân của Khách Hàng sẽ được sử dụng và chia sẻ như thế nào. CINESTAR rất coi trọng sự tin tưởng của Khách Hàng, vì vậy CINESTAR sẽ sử dụng những dữ liệu mà Khách Hàng cung cấp một cách cẩn thận và hợp lý, phù hợp với quy định của pháp luật.</p>
                         <p>Website: www.cinestar.com.vn thuộc quyền sở hữu của Công ty Cổ phần Giải trí – Phát hành phim – Rạp chiếu phim Ngôi Sao (CINESTAR), địa chỉ: 135 Hai Bà Trưng, phường Bến Nghé, Quận 1, TP.HCM. Website này được quản lý điều hành bởi CINESTAR. Website này được sử dụng cho các hoạt động của CINESTAR, các chi nhánh trực thuộc, các công ty thành viên và các tổ chức liên quan (được gọi là CINESTAR trong văn bản này).</p>
                     </div>)
                      
                     }
                 </div>
             </div>
             <div className='policy-agree'>
                 <input type='checkbox'></input><p>Khách hàng đã đồng ý các điều khoản, điều kiện của thành viên Cinestar</p>
                 
             </div>
             <button className='button-auth'>Đăng ký</button>
             <div className='redirec-login'>
                 <p>Bạn đã có tài khoản? </p><a>Đăng nhập</a>
             </div>
         </form>
     </div>
    );
}
export default SignUp;