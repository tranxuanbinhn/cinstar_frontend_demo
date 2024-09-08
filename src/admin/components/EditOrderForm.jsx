// components/AddEditUserForm.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
//import { addUser, updateUser } from '../features/userSlice';

const AddEditOrderForm = ({ open, handleClose, userToEdit }) => {
  const [form, setForm] = useState({ fullName: '', email: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToEdit) setForm(userToEdit);
  }, [userToEdit]);

  const handleSubmit = () => {
    if (userToEdit) {
    //  dispatch(updateUser(form));
    } else {
    //  dispatch(addUser(form));
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          backgroundColor: 'white',
          width: 400,
          margin: 'auto',
          marginTop: '20vh',
        }}
      >
        <TextField
          label="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <TextField
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Button variant="contained" onClick={handleSubmit}>
          {userToEdit ? 'Update' : 'Add'}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddEditOrderForm;
