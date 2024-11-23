// import SubjectsActions from "./actions/SubjectsActions";
// import SubjectsTable from "./SubjectsTable";
import { Paper, Box, Typography } from '@mui/material';

const Subjects = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: 'background.paper',
        color: 'text.primary',
        width: 920,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 4,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'text.primary',
            textAlign: 'center',
            pl: 2,
          }}
        >
          Lista de materias
        </Typography>
        {/* <SubjectsActions /> */}
      </Box>

      {/* Table */}
      {/* <SubjectsTable /> */}
    </Paper>
  );
};

export default Subjects;
