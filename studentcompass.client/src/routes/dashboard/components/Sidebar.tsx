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
          <IconButton onClick={() => setOpen(!open)} sx={iconButtonStyle}>
            {open ? <ChevronLeftIcon sx={iconStyle} /> : <ChevronRightIcon sx={iconStyle} />}
          </IconButton>
        </Box>
        <List disablePadding>
          {sideBarOptions(location.pathname).map((option: SidebarOption) => (
            <ListItem key={option.name} disablePadding>
              <ListItemButton component={Link} to={option.path} selected={option.current} sx={listItemButtonStyle(option)}>
                <Box sx={iconWrapperStyle}>
                  <ListItemIcon sx={listItemIconStyle(option)}>{option.icon}</ListItemIcon>
                </Box>
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

const lastSlash = /\/[^/]*$/;

const sideBarOptions = (pathname: string) => [
  {
    name: 'Progress',
    icon: <DashboardIcon sx={iconStyle} />,
    path: pathname.replace(lastSlash, '/progress'),
    current: pathname.endsWith('progress'),
  },
  {
    name: 'Planner',
    icon: <CalendarTodayIcon sx={iconStyle} />,
    path: pathname.replace(lastSlash, '/planner'),
    current: pathname.endsWith('planner'),
  },
  {
    name: 'Analytics',
    icon: <BarChartIcon sx={iconStyle} />,
    path: pathname.replace(lastSlash, '/analytics'),
    current: pathname.endsWith('analytics'),
  },
];

// -------- Styles ----------

const drawerStyle = (open: boolean) => ({
  width: open ? 240 : 90,
  flexShrink: 0,
  top: NAVBAR_HEIGHT,
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
  overflow: 'hidden',
  transition: 'width 0.3s ease-in-out',
  [`& .MuiDrawer-paper`]: {
    width: open ? 240 : 100,
    boxSizing: 'border-box',
    transition: 'width 0.3s ease-in-out',
    top: NAVBAR_HEIGHT,
    height: `calc(100vh - ${NAVBAR_HEIGHT})`,
    overflow: 'hidden',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
  },
});

const boxWrapperStyle = {
  display: 'flex',
  position: 'relative',
  minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
  backgroundColor: 'background.paper',
  overflow: 'hidden',
};

const boxIconStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingTop: '2.6rem',
  paddingRight: 3.35,
  paddingBottom: '2rem',
  borderBottom: 2,
  borderColor: 'divider',
};

const iconButtonStyle = {
  borderRadius: 2,
  backgroundColor: 'background.paperChannel',
};

const listItemButtonStyle = (option: SidebarOption) => ({
  justifyContent: 'flex-start',
  py: 1.5,
  px: 2.5,
  ...(option.current && {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  }),
});

const iconWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'padding 0.3s',
  paddingLeft: '12px',
};

const listItemIconStyle = (option: SidebarOption) => ({
  color: option.current ? 'primary.main' : 'text.secondary',
});

const listItemTextStyle = (open: boolean) => ({
  opacity: open ? 1 : 0,
  transition: 'opacity 0.3s, margin-left 0.3s',
  whiteSpace: 'nowrap',
});

const iconStyle = {
  height: 30,
  width: 30,
};

// -------- Types ----------

type SidebarOption = {
  name: string;
  path: string;
  current: boolean;
  icon: JSX.Element;
};
