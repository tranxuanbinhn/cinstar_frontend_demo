// UserColumns.js
import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';


export const userColumns: GridColDef[] = [
  {
    field: 'delete',
    headerName: 'Xóa',
    width: 100,
    
  },
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 230,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 230,
  },
  {
    field: 'cic',
    headerName: 'Can Cuoc Cong Dan',
    width: 150,
  },
  {
    field: 'birthDay',
    headerName: 'Birth Day',
    width: 160,
    renderCell: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();  // Format ngày tháng theo định dạng của bạn
    },
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    width: 160,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 160,
  },
  {
    field: 'userName',
    headerName: 'User Name',
    width: 160,
  },
];
