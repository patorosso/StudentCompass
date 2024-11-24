// import SubjectsTable from "./SubjectsTable";
// import SubjectsActions from "./actions/SubjectsActions";
import { Paper, Box, Typography } from '@mui/material';

const Subjects = () => {
  return (
    <Paper elevation={3} sx={paperStyle}>
      <Box sx={boxStyle}>
        <Typography variant="h5" sx={typographyStyle}>
          Lista de materias
        </Typography>
        {/* <SubjectsActions /> */}
      </Box>
      {/* <SubjectsTable /> */}
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
