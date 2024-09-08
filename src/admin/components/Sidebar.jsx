// components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MovieIcon from '@mui/icons-material/Movie';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import '../pages/css/ultity.css'
import { useDispatch } from 'react-redux';
import { logoutUser } from '~/features/auth/UserSlice';
import { toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import { showMessage } from '~/features/message/MessageSlice';
import MessageIcon from '@mui/icons-material/Message';

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleShowMessage = () => {
    dispatch(showMessage());
  }
  const logout = () => {
    dispatch(logoutUser())
        .then((response) => {
             
                window.location.href = '/';
          
        })
        .catch((error) => {
            console.error('Logout error:', error);
            toast('Logout failed. Please try again.');
        });
};
  return (
    <div className="sidebar">
      <List>
        <ListItem button component={NavLink} to="/admin/users">
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={NavLink} to="/admin/orders">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        <ListItem button component={NavLink} to="/admin/movies">
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="Movies in themoviedb" />
        </ListItem>
        <ListItem button component={NavLink} to="/admin/moviestheater">
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="Movies in Theater" />
        </ListItem>
        <ListItem button component={NavLink} to="/admin/showtimes">
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText primary="Showtime" />
        </ListItem>
        <ListItem button onClick={handleShowMessage}>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      
    </div>
  );
};

export default Sidebar;
