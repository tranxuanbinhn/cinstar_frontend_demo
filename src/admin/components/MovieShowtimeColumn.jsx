export const MovieShowtimeColumn: GridColDef[] = [
    {
        field: 'delete',
        headerName: 'Xóa',
        width: 100,
      
      },
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      type: 'number',
      valueGetter: (params) => params.row.id,
    },
    {
      field: 'movieTitle',
      headerName: 'Tiêu đề phim',
      width: 200,
      valueGetter: (params) => params.row.movieTitle,
    },
    {
      field: 'screenName',
      headerName: 'Phòng chiếu',
      width: 150,
      valueGetter: (params) => params.row.screenName,
    },
    {
      field: 'theaterName',
      headerName: 'Tên rạp',
      width: 200,
      valueGetter: (params) => params.row.theaterName,
    },
    {
      field: 'date',
      headerName: 'Ngày',
      width: 150,
      valueGetter: (params) => params.row.date || 'Chưa có',
    },
    {
      field: 'time',
      headerName: 'Thời gian',
      width: 100,
      valueGetter: (params) => params.row.time,
    },
    
  
  ];