import './auth.css';
import React, {useState} from 'react';
import SignUp from './Signup/Signup';
import Login from './Signin.js/Signin';
const Auth = () => {
    const [auth,setAuth] = useState('login');
    const [active,setActive] = useState({login:true, signup:false});
    const setLoginPage = () => {
        setActive({login:true, signup:false});
        setAuth('login');
    }
    const setSignUpPage = () => {
        setAuth('signup');
        setActive({login:false, signup:true});
    }
    return (
        
        <div className='signup'>
            <div className='signup-inner'>
            <div className='signup-title'>
                    <div onClick={setLoginPage} className={active.login?'active':''}>Đăng nhập</div>
                    <div onClick={setSignUpPage} className={active.signup?'active':''}>Đăng kí</div>
                </div>
               {
                auth==='login'?(<Login></Login>):(<SignUp></SignUp>)
               }
            </div>
        </div>
    );
}
export default Auth;