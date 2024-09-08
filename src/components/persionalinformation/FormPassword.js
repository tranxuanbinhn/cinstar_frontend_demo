import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePassword } from "~/features/auth/UserSlice";

export const FormPasssword = () => {
    const userInfor = useSelector((state)=> state.user.userInfor);
    const {register, handleSubmit, watch, formState:{errors}} = useForm()
    const error = useSelector((state)=> state.user.error);
    const dispatch = useDispatch();
    const password = watch('password');
    const SubmitChangePass = (data) => {
        const object = {
             oldPassword:data.oldPassword,
             password:data.password,
             userName:userInfor?.username
        }
         

 
        dispatch(changePassword(object));
        window.location.reload(); // Reload trang
    }
    if(error)
    {
        toast('Some error', error)
    }
    return (
        
        <form onSubmit={handleSubmit(SubmitChangePass)}>
        <h1>Đổi mật khẩu</h1>
        <div className='person-right-change-inner'>

             <div className='w-100'>
          
               <p>
                <span>Mật khẩu cũ</span>
                <span style={{color:'red'}}>*</span>
</p>                            <input {...register('oldPassword',{required:"Password is required",
        pattern:{
            value:/^(?=.*[a-z])(?=.*[A-Z])/,
            message: "Password must include at least one uppercase and one lowercase letter"
        },
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters long"
        }
     } )} type="password"/>
            </div>
             <div className='w-100'>
               <p>
                <span>Mật khẩu mới</span>
                <span style={{color:'red'}}>*</span>
</p>                            <input  type="password" {...register('password',{required:"Password is required",
        pattern:{
            value:/^(?=.*[a-z])(?=.*[A-Z])/,
            message: "Password must include at least one uppercase and one lowercase letter"
        },
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters long"
        }
     } )}/>
            </div>
             <div className='w-100'>
               <p>
                <span>Xác thực mật khẩu</span>
                <span style={{color:'red'}}>*</span></p> 
                <input type="password" {...register('reenter-password',{required:"Password is required",
        pattern:{
            value:/^(?=.*[a-z])(?=.*[A-Z])/,
            message: "Password must include at least one uppercase and one lowercase letter"
        },
        minLength: {
            value: 8,
            message: "Password must be at least 8 characters long"
        },
        validate:(value)=>value === password || "Mật khẩu phải khớp"
     } )}/>
            </div>
          
        </div>
            <button type='submit'>Luu thong tin</button>
        </form>
    );
}
