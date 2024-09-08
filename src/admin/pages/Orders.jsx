// pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, DialogTitle, DialogContent, DialogActions, Dialog, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
//import { fetchOrders, deleteOrder } from '../features/orderSlice';
import AddEditOrderForm from '../components/EditOrderForm';
import { toast, ToastContainer } from 'react-toastify';
import { getAllOrder } from '~/features/admin/OrderSlice';
import { OrderDatabaseColumn } from '../components/OrderColumn';
import { getCustomerByid, getUserByid } from '~/features/admin/CustomerSlice';
import './css/order.css';

const OrdersAdmin = () => {
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState(null);
  const orders = useSelector((state) => state.adminorders.orders) || [];
  const [open, setOpen] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const error = useSelector((state)=> state.admincustomer.error)

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  useEffect(() => {
    dispatch(getAllOrder({page:1, pageSize:3}));
  }, [dispatch]);

  const handleEdit = (order) => {
    //setOrderToEdit(order);
    setOpen(true);
  };
 
  const handleDelete = (id) => {
    //dispatch(deleteOrder(id));
  };
  const handleViewCustomer = ({userId, customerId}) => {
     
    if(userId!= null)
    {
       dispatch(getUserByid(userId)).unwrap()
      .then((data) => setCustomerData(data))
    }
    else if(customerId!= null)
    {
      dispatch(getCustomerByid(customerId)).unwrap()
      .then((data) => setCustomerData(data))
    }
  
  };
useEffect(()=>{if(error){
  toast('Have some error')
}},[error])
  return (
    <Box sx={{ height: 400, width: '100%' }}>
 
 <h1 className='admin-film-h1'>Order Management </h1>
 {
  orders?.results?.length > 0 ? (
    <DataGrid
      rows={orders?.results}
      columns={OrderDatabaseColumn.map((col) =>
        col.field === 'viewCustomer'
          ? {
              ...col,
              renderCell: (params) => (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleViewCustomer(params.row)}
                >
                  Xem người mua
                </Button>
              ),
            }
          : col
      )}
      pageSize={paginationModel.pageSize}
      rowCount={orders?.counts || 0}
      pagination
      paginationMode='server'
      paginationModel={paginationModel}
      onPaginationModelChange={(newPaginationModel) => {
        setPaginationModel(newPaginationModel);
      }}
    />
  ) : (
    <div>Không có order để hiển thị</div>
  )
}
     {customerData && (
   <Dialog open={!!customerData} onClose={() => setCustomerData(null)}>
   <div className="customer-info-dialog">
     <DialogTitle className="customer-info-dialog__title">Thông Tin Khách Hàng</DialogTitle>
     <DialogContent className="customer-info-dialog__content">
       <p className="customer-info-dialog__content-item">ID: {customerData.id}</p>
       <p className="customer-info-dialog__content-item">Tên: {customerData.name}</p>
       <p className="customer-info-dialog__content-item">Email: {customerData.email}</p>
       <p className="customer-info-dialog__content-item">PhoneNumber: {customerData.phoneNumber}</p>
       {/* Hiển thị các thông tin khác của khách hàng */}
     </DialogContent>
     <DialogActions className="customer-info-dialog__actions">
       <Button className="customer-info-dialog__actions-button" onClick={() => setCustomerData(null)}>Đóng</Button>
     </DialogActions>
   </div>
 </Dialog>
  )}
    </Box>

  );
};

export default OrdersAdmin;
