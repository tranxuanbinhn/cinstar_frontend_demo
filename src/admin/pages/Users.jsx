// pages/Users.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
//import { fetchUsers, deleteUser } from '../features/userSlice';
import AddEditUserForm from '../components/AddEditUserForm';
import { deleteUser, getAllUser, resetUserAdd, resetUserDelete } from '~/features/auth/AdminSlice';
import { userColumns } from '../components/UserColumn';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './css/ultity.css'

const UsersAdmin = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.adminuser.alluser);
  const pageSize = useSelector((state) => state.adminuser.pageSize);
  const [open, setOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const {error, data,loading} = useSelector((state)=> state.adminuser.useradd || {});
  const delUser = useSelector((state)=> state.adminuser.deleteUser || {});

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
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
    const data = {newPage:paginationModel.page+1, pageSize:paginationModel.pageSize}
     
    dispatch(getAllUser(data));
  }, [paginationModel]);

  const handleEdit = (user) => {
    setUserToEdit(user);
    setOpen(true);
  };

  const handleDelete = (id) => {
    //dispatch(deleteUser(id));
  };

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
     
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Gọi hàm để xóa người dùng tại đây (ví dụ: dispatch(deleteUser(userIdToDelete)))
    dispatch(deleteUser(userIdToDelete));
    setDeleteDialogOpen(false);
    // Reset userIdToDelete
    setUserIdToDelete(null);
    window.location.reload();
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setUserIdToDelete(null);
  };
  
  useEffect(() => {
    if (delUser?.status) {
      toast.success('Success');
    

    }
    if (delUser?.error) {
      toast.error('Error: ' + error);
    }

  }, [delUser?.status, delUser?.error]);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
        <h1 className='admin-film-h1'>User Management </h1>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add User
      </Button>
      {users?.results.length > 0 ? (
        <DataGrid
          rows={users?.results}
          columns={userColumns.map((col) => 
            col.field === 'delete' ? {
              ...col,
              renderCell: (params) => (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteClick(params.id)}
                >
                  Xóa
                </Button>
              ),
            } : col
          )}
          pageSize={paginationModel.pageSize}
          rowCount={users?.counts || 0}
          pagination
          paginationMode='server'
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
        open={deleteDialogOpen}
        onClose={cancelDelete}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa người dùng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersAdmin;
