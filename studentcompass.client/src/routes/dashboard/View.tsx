import { Box } from '@mui/material';
import News from './components/News';
import Grid from '@mui/material/Grid2';
import Events from './components/Events';
import CareerPlans from './components/CareerPlans';
import { NAVBAR_HEIGHT } from '../../utils/constants';

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

const boxContentStyle = { flexGrow: 1, px: 3, minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`, backgroundColor: 'background.default' };

const gridContainerStyle = {
  height: '600px',
};
