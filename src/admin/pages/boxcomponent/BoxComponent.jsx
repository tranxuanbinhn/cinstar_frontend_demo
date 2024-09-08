import { MovieSystemColumn } from "~/admin/components/MovieSystemColumn";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,FormControl,InputLabel,MenuItem,Select,Typography  } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { addMovie, getDetailMovies } from "~/features/admin/MoviesSlice";
import { toast } from "react-toastify";
import AddEditUserForm from "~/admin/components/AddEditUserForm";

export const BoxComponent = ({title, listmovie, allTheater, type}) => {
  const dispatch = useDispatch();
  const systemupcommingmovies = useSelector((state) => state.adminmovies.systemupcommingmovies);
  const systemnowshowingmovies = useSelector((state) => state.adminmovies.systemnowshowingmovies);
  const moviedetail = useSelector((state) => state.adminmovies.detailmovie);
  const [open, setOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const {error, data,loading} = useSelector((state)=> state.adminmovies.addMovie || {});
  const delUser = useSelector((state)=> state.adminuser.deleteUser || {});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAdd, setDialogAdd] = useState(false);
  const [movieid, setMovieId] = useState();
  const [movieadd, setMovieAdd] = useState({});
  const [selectedTheaters, setSelectedTheaters] = React.useState([]);

  const handleTheaterChange = (event) => {
    setSelectedTheaters(event.target.value);
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const getFilmFromDatabase = (id)=> {
    dispatch(getDetailMovies(id));
  }



  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
     
    setDeleteDialogOpen(true);
  };
  useEffect(()=> {
     
     
    const object = {
      theaterIds:selectedTheaters,
      typeMovie:type,
      moviePOJO:moviedetail
    }
    setMovieAdd(object);
  },[selectedTheaters,moviedetail])
const handleAddClick =(filmId: string) => {
  setMovieId(filmId);

 


setDialogAdd(true);
}

useEffect(()=> {
if(movieid)
{
   
  getFilmFromDatabase(movieid);
}
},[movieid])

  const confirmAdd = () => {
    if(movieadd?.theaterIds.length===0)
    {
      toast('Phải thêm rạp phim trước')
    }
    else{
      dispatch(addMovie(movieadd));
      setDialogAdd(false);
    }
  }
  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setUserIdToDelete(null);
  };
   
  useEffect(() => {
    if (data) {
      toast.success('Success');
    

    }
    if (error) {
      toast.error('Error: ' + error);
    }

  }, [data,error]);

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
      {listmovie?.results.length > 0 ? (
        <DataGrid
          rows={listmovie?.results}
          columns={MovieSystemColumn.map((col) => 
            col.field === 'add' ? {
              ...col,
              renderCell: (params) => (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleAddClick(params.id)}
                >
                  Thêm
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
        <DialogTitle>Xác nhận thêm</DialogTitle>
        <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="theater-select-label">Chọn rạp</InputLabel>
          <Select
            labelId="theater-select-label"
            multiple
            value={selectedTheaters}
            onChange={handleTheaterChange}
            renderValue={(selected) => selected.join(', ')} // Hiển thị các rạp đã chọn
          >
            {allTheater.map((theater) => (
              <MenuItem key={theater.id} value={theater.id}>
                {theater.id}-{theater.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          <DialogContentText>
            Bạn có chắc chắn muốn thêm phim dùng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDialogAdd(false)} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmAdd} color="secondary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Thông tin phim</DialogTitle>
          <DialogContent>
      
<div className="movie-details">
<div>
  <img src={`${process.env.REACT_APP_API_IMG_URL}${moviedetail?.poster_path}`} alt="Movie Poster" style={{ maxWidth: '100%', height: 'auto' }} />
</div>
  <Typography className="title">Tên phim: {moviedetail?.title}</Typography>
  <Typography className="overview">Mô tả: {moviedetail?.overview}</Typography>
  <Typography className="runtime">Thời lượng: {moviedetail?.runtime} phút</Typography>
  <Typography className="release-date">Ngày phát hành: {moviedetail?.release_date}</Typography>
</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>
    </Box>
    );
}