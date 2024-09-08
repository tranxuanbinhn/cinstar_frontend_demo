export const MovieSystemColumn: GridColDef[] = [
  {
    field: 'add',
    headerName: 'Thêm',
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
      field: 'release_date',
      headerName: 'Ngày phát hành',
      width: 150,
      valueGetter: (params) => params.row.release_date,
    },
    {
        field: 'poster_path',
        headerName: 'Poster',
        width: 150,
        height:169,
        renderCell: (params) => (
          <img
            src={`${process.env.REACT_APP_API_IMG_URL}${params.value}`}
            alt={`Poster cho phim ${params.row.title}`}
            style={{ maxWidth: '100%',height: '100%', objectFit: 'cover' }}
          />
        ),
      },
    //{
    //  field: 'backdroPath',
    //  headerName: 'Backdrop',
    //  width: 200,
    //  renderCell: (params) => (
    //    <img
    //      src={`https://image.tmdb.org/t/p/w500${params.value}`}
    //      alt={`Backdrop cho phim ${params.row.title}`}
    //      style={{ maxWidth: '100%', height: 'auto' }}
    //    />
    //  ),
    //},
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