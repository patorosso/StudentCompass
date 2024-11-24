import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const DashboardWithSidebar = () => {
  return (
    <Box sx={boxWrapperStyle}>
      <Sidebar />
      <Box sx={boxContentStyle} component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardWithSidebar;

// -------- Styles ----------

const boxWrapperStyle = {
  display: 'flex',
};

const boxContentStyle = { flexGrow: 1, p: 3 };
