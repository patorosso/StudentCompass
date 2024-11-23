import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';

const DashboardLayout = () => {
  return (
    <Box sx={boxWrapperStyle}>
      <Sidebar />
      <Box sx={boxContentStyle} component="main">
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;

// -------- Styles ----------

const boxWrapperStyle = {
  display: 'flex',
};

const boxContentStyle = { flexGrow: 1, p: 3 };
