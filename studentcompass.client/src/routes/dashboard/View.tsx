import { Box, Grid, Paper } from '@mui/material';

const LandingDashboard = () => {
  return (
    <Box sx={boxContentStyle} component="main">
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                height: '300px', // Adjust height
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: 'background.paper',
              }}
            />
            <Paper
              sx={{
                height: '300px', // Adjust height
                mt: 2,
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: 'background.paper',
              }}
            />
          </Grid>

          {/* Middle Column */}
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                height: '200px', // Adjust height
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: 'background.paper',
              }}
            />
            <Paper
              sx={{
                height: '200px', // Adjust height
                mt: 2,
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: 'background.paper',
              }}
            />
            <Paper
              sx={{
                height: '200px', // Adjust height
                mt: 2,
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: 'background.paper',
              }}
            />
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                height: '600px', // Adjust height
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: 'background.paper',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default LandingDashboard;

// -------- Styles ----------

const boxContentStyle = { flexGrow: 1, p: 3 };
