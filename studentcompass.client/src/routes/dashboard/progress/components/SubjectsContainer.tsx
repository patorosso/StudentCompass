import { Box } from '@mui/material';
import SubjectsTable from './SubjectsGrid';
import SubjectsHeader from './SubjectsHeader';

const Subjects = () => {
  return (
    <Box sx={boxStyle}>
      <SubjectsHeader />
      <SubjectsTable />
    </Box>
  );
};

export default Subjects;

// ---------- Styles ----------

const boxStyle = {
  width: 920,
  p: 4,
};
