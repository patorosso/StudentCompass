import { observer } from 'mobx-react';
import { SubjectRow, useProgressStore } from '../store/manager';
import { statusStyles, yearLevelStyles } from '../../../../utils/enums';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CircularYear from './CircularYear';

const SubjectsGridComponent = () => {
  const { SubjectsGrid } = useProgressStore();

  return (
    <TableContainer sx={tableContainerStyle}>
      <Table>
        <TableHead sx={tableHeadStyle}>
          <TableRow>
            {columns.map((col: SubjectColumn) => (
              <TableCell key={col.field} sx={headerTableCellsStyle(col)}>
                <Typography variant="caption" sx={typographyHeaderStyle}>
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

const columns: SubjectColumn[] = [
  { field: 'yearLevel', headerName: 'Year', width: 120, pl: 5.3 },
  { field: 'code', headerName: 'Code', width: 70 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'weeklyHours', headerName: 'Hours', width: 70 },
  { field: 'finalGrade', headerName: 'Grade', width: 70 },
  { field: 'status', headerName: 'Status', width: 300 },
];

// ---------- Styles ----------

const tableContainerStyle = {
  borderRadius: 0,
  overflow: 'visible',
};

const tableHeadStyle = {
  top: '65px',
  position: 'sticky',
};

const tableRowStyle = { '& td, & th': { padding: '8px 16px' } };

const headerTableCellsStyle = (col: SubjectColumn) => ({
  width: col.width,
  flex: col.flex,
  paddingLeft: col.pl,
  paddingRight: 4,
  py: 0.5,
  backgroundColor: 'background.default',
});

const typographyHeaderStyle = {
  fontWeight: 500,
  color: 'grey.600',
};

const tableCellStyle = {
  textShadow: '0.02em 0.02em 0 rgba(0, 0, 0, 0.8)',
};

const statusPaperStyle = (row: SubjectRow) => ({
  display: 'inline-block',
  padding: '4px 20px',
  borderRadius: 1,
  backgroundColor: statusStyles[row.status]?.color || '#e0e0e0',
});

const typographyStatusStyle = { color: '#fff', textShadow: '0.02em 0.02em 0 rgba(0, 0, 0, 0.8)' };

// ---------- Types ----------

type SubjectColumn = {
  field: string;
  headerName: string;
  width?: number;
  flex?: number;
  pl?: number;
};
