import './signin.css';
const Login = () => {
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
          
         
            <div className='policy-agree'>
                <input type='checkbox'></input><p>Lưu đăng nhập</p>
                
            </div>
            <div className='redirec-login'>
                <a>Quên mật khẩu ?</a>
            </div>
            <button className='button-auth'>Đăng ký</button>
           
        </form>
    </div>
)
}
export default Login;