import { Box, CircularProgress } from '@mui/material';

const ScreenLoader = () => {
  return (
    <Box sx={screenLoaderStyle}>
      <CircularProgress />
    </Box>
  );
};

export default ScreenLoader;

// -------- Styles ----------

const screenLoaderStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 1300,
};
