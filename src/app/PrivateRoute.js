import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, admin, ...rest }) => {
    const userInfor = useSelector((state) => state.user.userInfor);

    // Check for admin role if required
    if (admin && !userInfor?.roles.includes("ROLE_ADMIN")) {
        return <Navigate to="/" />;
    }
    

    // Render the component if access is allowed
    return <Component {...rest} />;
};

export default PrivateRoute;