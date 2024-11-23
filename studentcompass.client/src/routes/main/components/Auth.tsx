import Login from './Login';
import { useState } from 'react';
import Register from './Register';
import { Box, Paper, Tabs, Tab, Theme } from '@mui/material';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Paper elevation={3} sx={(theme) => paperStyle(theme)}>
      <Tabs value={activeTab} onChange={handleChange} variant="fullWidth" textColor="inherit" indicatorColor="primary" sx={tabsStyle}>
        <Tab label="Log in" value="login" sx={(theme) => firstTabStyle(theme, activeTab)} />
        <Tab label="Register" value="register" sx={(theme) => secondTabStyle(theme, activeTab)} />
      </Tabs>
      <Box p={2}>{activeTab === 'login' ? <Login /> : <Register />}</Box>
    </Paper>
  );
};

export default Auth;

// ------------ Styles --------------

const paperStyle = (theme: Theme) => ({
  p: 4,
  minHeight: 550,
  bgcolor: theme.palette.background.default,
  boxShadow: 6,
  borderRadius: 2,
  margin: 'auto',
  lg: { marginRight: '60px' },
});

const tabsStyle = {
  borderBottom: 1,
  borderColor: 'divider',
  marginBottom: 2,
};

const firstTabStyle = (theme: Theme, activeTab: string) => ({
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: activeTab === 'login' ? theme.palette.text.primary : theme.palette.text.disabled,
  borderBottom: activeTab === 'login' ? `2px solid ${theme.palette.primary.main}` : 'none',
  transition: 'all 0.3s ease-in-out',
});

const secondTabStyle = (theme: Theme, activeTab: string) => ({
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: activeTab === 'register' ? theme.palette.text.primary : theme.palette.text.disabled,
  borderBottom: activeTab === 'register' ? `2px solid ${theme.palette.primary.main}` : 'none',
  transition: 'all 0.3s ease-in-out',
});
