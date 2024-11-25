import Auth from './components/Auth';
import { Box, Typography } from '@mui/material';

const LandingPage = () => {
  return (
    <Box component="section" sx={sectionStyle}>
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
    </Box>
  );
};

export default LandingPage;

// -------- Styles ----------

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
  minHeight: '100vh',
  paddingTop: '4rem',
};

const contentWrapperStyle = {
  display: 'flex',
  flexDirection: { xs: 'column', lg: 'row' },
  alignItems: 'center',
  justifyContent: 'center',
};

const leftSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: '',
  padding: '0 15rem',
  width: '100%',
  lg: { width: '60%', marginLeft: '30px' },
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
  paddingRight: '15rem',
  width: '100%',
  lg: { width: '40%' },
};
