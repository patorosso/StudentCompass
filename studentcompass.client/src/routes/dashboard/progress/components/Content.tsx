import { observer } from 'mobx-react';
import { Box, Typography } from '@mui/material';
import SubjectsContainer from './SubjectsContainer';
import { useProgressStore } from '../store/manager';
// import SummaryContainer from "./components/summary/SummaryContainer";

const ContentComponent = () => {
  const { ContentComponent } = useProgressStore();
  return (
    <Box>
      <Box sx={typographyBoxStyle}>
        <Typography variant="h4" sx={titleStyle}>
          {ContentComponent.title}
        </Typography>
      </Box>
      <Box sx={contentBoxStyle}>
        <SubjectsContainer />
        {/* <SummaryContainer /> */}
      </Box>
    </Box>
  );
};

const Content = observer(ContentComponent);
export default Content;

// -------- Styles ----------

const contentBoxStyle = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: { xs: 'center', sm: 'space-evenly' },
  alignItems: 'center',
  mt: 7,
};

const typographyBoxStyle = {
  display: 'flex',
  alignItems: 'center',
  px: 4,
  height: '80px',
  bgcolor: 'background.paperChannel',
  borderBottom: 1,
  borderColor: 'divider',
  opacity: 0.9,
  boxShadow: 2,
  borderRadius: 2,
};

const titleStyle = { color: 'text.primary' };
