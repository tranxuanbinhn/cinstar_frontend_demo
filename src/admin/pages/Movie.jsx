// pages/Users.jsx
import React, { useState, useEffect } from 'react';
import './css/index.css'
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Typography  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
//import { fetchUsers, deleteUser } from '../features/userSlice';
import AddEditUserForm from '../components/AddEditUserForm';
import { deleteUser, getAllUser, resetUserAdd, resetUserDelete } from '~/features/auth/AdminSlice';
import { userColumns } from '../components/UserColumn';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAllSystemNowshowingMovies, getAllSystemUpcommingMovies, getDetailMovies } from '~/features/admin/MoviesSlice';
import { MovieSystemColumn } from '../components/MovieSystemColumn';
import { handleViewClick } from '../components/View';
import { getDetailMovie } from '~/features/movie/MovieSlice';
import { BoxComponent } from './boxcomponent/BoxComponent';
import { getAllTheater } from '~/features/theater/TheaterSlice';

const MoviesAdmin = () => {
  const dispatch = useDispatch();
  const systemupcommingmovies = useSelector((state) => state.adminmovies.systemupcommingmovies);
  const systemnowshowingmovies = useSelector((state) => state.adminmovies.systemnowshowingmovies);
  const moviedetail = useSelector((state) => state.adminmovies.detailmovie);
  const [open, setOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const {error, data,loading} = useSelector((state)=> state.adminuser.useradd || {});
  const delUser = useSelector((state)=> state.adminuser.deleteUser || {});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [movieid, setMovieId] = useState();
 

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const allTheater = useSelector((state)=> state.theater.theaters || {});
  const nagitive = useNavigate();
  useEffect(() => {
    if (data) {
      toast.success('Success');
    

    }
    if (error) {
      toast.error('Error: ' + error);
    }

  }, [data, error]);
  
  
  

  


  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });




  useEffect(() => {

    dispatch(getAllSystemNowshowingMovies());
    dispatch(getAllSystemUpcommingMovies());
    dispatch(getAllTheater())
    

  }, [dispatch]);

  const handleEdit = (user) => {
    setUserToEdit(user);
    setOpen(true);
  };




   
  useEffect(() => {
    if (delUser?.status) {
      toast.success('Success');
    

    }
    if (delUser?.error) {
      toast.error('Error: ' + error);
    }

  }, [delUser?.status, delUser?.error]);
  const handleViewClick = async (filmId: string) => {
    try {
      // Lấy thông tin phim từ cơ sở dữ liệu dựa trên filmId

       setMovieId(filmId);
      // Hiển thị hộp thoại thông tin phim
  
  
      // Hiển thị hộp thoại
      
      
      setDialogOpen(true);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin phim:', error);
    }
  };
  
  return (
    <div>
<BoxComponent title={'Upcoming'} listmovie={systemupcommingmovies}allTheater={allTheater} type={'MOVIE_COMINGSOON'}></BoxComponent>
    <BoxComponent title={'Nowshowing'} listmovie={systemnowshowingmovies}allTheater={allTheater}type={'MOVIE_NOWSHOWING'}></BoxComponent>
  
    </div>
    
  );
};

export default MoviesAdmin;
