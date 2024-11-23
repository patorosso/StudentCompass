import { useEffect, useRef } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link as RouterLink } from 'react-router-dom';
import { AccountCircle, Lock } from '@mui/icons-material';
import { Box, TextField, Button, Divider, InputAdornment, Typography, Theme } from '@mui/material';

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  return (
    <Box sx={boxStyle}>
      <form>
        <Box px={4}>
          <Box my={4}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              slotProps={slotPropsUser}
              inputRef={usernameRef}
              sx={(theme) => textFieldStyle(theme)}
            />
          </Box>
          <Box mb={4}>
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              slotProps={slotPropsPass}
              sx={(theme) => textFieldStyle(theme)}
            />
          </Box>
          <Button variant="contained" color="primary" fullWidth component={RouterLink} to="/dashboard" sx={buttonStyle}>
            <Typography variant="button">Log in</Typography>
          </Button>
        </Box>
        <Divider sx={(theme) => dividerStyle(theme)} />
        <Box px={4}>
          <Button variant="contained" color="primary" fullWidth sx={googleButtonStyle} onClick={(e) => e.preventDefault()}>
            <GoogleIcon width={24} height={24} style={{ marginRight: 'auto' }} />
            <Box flexGrow={1} textAlign="center">
              <Typography variant="button">Continue with Google</Typography>
            </Box>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;

// ------------ Styles --------------

const slotPropsUser = {
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <AccountCircle sx={{ color: 'primary.light' }} />
      </InputAdornment>
    ),
  },
};

const slotPropsPass = {
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <Lock sx={{ color: 'primary.light' }} />
      </InputAdornment>
    ),
  },
};

const buttonStyle = {
  py: 2,
  minWidth: '370px',
  textTransform: 'none',
  fontWeight: 'bold',
};

const dividerStyle = (theme: Theme) => ({
  width: '100%',
  my: 4,
  borderColor: theme.palette.divider,
});

const googleButtonStyle = {
  py: 2,
  mt: 4,
  minWidth: '370px',
  textTransform: 'none',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

const textFieldStyle = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'primary.light',
      backgroundColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'primary.main',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'primary.light',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'primary.main',
  },
  minWidth: '370px',
  input: { color: theme.palette.text.primary },
});

const boxStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' };
