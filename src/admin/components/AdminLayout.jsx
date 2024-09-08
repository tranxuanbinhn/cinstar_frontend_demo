// components/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';  // Import Outlet để render các route con
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from '~/components/header/Header';
import { HeaderAdmin } from './HeaderAdmin';
import { ToastContainer } from 'react-toastify';
import MessageApp from './chat/ChatApp';

const AdminLayout = () => {
  return (
    <div className='admin-container-position-absolute'>
      <MessageApp></MessageApp>
      <div><ToastContainer></ToastContainer></div>

    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Outlet />  
      </Box>
    </Box>
    </div>
  );
};

export default AdminLayout;
