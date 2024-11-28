import { Paper } from '@mui/material';
import SubjectsTable from './SubjectsGrid';
import SubjectsHeader from './SubjectsHeader';

const Subjects = () => {
  return (
    <Paper elevation={3} sx={paperStyle}>
      <SubjectsHeader />
      <SubjectsTable />
    </Paper>
  );
};

export default Subjects;

// ---------- Styles ----------

const paperStyle = {
  bgcolor: 'background.paper',
  color: 'text.primary',
  width: 920,
  p: 4,
  borderRadius: 2,
  boxShadow: 3,
};
