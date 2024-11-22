import { useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AccountCircle, Lock } from '@mui/icons-material';
import { Box, TextField, Button, InputAdornment, Typography } from '@mui/material';

const Register = () => {
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
              sx={textFieldStyle}
              inputRef={usernameRef}
              slotProps={slotPropsUser}
            />
          </Box>
          <Box mb={4}>
            <TextField id="password" type="password" label="Password" variant="outlined" fullWidth sx={textFieldStyle} slotProps={slotPropsPass} />
          </Box>
          <Box mb={4}>
            <TextField
              type="password"
              variant="outlined"
              id="confirm-password"
              label="Confirm Password"
              fullWidth
              sx={textFieldStyle}
              slotProps={slotPropsPass}
            />
          </Box>
          <Button fullWidth to="/dashboard" color="primary" variant="contained" sx={buttonStyle} component={RouterLink}>
            <Typography variant="button">Register</Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;

// ------------ Styles --------------

const slotPropsUser = {
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <AccountCircle sx={{ color: 'primary.light' }} />
      </InputAdornment>
    ),
    style: { color: 'white' },
  },
};

const slotPropsPass = {
  input: {
    startAdornment: (
      <InputAdornment position="start">
        <Lock sx={{ color: 'primary.light' }} />
      </InputAdornment>
    ),
    style: { color: 'white' },
  },
};

const textFieldStyle = {
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
};

const buttonStyle = {
  py: 2,
  mt: 2,
  minWidth: '370px',
  textTransform: 'none',
  fontWeight: 'bold',
};

const boxStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' };
