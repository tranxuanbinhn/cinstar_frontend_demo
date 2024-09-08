// authMiddleware.js
import Cookies from 'js-cookie';
import { refreshToken } from '~/api/refreshtoken';
import { logoutUser, loginUser } from '~/features/auth/UserSlice';

const authMiddleware = store => next => async action => {
  


    if (action.type.endsWith('/rejected') && action.error && action.payload=== 401) {
        try {
      
            const newAccessToken = await refreshToken();
         
            store.dispatch(loginUser({ accessToken: newAccessToken }));
            
            // Thử lại hành động cũ với token mới
            action.meta.arg.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return store.dispatch(action.meta.arg);
        } catch (error) {
            console.log('error in authMiddleware', error)
            //store.dispatch(logoutUser());
            //localStorage.clear();
            //Cookies.remove('refreshToken');
            //window.location.href = '/login';
        }
    }
    
    return next(action);
};

export default authMiddleware;
