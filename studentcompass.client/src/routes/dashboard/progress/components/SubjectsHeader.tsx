import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const SubjectsHeader = () => {
  return (
    <Box sx={boxStyle}>
      <Button startIcon={<EditIcon />} variant="contained" sx={buttonEditStyle}>
        <Typography variant="button">Edit</Typography>
      </Button>
      <Button startIcon={<FilterAltIcon />} variant="contained" color="info" sx={buttonFilterStyle}>
        <Typography variant="button">Filter</Typography>
      </Button>
    </Box>
  );
};

export default SubjectsHeader;

// ---------- Styles ----------

const boxStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  py: 2,
  position: 'sticky',
  top: 0,
  backgroundColor: 'background.default',
};

const buttonEditStyle = {
  mx: 1,
  backgroundColor: '#eab308',
  boxShadow: 3,
  py: 1,
};

const buttonFilterStyle = {
  mx: 1,
  backgroundColor: 'grey',
  boxShadow: 3,
  py: 1,
};
