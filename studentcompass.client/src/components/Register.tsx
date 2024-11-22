import { Link as RouterLink } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { Box, TextField, Button, InputAdornment, Typography } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

const Register = () => {
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
      <form>
        <Box px={4}>
          <Box my={4}>
            <TextField
              label="Username"
              id="username"
              variant="outlined"
              fullWidth
              inputRef={usernameRef}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle sx={{ color: 'primary.light' }} />
                    </InputAdornment>
                  ),
                  style: { color: 'white' },
                },
              }}
              sx={{
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
              }}
            />
          </Box>
          <Box mb={4}>
            <TextField
              label="Password"
              id="password"
              variant="outlined"
              type="password"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'primary.light' }} />
                    </InputAdornment>
                  ),
                  style: { color: 'white' },
                },
              }}
              sx={{
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
              }}
            />
          </Box>
          <Box mb={4}>
            <TextField
              label="Confirm Password"
              id="confirm-password"
              variant="outlined"
              type="password"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: 'primary.light' }} />
                    </InputAdornment>
                  ),
                  style: { color: 'white' },
                },
              }}
              sx={{
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
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={RouterLink}
            to="/dashboard"
            sx={{
              py: 2,
              mt: 2,
              minWidth: '370px',
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            <Typography variant="button">Register</Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
