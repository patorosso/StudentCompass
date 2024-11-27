import Sidebar from './Sidebar';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

const DashboardGroup = () => {
  return (
    <Box sx={boxWrapperStyle}>
      <Sidebar />
      <Box sx={boxContentStyle} component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardGroup;

// -------- Styles ----------

const boxWrapperStyle = {
  display: 'flex',
};

const boxContentStyle = { flexGrow: 1, p: 3 };
