import { observer } from 'mobx-react';
import SubjectsContainer from './SubjectsContainer';
import { Box, Typography, Link, Breadcrumbs, Divider } from '@mui/material';
import { SIDEBAR_CLOSED_WIDTH } from '../../../../utils/constants';

const ContentComponent = () => {
  return (
    <Box sx={mainContainerStyle}>
      <Breadcrumbs
        separator={
          <Typography variant="h6" sx={separatorStyle}>
            ›
          </Typography>
        }
        aria-label="breadcrumb"
        sx={breadcrumbStyle}
      >
        <Link underline="none" color="inherit" href="/dashboard" variant="h6">
          Dashboard
        </Link>
        <Typography color="text.primary" variant="h6">
          Ingeniería Informática - 2022
        </Typography>
      </Breadcrumbs>
      <Divider />
      <Box sx={contentBoxStyle}>
        <SubjectsContainer />
      </Box>
    </Box>
  );
};

const Content = observer(ContentComponent);
export default Content;

// -------- Styles ----------

const mainContainerStyle = {
  marginLeft: SIDEBAR_CLOSED_WIDTH,
};

const contentBoxStyle = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: { xs: 'center', sm: 'space-evenly' },
  alignItems: 'center',
};

const breadcrumbStyle = {
  display: 'flex',
  alignItems: 'center',
  color: 'text.secondary',
  paddingBottom: 2,
  paddingTop: 2.5,
  paddingLeft: 2,
};

const separatorStyle = {
  px: 2,
  paddingBottom: 0.5,
};
