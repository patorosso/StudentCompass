import Auth from './components/Auth';
import { Box, Typography } from '@mui/material';

const LandingPage = () => {
  return (
    <Box sx={contentWrapperStyle}>
      <Box sx={leftSectionStyle}>
        <Box>
          <p style={flatStudentTextStyle}>student</p>
          <p style={flatCompassTextStyle}>Compass</p>
        </Box>
        <Typography sx={subtitleStyle}>Navigate your college journey</Typography>
      </Box>
      <Box sx={rightSectionStyle}>
        <Auth />
      </Box>
    </Box>
  );
};

export default LandingPage;

// -------- Styles ----------

const contentWrapperStyle = {
  display: 'flex',
  pt: 7,
};

const leftSectionStyle = {
  display: { lg: 'flex', md: 'none', sm: 'none', xs: 'none' },
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: '',
  padding: '0 15rem',
};

const flatStudentTextStyle = {
  fontSize: '8rem',
  fontWeight: 800,
  backgroundImage: 'linear-gradient(to right, #541c7c 5%, #6561c0 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  margin: 0,
  padding: 0,
};

const flatCompassTextStyle = {
  fontSize: '9rem',
  fontWeight: 800,
  backgroundImage: 'linear-gradient(to right, #541c7c 5%, #e90b93 70%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  margin: 0,
  padding: 0,
};

const subtitleStyle = {
  color: 'gray',
  fontSize: { xs: '1.25rem', md: '1.5rem', lg: '2rem' },
  marginTop: '1rem',
  padding: '0 0.5rem',
};

const rightSectionStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '3rem',
  paddingRight: { lg: '15rem', md: 0, sm: 0, xs: 0 },
};
