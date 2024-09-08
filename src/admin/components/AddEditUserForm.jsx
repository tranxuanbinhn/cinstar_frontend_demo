// components/AddEditUserForm.jsx

import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addUser } from '~/features/auth/AdminSlice';

//import { addUser, updateUser } from '../features/userSlice';

const AddEditUserForm = ({ open, handleClose, userToEdit }) => {
  
  const [form, setForm] = useState({ fullName: '', email: '', birthDay:'',cic:'' });
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
 
  useEffect(() => {
    if (userToEdit) 
        setForm(userToEdit);
  }, [userToEdit]);
  

  const onSubmit = (data) => {
  
     
    dispatch(addUser(data)).unwrap().then((response)=> {
       
    })
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          backgroundColor: 'white',
          width: 400,
          margin: 'auto',
          marginTop: '5vh',
        }}
      >
     <TextField
      label="Họ và tên"
      {...register('fullName', { required: "Họ và tên là bắt buộc" })}
      error={!!errors.fullName}
      helperText={errors.fullName ? errors.fullName.message : ''}
    />
    <TextField
      label="Tên đăng nhập"
      {...register('userName', { required: "Tên đăng nhập là bắt buộc" })}
      error={!!errors.userName}
      helperText={errors.userName ? errors.userName.message : ''}
    />
    <TextField
      label="Mật khẩu"
      type={'text' }
      {...register('password', {
        required: "Mật khẩu là bắt buộc",
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])/,
          message: "Mật khẩu phải có ít nhất một chữ in hoa và một chữ in thường"
        },
        minLength: {
          value: 8,
          message: "Mật khẩu phải có ít nhất 8 ký tự"
        }
      })}
      error={!!errors.password}
      helperText={errors.password ? errors.password.message : ''}
    />

    <TextField
      label="Email"
      {...register('email', {
        required: "Email là bắt buộc",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "Địa chỉ email không hợp lệ"
        }
      })}
      error={!!errors.email}
      helperText={errors.email ? errors.email.message : ''}
    />
    <TextField
      label="Số điện thoại"
      {...register('phoneNumber', { required: "Số điện thoại là bắt buộc" })}
      error={!!errors.phoneNumber}
      helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
    />
     <FormControl fullWidth variant="outlined">
          <InputLabel id="role-label">Vai trò</InputLabel>
          <Select
            labelId="role-label"
            label="Vai trò"
            {...register('role', { required: "Vai trò là bắt buộc" })}
            defaultValue="ROLE_USER"
          >
            <MenuItem value="ROLE_ADMIN">ROLE_ADMIN</MenuItem>
            <MenuItem value="ROLE_USER">ROLE_USER</MenuItem>
          </Select>
          </FormControl>
    <TextField
      label="CCCD"
      {...register('cic', { required: "CCCD là bắt buộc" })}
      error={!!errors.cccd}
      helperText={errors.cccd ? errors.cccd.message : ''}
    />
    <TextField
      label="Ngày sinh"
      type='date'
      {...register('birthDay', { required: "Ngày sinh là bắt buộc" })}
      error={!!errors.birthDay}
      helperText={errors.birthDay ? errors.birthDay.message : ''}
    />
  

    <button className='button-auth'>Đăng ký</button>

      </Box>
    
    </Modal>
  );
};

export default AddEditUserForm;
