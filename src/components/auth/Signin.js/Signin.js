import './signin.css';
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import React, { useState, useEffect  } from 'react';
import { loginUser } from '~/features/auth/UserSlice';


const Login = () => {
    const userInfor = useSelector((state)=>state.user.userInfor);

    const dispatch = useDispatch();
    const [showpassword, setShowPassword] = useState(false);
    const {register, handleSubmit, watch, formState:{errors}} = useForm();
    const showPassword = () => {
        setShowPassword(!showpassword);
    }
    const onSubmit = (data) => {
     dispatch(loginUser(data)).unwrap().then((response)=>{
            toast("Login success")
           
       

        }).catch((error)=>{
            toast("Some error");
        })

        
    }
    useEffect(()=> {
        if(userInfor)
        {
            if(userInfor?.roles.includes("ROLE_ADMIN"))
            {
                window.location.href = '/admin';
            }
            else{
                window.location.href = '/';
            }
        }
    }, [userInfor])
    return ( 
     
         <div className='form'>
   
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='filed'>
                <label>User name<span>*</span></label>
                <input  {...register('userName',
                    {required:"userName is required",
                        
                     })
                } placeholder='userName'></input>
                  {errors.userName && <p className='cl_red'>{errors.userName.message}</p>}
            </div>
            <div className='filed'>
                <label>Password<span>*</span></label>
                <div className='pos-rel div-input' >
                <input type={showpassword?'text':'password'} placeholder='Password'  {...register('password',{required:"Password is required",
                    pattern:{
                        value:/^(?=.*[a-z])(?=.*[A-Z])/,
                        message: "Password must include at least one uppercase and one lowercase letter"
                    },
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long"
                    }
                 } )}></input>
                      {errors.password && <p className='cl_red'>{errors.password.message}</p>}
                 <span className='pos-abs' onClick={showPassword}>{showpassword?(<FaEyeSlash></FaEyeSlash>):(<FaEye></FaEye>)}</span>
                </div>
               
            </div>
          
         
            <div className='policy-agree'>
                <input type='checkbox'></input><p>Lưu đăng nhập</p>
                
            </div>
            <div className='redirec-login'>
                <a>Quên mật khẩu ?</a>
            </div>
            <button className='button-auth'>Đăng nhập</button>
           
        </form>
    </div>
)
}
export default Login;