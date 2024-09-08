import { formatCurrency } from "~/features/untility/Ultility";

export const OrderDatabaseColumn: GridColDef[] = [
    {
      field: 'viewCustomer',
      headerName: 'Xem Khách Hàng',
      width: 150,
   
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      type: 'number',
      valueGetter: (params) => params.row.id,
    },
    {
      field: 'ordercode',
      headerName: 'Mã Đơn Hàng',
      width: 150,
      valueGetter: (params) => params.row.ordercode,
    },
    {
      field: 'createDate',
      headerName: 'Ngày Tạo',
      width: 200,
      valueGetter: (params) =>
        new Date(params.row.createDate).toLocaleString(),
    },

   
   
    {
      field: 'totalPrice',
      headerName: 'Tổng Tiền',
      width: 150,
      valueGetter: (params) => formatCurrency(params.row.totalPrice),
    }
  ];