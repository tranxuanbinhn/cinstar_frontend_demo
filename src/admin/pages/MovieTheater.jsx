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
import { getDetailMovie, getShowingMovie, getUpcommingMovie } from '~/features/movie/MovieSlice';
import { BoxComponent } from './boxcomponent/BoxComponent';
import { getAllTheater } from '~/features/theater/TheaterSlice';
import { BoxComponentMovieTheater } from './boxcomponent/BoxComponentMovieTheater';

const MoviesTheaterAdmin = () => {
  const dispatch = useDispatch();
  const movieupcommings = useSelector((state) => state.movie.movieupcommings);
  const movieshowings = useSelector((state) => state.movie.movieshowings);
  const delUser = useSelector((state)=> state.adminuser.deleteMovie || {});


  const {error, data,loading} = useSelector((state)=> state.adminuser.useradd || {});
  

  const [movieid, setMovieId] = useState();
 


  const allTheater = useSelector((state)=> state.theater.theaters || {});

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

 

 

  const getFilmFromDatabase = (id)=> {
    dispatch(getDetailMovie(id));
  }
  useEffect(()=> {
    getFilmFromDatabase(movieid);
  },[movieid])
  useEffect(() => {

    dispatch(getUpcommingMovie());
    dispatch(getShowingMovie());
    dispatch(getAllTheater())
    

  }, [dispatch]);


   
   

  useEffect(() => {
    if (delUser?.status) {
      toast.success('Success');
    

    }
    if (delUser?.error) {
      toast.error('Error: ' + error);
    }

  }, [delUser?.status, delUser?.error]);
 
  return (
    <div>
<BoxComponentMovieTheater title={'Upcoming'} listmovie={movieupcommings}allTheater={allTheater} type={'MOVIE_COMINGSOON'}></BoxComponentMovieTheater>
    <BoxComponentMovieTheater title={'Nowshowing'} listmovie={movieshowings}allTheater={allTheater}type={'MOVIE_NOWSHOWING'}></BoxComponentMovieTheater>
  
    </div>
    
  );
};

export default MoviesTheaterAdmin;
