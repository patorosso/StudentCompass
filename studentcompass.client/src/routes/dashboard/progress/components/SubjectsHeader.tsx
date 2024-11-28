import { Box, Typography } from '@mui/material';

const SubjectsHeader = () => {
  return (
    <Box sx={boxStyle}>
      <Typography variant="h5" sx={typographyStyle}>
        Lista de materias
      </Typography>
    </Box>
  );
};

export default SubjectsHeader;

// ---------- Styles ----------

const boxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pb: 4,
};

const typographyStyle = {
  color: 'text.primary',
  textAlign: 'center',
  pl: 2,
};
