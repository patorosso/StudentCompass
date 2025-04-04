import Sidebar from './Sidebar';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { NAVBAR_HEIGHT } from '../../../utils/constants';

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
  minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
  backgroundColor: 'background.default',
  //display: 'flex',
};

const boxContentStyle = {
  overflow: 'visible',
};
