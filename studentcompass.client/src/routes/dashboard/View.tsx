import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import News from './components/News';
import Events from './components/Events';

const Dashboard = () => {
  return (
    <Box sx={boxContentStyle} component="main">
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={10} sx={gridContainerStyle}>
          <Grid size={4}>
            <Events />
            <Paper
              sx={{
                height: '60%',
                mt: 2,
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: 'background.paper',
              }}
            />
          </Grid>
          <Grid size={5}>
            <Paper
              sx={{
                height: '200px',
                mt: 2,
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: 'background.paper',
              }}
            />
          </Grid>
          <Grid size={3}>
            <News />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;

// -------- Styles ----------

const boxContentStyle = { flexGrow: 1, p: 3 };

const gridContainerStyle = {
  height: '700px',
};
