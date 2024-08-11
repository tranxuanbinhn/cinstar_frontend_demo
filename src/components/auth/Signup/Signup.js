import React, { useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import './signup.css';
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '~/features/auth/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

function SignUp (){
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [showpassword, setShowPassword] = useState(false);
    const {loading, error, userInfor, message} = useSelector((state) => state.user)
    const Trigger = () =>{
        setToggle(!toggle)
    }
    const onSubmit = (data) => {
        
        dispatch(registerUser(data)).unwrap().then((response)=>
        {

            if(response){
                toast.success("Success");
                 window.location.href = '/login';
            }
        }).catch((err)=>{
          
            toast.error("Error"+ err?.message);
        })

     

    }
    
    const showPassword = () => {
        setShowPassword(!showpassword);
    }
const {register, handleSubmit, watch, formState:{errors}} = useForm();
const password = watch('password');

    return (
        
         <div className='form'>
                <span className='center'> <ToastContainer
                position='top-center'
                /></span>
         <form onSubmit={handleSubmit(onSubmit)}>
            <></>
             <div className='filed'>
                 <label>Họ và tên <span>*</span></label>
                 <input {...register('fullName', {required:"Full name is required"})} placeholder='Họ và tên'></input>
                 {errors.fullName && <p className='cl_red'>{errors.fullName.message}</p>}
             </div>
             <div className='filed'>
                 <label>UserName<span>*</span></label>
                 <input {...register('userName',{required:"User name is required"} )} placeholder='Username'></input>
                 {errors.userName && <p className='cl_red'>{errors.userName.message}</p>}
             </div>
             <div className='filed'>
                 <label>Password<span>*</span></label>
                
                <div className='pos-rel div-input' >
                <input type={showpassword?'text':'password'} {...register('password',{required:"Password is required",
                    pattern:{
                        value:/^(?=.*[a-z])(?=.*[A-Z])/,
                        message: "Password must include at least one uppercase and one lowercase letter"
                    },
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long"
                    }
                 } )} placeholder='Password'>
                 
                 </input>
                 <span className='pos-abs' onClick={showPassword}>{showpassword?(<FaEyeSlash></FaEyeSlash>):(<FaEye></FaEye>)}</span>
                </div>
          
                 {errors.password && <p className='cl_red'>{errors.password.message}</p>}
             </div>
             <div className='filed'>
                 <label>Re-enter Password<span>*</span></label>
                 <div className='pos-rel div-input' >
                 <input type={showpassword?'text':'password'} {...register('reenterpassword',{required:"Re-enter password is required",
                    validate: (value) => value === password || "Passwords do not match"
                 } )} placeholder='Re-enter password'></input>
                 {errors.reenterpassword && <p className='cl_red'>{errors.reenterpassword.message}</p>}
                 <span className='pos-abs' onClick={showPassword}>{showpassword?(<FaEyeSlash></FaEyeSlash>):(<FaEye></FaEye>)}</span>
                 </div>
                
             </div>
             <div className='filed'>
                 <label>Email<span>*</span></label>
                 <input {...register('email', {required:"Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address"
                      }
                 })} placeholder='Họ và tên'></input>
                 {errors.email && <p className='cl_red'>{errors.email.message}</p>}
             </div>
             <div className='filed'>
                 <label>Phone number<span>*</span></label>
                 <input {...register('phoneNumber',{required:"Phone number is required"})} placeholder='phone number'></input>
                 {errors.phoneNumber && <p className='cl_red'>{errors.phoneNumber.message}</p>}
             </div>
             <div className='filed'>
                 <label>CCCD <span>*</span></label>
                 <input {...register('cic', {required:"CCCD is required"})} placeholder='cccd'></input>
                 {errors.cic && <p className='cl_red'>{errors.cic.message}</p>}
             </div>
             <div className='filed'>
                 <label>Birthday<span>*</span></label>
                 <input {...register('birthDay',{required:"Birthday is required"})}placeholder='Birhtday' type='date'></input>
                 {errors.birthDay && <p className='cl_red'>{errors.birthDay.message}</p>}
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
                 <input 
                 {...register('policy', {required:"Please agree with policy"})}
                 type='checkbox'></input><p>Khách hàng đã đồng ý các điều khoản, điều kiện của thành viên Cinestar</p>
                 {errors.policy && <p className='cl_red'>{errors.policy.message}</p>}
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