import { observer } from 'mobx-react';
import { Box, Typography, Link, Breadcrumbs, Divider } from '@mui/material';
//import { useProgressStore } from '../store/manager';
import SubjectsContainer from './SubjectsContainer';
import React from 'react';
// import SummaryContainer from "./components/summary/SummaryContainer";

const ContentComponent = () => {
  //const { Content } = useProgressStore();
  return (
    <React.Fragment>
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
        {/* <SummaryContainer /> */}
      </Box>
    </React.Fragment>
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
//const titleStyle = { color: 'text.primary' };

const breadcrumbStyle = {
  display: 'flex',
  alignItems: 'center',
  color: 'text.secondary',
  paddingBottom: 2,
  paddingTop: 2.5,
  paddingLeft: 3.5,
};

const separatorStyle = {
  px: 2,
  paddingBottom: 0.5,
};
