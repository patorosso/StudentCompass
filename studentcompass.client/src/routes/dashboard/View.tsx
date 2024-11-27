import { Box } from '@mui/material';
import News from './components/News';
import Grid from '@mui/material/Grid2';
import Events from './components/Events';
import CareerPlans from './components/CareerPlans';

const Dashboard = () => {
  return (
    <Box sx={boxContentStyle} component="main">
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={6} sx={gridContainerStyle}>
          <Grid size={3}>
            <Events />
          </Grid>
          <Grid size={6}>
            <CareerPlans />
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

const boxContentStyle = { flexGrow: 1, px: 3 };

const gridContainerStyle = {
  height: '600px',
};
