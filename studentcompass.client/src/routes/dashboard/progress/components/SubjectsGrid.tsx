import { Box } from '@mui/material';
import { useProgressStore } from '../store/manager';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const SubjectsGrid = () => {
  const { SubjectsGrid } = useProgressStore();

  return (
    <Box sx={boxStyle}>
      <DataGrid
        columns={columns}
        checkboxSelection
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        initialState={initialState}
        getRowId={(row) => row.code}
        rows={SubjectsGrid.subjectRows}
      />
    </Box>
  );
};

export default SubjectsGrid;

// ---------- Columns ----------

const columns: GridColDef[] = [
  { field: 'code', headerName: 'Code', width: 70 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'weeklyHours', headerName: 'Hours', width: 70, type: 'number' },
  { field: 'finalGrade', headerName: 'Grade', width: 70, type: 'number' },
  { field: 'status', headerName: 'Status', width: 200 },
];

// ---------- Init ----------

const initialState = {
  pagination: {
    paginationModel: {
      pageSize: 5,
    },
  },
};

// ---------- Styles ----------

const boxStyle = { height: '100%', width: '100%' };
