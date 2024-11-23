import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Drawer, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NAVBAR_HEIGHT } from '../../../utils/constants';

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={boxWrapperStyle}>
      <Drawer variant="permanent" open={open} sx={drawerStyle(open)}>
        <Box sx={boxIconStyle}>
          <IconButton onClick={() => setOpen(!open)}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </Box>
        <List>
          {sideBarOptions(location.pathname).map((option: SidebarOption) => (
            <ListItem key={option.name} disablePadding>
              <ListItemButton component={Link} to={option.path} selected={option.current} sx={listItemButtonStyle(open, option)}>
                <ListItemIcon sx={listItemIconStyle(option)}>{option.icon}</ListItemIcon>
                <ListItemText primary={option.name} sx={listItemTextStyle(open)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;

// -------- Helper Functions ----------

const sideBarOptions = (pathname: string) => [
  {
    name: 'Progress',
    icon: <DashboardIcon />,
    path: '/dashboard/progress',
    current: pathname === '/dashboard/progress',
  },
  {
    name: 'Planner',
    icon: <CalendarTodayIcon />,
    path: '/dashboard/planner',
    current: pathname === '/dashboard/planner',
  },
  {
    name: 'Analytics',
    icon: <BarChartIcon />,
    path: '/dashboard/analytics',
    current: pathname === '/dashboard/analytics',
  },
];

// -------- Styles ----------

const boxWrapperStyle = {
  display: 'flex',
  position: 'relative',
  minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
};

const drawerStyle = (open: boolean) => ({
  width: open ? 240 : 64,
  flexShrink: 0,
  top: NAVBAR_HEIGHT,
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  [`& .MuiDrawer-paper`]: {
    width: open ? 240 : 64,
    boxSizing: 'border-box',
    transition: 'width 0.3s',
    top: NAVBAR_HEIGHT,
    height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  },
});

const boxIconStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '1rem',
};

const listItemButtonStyle = (open: boolean, option: SidebarOption) => ({
  justifyContent: open ? 'flex-start' : 'center',
  px: 2.5,
  ...(option.current && {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  }),
});

const listItemIconStyle = (option: SidebarOption) => ({
  justifyContent: 'center',
  color: option.current ? 'primary.main' : 'text.secondary',
});

const listItemTextStyle = (open: boolean) => ({
  opacity: open ? 1 : 0,
  marginLeft: open ? 2 : 0,
  transition: 'opacity 0.3s, margin-left 0.3s',
  whiteSpace: 'nowrap',
});

// -------- Types ----------

type SidebarOption = {
  name: string;
  path: string;
  current: boolean;
  icon: JSX.Element;
};
