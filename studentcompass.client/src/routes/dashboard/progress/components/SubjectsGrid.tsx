import { observer } from 'mobx-react';
import { statusStyles, yearLevelStyles } from '../../../../utils/enums';
import { SubjectRow, useProgressStore } from '../store/manager';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CircularYear from './CircularYear';

const SubjectsGridComponent = () => {
  const { SubjectsGrid } = useProgressStore();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.field}
                sx={{
                  width: col.width,
                  flex: col.flex,
                  padding: '4px 16px', // Add consistent padding
                  backgroundColor: 'white', // Match background color
                }}
              >
                <Typography
                  variant="caption" // Smaller font size
                  sx={{
                    fontWeight: 500, // Medium weight for better emphasis
                    color: 'grey.600', // Greyish text
                  }}
                >
                  {col.headerName}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {SubjectsGrid.subjectRows.map((row: SubjectRow) => (
            <TableRow key={row.code} hover sx={tableRowStyle}>
              <TableCell sx={tableCellStyle}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularYear color={yearLevelStyles[row.yearLevel]?.color} />
                  {yearLevelStyles[row.yearLevel]?.label || 'Unknown'}
                </Box>
              </TableCell>
              <TableCell sx={tableCellStyle}>{row.code}</TableCell>
              <TableCell sx={tableCellStyle}>{row.description}</TableCell>
              <TableCell sx={tableCellStyle}>{row.weeklyHours}hs</TableCell>
              <TableCell sx={tableCellStyle}>{row.finalGrade}</TableCell>
              <TableCell>
                <Paper sx={statusPaperStyle(row)}>
                  <Typography variant="body2" sx={typographyStatusStyle}>
                    {statusStyles[row.status]?.label || 'Unknown'}
                  </Typography>
                </Paper>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SubjectsGrid = observer(SubjectsGridComponent);
export default SubjectsGrid;

// ---------- Columns ----------

const columns = [
  { field: 'yearLevel', headerName: 'Year', width: 120 },
  { field: 'code', headerName: 'Code', width: 70 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'weeklyHours', headerName: 'Hours', width: 70 },
  { field: 'finalGrade', headerName: 'Grade', width: 70 },
  { field: 'status', headerName: 'Status', width: 200 },
];

// ---------- Styles ----------

const tableRowStyle = { '& td, & th': { padding: '1.5px 16px' } };

const tableCellStyle = {
  textShadow: '0.02em 0.02em 0 rgba(0, 0, 0, 0.8)',
};

const statusPaperStyle = (row: SubjectRow) => ({
  display: 'inline-block',
  padding: '4px 20px',
  borderRadius: 2,
  backgroundColor: statusStyles[row.status]?.color || '#e0e0e0',
});

const typographyStatusStyle = { color: '#fff' };
