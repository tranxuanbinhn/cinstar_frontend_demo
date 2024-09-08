import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "~/features/auth/UserSlice";

const FormUpdate = () => {
    const {register, handleSubmit, watch, formState:{errors}} = useForm();
    const userInfor = useSelector((state)=> state.user.userInfor);
    const message = useSelector((state)=> state.user.message);
    const userdetail = useSelector((state)=> state.user.userdetail);
    const [fullname, setFullname] = useState(userdetail?.fullName);
    const [birthDay, setBirhDay] = useState(userdetail?.birthDay);
    const [phoneNumber, setPhoneNumber] = useState( userdetail?.phoneNumber);
    const [mail, setEmail] = useState( userdetail?.email);
    const dispatch = useDispatch()
    const onSubmtChangeInfor =(data)=> {
      
        data.userName = userInfor?.username;
         
        dispatch(updateUser(data))
        //window.location.reload(); // Reload trang

    }
    const handleSetFullname = (event)=>{
        setFullname(event.target.value);
    }
    const handleBirthday = (event)=>{
        setBirhDay(event.target.value);
    }
    const handleSetPhone = (event)=>{
        setPhoneNumber(event.target.value);
    }
    const handleemail = (event)=>{
        setEmail(event.target.value);
    }
    useEffect(()=> {
        if(message)
            {
                toast(message)
            }
    },[message])
    return (
        <form onSubmit={handleSubmit(onSubmtChangeInfor)}>
        <h1>Thông tin cá nhân</h1>
        <div className='person-right-change-inner'>
          <div>
            <span>Họ và tên</span>
            <input {...register("fullName")} value={fullname} onChange={handleSetFullname} type="text" />
          </div>
          <div>
            <span>Ngày sinh</span>
            <input {...register("birthDay")} value={birthDay} onChange={handleBirthday} type="date" />
          </div>
          <div>
            <span>Số điện thoại</span>
            <input {...register("phoneNumber")} value={phoneNumber} onChange={handleSetPhone} type="text" />
          </div>
          <div>
            <span>Email</span>
            <input {...register("email")} value={mail} onChange={handleemail} type="text" />
          </div>
        </div>
        <button type='submit'>Lưu thông tin</button>
      </form>
    );
}
export default FormUpdate;