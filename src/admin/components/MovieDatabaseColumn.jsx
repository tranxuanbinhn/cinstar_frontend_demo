export const MovieDatabaseColumn: GridColDef[] = [
    {
      field: 'delete',
      headerName: 'Xóa',
      width: 100,
    },  
    {
      field: 'view',
      headerName: 'Xem',
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
      field: 'title',
      headerName: 'Tiêu đề',
      width: 200,
      valueGetter: (params) => params.row.title,
    },
    {
      field: 'releaseDate',
      headerName: 'Ngày phát hành',
      width: 150,
      valueGetter: (params) => params.row.releaseDate,
    },
    {
      field: 'posterPath',
      headerName: 'Poster',
      width: 150,
      renderCell: (params) => (
        <img
          src={`${process.env.REACT_APP_API_IMG_URL}${params.value}`}
          alt={`Poster cho phim ${params.row.title}`}
          style={{ maxWidth: '100%', height: '100%', objectFit: 'cover' }}
        />
      ),
    },
   
    {
      field: 'overview',
      headerName: 'Tóm tắt',
      width: 400,
      valueGetter: (params) => params.row.overview,
    },
    {
      field: 'runtime',
      headerName: 'Thời lượng',
      width: 100,
      valueGetter: (params) => params.row.runtime,
    },
  ];