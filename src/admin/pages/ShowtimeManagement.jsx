import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { addShowtime, deleteShowtime, updateShowtime, getShowtimes } from '~/features/admin/ShowtimeSlice';
import AddEditShowtimeForm from '../components/AddEditShowtimeForm';
import { getShowtime } from '~/features/showtime/ShowtimeSlice';
import { MovieShowtimeColumn } from '../components/MovieShowtimeColumn';
import { getAllTheater } from '~/features/theater/TheaterSlice';
import { getShowingMovie } from '~/features/movie/MovieSlice';


const ShowtimeManagementAdmin = () => {
  const dispatch = useDispatch();
  const {status} = useSelector((state) => state.adminshowtimes.actionShowtime);
  const showtimes = useSelector((state) => state.adminshowtimes.showtimes) || [];

  const [open, setOpen] = useState(false);
  const [showtimeToEdit, setShowtimeToEdit] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showtimeDelete, setShowtimeDelete] = useState();
  const [selectedShowtimeId, setSelectedShowtimeId] = useState(null);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    dispatch(getShowtimes(paginationModel));

  }, [paginationModel?.page, paginationModel?.pageSize]);
useEffect(()=> {
    if(status){
        toast.success('Success')
    }
   
}, [status])
   
 
  const handleOpenDelete = (id) => {
    setShowtimeDelete(id);
    setDialogOpen(true)
  }
  const handleDeleteShowtime = () => {

    dispatch(deleteShowtime(showtimeDelete))
    setTimeout(() => {
        setDialogOpen(false)
        window.location.reload()
    }, 2000);
  }
  const handleAddEditShowtime = () => {

  }
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h1 className='admin-film-h1'>Showtime Management </h1>
      <Button variant="contained" onClick={() => setOpen(true)}>Add Showtime</Button>
      
      {showtimes?.results?.length > 0 ? (
        <DataGrid
          rows={showtimes?.results}
         
          columns={MovieShowtimeColumn.map((col) => 
            col.field === 'delete' ? {
              ...col,
              renderCell: (params) => (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleOpenDelete (params.id)}
                >
                  Xóa
                </Button>
              ),
            } : col
          )}
          pageSize={paginationModel.pageSize}
          rowCount={showtimes?.counts || 0}
          pagination
          paginationMode='server'
          paginationModel={paginationModel}
          onPaginationModelChange={(newPaginationModel) => {
            setPaginationModel(newPaginationModel);
          }}
        />
      ) : (
        <div>Không có showtime</div>
      )}
  
      {open && (
        <AddEditShowtimeForm
          open={open}
          handleClose={() => setOpen(false)}
          showtimeToEdit={showtimeToEdit}
          onSubmit={handleAddEditShowtime}
        />
      )}
  
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this showtime?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteShowtime} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
}

export default ShowtimeManagementAdmin;