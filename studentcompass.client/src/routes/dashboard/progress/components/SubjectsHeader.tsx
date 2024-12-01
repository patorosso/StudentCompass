import { Box } from '@mui/material';

const SubjectsHeader = () => {
  return <Box sx={boxStyle}></Box>;
};

export default SubjectsHeader;

// ---------- Styles ----------

const boxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pb: 4,
};
