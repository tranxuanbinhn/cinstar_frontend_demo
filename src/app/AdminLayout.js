

import { Outlet, Route, Routes } from 'react-router-dom';
import UsersAdmin from '~/admin/pages/Users';
import OrdersAdmin from '~/admin/pages/Orders';



import ShowtimeManagement from '~/admin/pages/ShowtimeManagement';
import MoviesAdmin from '~/admin/pages/Movie';
import MoviesTheaterAdmin from '~/admin/pages/MovieTheater';
import Sidebar from '~/admin/components/Sidebar';
const AdminLayout = () => {
  return (
    <div>

<Sidebar />

<Outlet />

    </div>
  );
};

export default AdminLayout;