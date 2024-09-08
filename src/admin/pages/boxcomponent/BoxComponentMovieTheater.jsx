import { MovieSystemColumn } from "~/admin/components/MovieSystemColumn";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,FormControl,InputLabel,MenuItem,Select,Typography  } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { addMovie, deleteMovie, getDetailMovies } from "~/features/admin/MoviesSlice";
import { toast } from "react-toastify";
import AddEditUserForm from "~/admin/components/AddEditUserForm";
import { getDetailMovie } from "~/features/movie/MovieSlice";
import { MovieDatabaseColumn } from "~/admin/components/MovieDatabaseColumn";

export const BoxComponentMovieTheater = ({title, listmovie, allTheater, type}) => {
  const dispatch = useDispatch();
  const systemupcommingmovies = useSelector((state) => state.adminmovies.systemupcommingmovies);
  const systemnowshowingmovies = useSelector((state) => state.adminmovies.systemnowshowingmovies);
  const moviedetail = useSelector((state) => state.movie.detailmovie);
  const [open, setOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const {error, data,loading} = useSelector((state)=> state.adminmovies.addMovie || {});
  const delMovie = useSelector((state)=> state.adminmovies.deleteMovie || {});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAdd, setDialogAdd] = useState(false);
  const [movieid, setMovieId] = useState();
  const [movieidDelete, setMovieIdDelete] = useState();
  const [movieadd, setMovieAdd] = useState({});
  const [selectedTheaters, setSelectedTheaters] = React.useState([]);

  const handleTheaterChange = (event) => {
    setSelectedTheaters(event.target.value);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const getFilmFromDatabase = (id)=> {
    dispatch(getDetailMovie(id));
  }
  const handleEdit = (user) => {
    setUserToEdit(user);
    setOpen(true);
  };

  const handleDelete = (id) => {
    //dispatch(deleteUser(id));
  };


  useEffect(()=> {
     
     
    const object = {
      theaterIds:selectedTheaters,
      typeMovie:type,
      moviePOJO:moviedetail
    }
    setMovieAdd(object);
  },[selectedTheaters,moviedetail])
const handleDeleteClick =(filmId: string) => {
  setMovieIdDelete(filmId);

 


setDialogAdd(true);
}

useEffect(()=> {
  getFilmFromDatabase(movieid);
},[movieid])

  const confirmDelete = () => {
   dispatch(deleteMovie(movieidDelete))
   setDialogOpen(false);
   setTimeout(() => {
    window.location.reload();
   }, 1000);

  }
  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setUserIdToDelete(null);
  };
   
  useEffect(() => {
    if (delMovie?.status) {
      toast.success('Success');
    

    }
    if (delMovie?.error) {
      toast.error('Error: ' + error);
    }

  }, [delMovie?.status,delMovie?.error ]);

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
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

    return (
        <Box sx={{ height: 400, width: '100%' }}>
    <h1 className='admin-film-h1'>{title}</h1>
      {listmovie?.length > 0 ? (
        <DataGrid
          rows={listmovie}
          columns={MovieDatabaseColumn.map((col) => 
            col.field === 'delete' ? {
              ...col,
              renderCell: (params) => (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteClick(params.id)}
                >
                  Delete
                </Button>
              ),
            } : col.field === 'view' ? {
              ...col,
              renderCell: (params) => (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewClick(params.id)}
                >
                  Xem
                </Button>
              ),
            } : col
          )}

          pageSize={5}
          pagination
          paginationMode='client'
          paginationModel={paginationModel}
          onPaginationModelChange={(newPaginationModel) => {
            setPaginationModel(newPaginationModel);
          }}
          onCellClick={(params) => {
            if (params.field === 'delete') {
              handleDeleteClick(params.id);
            }
          }}
        />
      ) : (
        <div>Không có user để hiển thị</div>
      )}
      {open && (
        <AddEditUserForm
          open={open}
          handleClose={() => setOpen(false)}
          userToEdit={userToEdit}
        />
      )}
      <Dialog
        open={dialogAdd}
        onClose={()=>setDialogAdd(false)}
      >
        <DialogTitle>Xác nhận Xóa</DialogTitle>
        <DialogContent>
     
          <DialogContentText>
            Bạn có chắc chắn muốn xóa phim này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDialogAdd(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Thông tin phim</DialogTitle>
          <DialogContent>
      
<div className="movie-details">
<div>
  <img src={`${process.env.REACT_APP_API_IMG_URL}${moviedetail?.posterPath}`} alt="Movie Poster" style={{ maxWidth: '100%', height: 'auto' }} />
</div>
  <Typography className="title">Tên phim: {moviedetail?.title}</Typography>
  <Typography className="overview">Mô tả: {moviedetail?.overview}</Typography>
  <Typography className="runtime">Thời lượng: {moviedetail?.runtime} phút</Typography>
  <Typography className="release-date">Ngày phát hành: {moviedetail?.releaseDate}</Typography>
  <Typography className="release-date">
  Theater: {moviedetail?.theaterIds?.map((id) => {
    const theater = allTheater?.find((theater) => theater.id === id);
    return theater ? theater.name : null;
  }).filter(name => name).join(', ')}
</Typography>
</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>
    </Box>
    );
}