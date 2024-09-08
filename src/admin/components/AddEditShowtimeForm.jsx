import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { getAllTheater } from '~/features/theater/TheaterSlice';
import { getShowingMovie } from '~/features/movie/MovieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllScreenByTheaterId } from '~/features/admin/ScreenSlice';
import { addShowtime } from '~/features/admin/ShowtimeSlice';
import { toast } from 'react-toastify';

const AddEditShowtimeForm = ({ open, handleClose, showtimeToEdit, onSubmit }) => {
    const theaters = useSelector((state)=> state.theater.theaters || {});
    const movies = useSelector((state) => state.movie.movieshowings);
    const actionShowtime= useSelector((state)=> state.adminshowtimes.actionShowtime);
    //actionShowtime:{
    //    error:null,
    //    data:null,
    //    loading:null,
    //    status:null
    //}
    const [screens, setScreens] = useState([]);

    const [formData, setFormData] = useState({
    movie: '',
    theater: '',
    screen: '',
    date: '',
    showtimes: [],
  });
const dispatch = useDispatch();
  useEffect(() => {
    if (showtimeToEdit) {
      setFormData(showtimeToEdit);
    } else {
      setFormData({ movieTitle: '', theater: '', screen: '', date: '', showtimes: [] });
    }
  }, [showtimeToEdit]);
useEffect(()=> {
    dispatch(getAllTheater());
    dispatch(getShowingMovie());
},[])

  const handleShowtimeChange = (event) => {
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, showtimes: value }));
  };
  useEffect(()=>{
    if(actionShowtime?.error)
    {
        toast.error('Have some error', actionShowtime?.error);
    }
    if(actionShowtime?.data)
    {
        toast.success('Success');
    }
  }, [actionShowtime?.error,actionShowtime?.data,actionShowtime?.loading,actionShowtime?.status ])
  const handleSubmit = () => {
    const data = [];
    onSubmit(formData);
    for(let i = 0; i < formData?.showtimes.length ; i++){
        const object = {
            date:formData.date,
            time:formData?.showtimes[i],
            movieId:formData.movie,
            screenId:formData.screen,
            theaterId:formData.theater
        }
        data.push(object);
      
    }
     
    dispatch(addShowtime(data));
    setTimeout(()=>{
        handleClose();
    },2000)

  };
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'theater') {
      // Dispatch action to fetch screens when a theater is selected
      dispatch(getAllScreenByTheaterId(value)).unwrap()
        .then(fetchedScreens => {
          setScreens(fetchedScreens);
          setFormData((prev) => ({ ...prev, screen: '' })); // Reset screen selection
        });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{showtimeToEdit ? 'Edit Showtime' : 'Add Showtime'}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Movie</InputLabel>
          <Select
            name="movie"
            value={formData.movie}
            onChange={handleChange}
            fullWidth
          >
            {movies.map((movie) => (
              <MenuItem key={movie.id} value={movie?.id}>
                {movie.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Theater</InputLabel>
          <Select
            name="theater"
            value={formData.theater}
            onChange={handleChange}
          >
            {theaters.map((theater) => (
              <MenuItem key={theater.id} value={theater?.id}>
                {theater.name}
              </MenuItem>
            ))}
          </Select>
          
        <FormControl fullWidth margin="normal">
          <InputLabel>Screen</InputLabel>
          <Select
            name="screen"
            value={formData.screen}
            onChange={handleChange}
            disabled={!formData.theater} // Disable if no theater is selected
          >
            {screens.map((screen) => (
              <MenuItem key={screen.id} value={screen?.id}>
                {screen.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </FormControl>

        <TextField
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Showtimes</InputLabel>
          <Select
            multiple
            value={formData.showtimes}
            onChange={handleShowtimeChange}
            renderValue={(selected) => selected.join(', ')}
          >
            
            {['09:00:00','10:00:00', '12:00:00', '14:00:00', '16:00:00', '18:00:00', '20:00:00','21:00:00','22:00:00','23:00:00'].map((time) => (
              <MenuItem key={time} value={time}>
                <Checkbox checked={formData.showtimes.indexOf(time) > -1} />
                <ListItemText primary={time} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditShowtimeForm;