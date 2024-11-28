import { Link as RouterLink } from 'react-router-dom';
import { Paper, Typography, Box, Button, Divider, LinearProgress, Chip, Theme, Link } from '@mui/material';

const CareerPlans = () => {
  return (
    <Paper sx={paperStyle}>
      <Box sx={headerContainerStyle}>
        <Typography variant="h4" sx={headerStyle}>
          Ingeniería Informática - 2022
        </Typography>
        <Chip label="Active Plan" color="success" size="medium" sx={chipStyle} />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={overviewContainerStyle}>
        <Typography variant="body1" color="text.secondary">
          Plan Description:
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          La Ingeniería Informática ofrece orientaciones en Software y Redes, con sólida formación teórica, práctica y pasantías. Forma profesionales
          capacitados en TIC’s, gestión y diseño, aptos para resolver problemas e integrarse en mercados globalizados.
          <br /> <br /> Sus egresados destacan por su equilibrio entre teoría y práctica, y su habilidad para innovar y liderar proyectos
          tecnológicos.
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          Progress:
        </Typography>
        <LinearProgress variant="determinate" value={70} sx={progressBarStyle} />
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
          70% Completed
        </Typography>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={actionsContainerStyle}>
        <Button variant="contained" color="primary" size="small">
          <Link component={RouterLink} to="/dashboard/1/progress" underline="none" color="inherit">
            View Progress
          </Link>
        </Button>
        <Button variant="text" color="error" size="small">
          Delete Plan
        </Button>
      </Box>
    </Paper>
  );
};

export default CareerPlans;

// ---------- Styles ----------

const paperStyle = (theme: Theme) => ({
  mt: 2,
  padding: 3,
  boxShadow: 2,
  borderRadius: 2,
  bgcolor: 'background.paper',
  background: theme.palette.mode === 'dark' ? '#3f3f3f' : 'white',
});

const headerContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const headerStyle = {};

const overviewContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

const chipStyle = {
  color: '#fafaff',
};

const progressBarStyle = {
  height: 10,
  borderRadius: 5,
};

const actionsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 2,
};
