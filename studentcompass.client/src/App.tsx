import { Box } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import Navbar from './routes/main/components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScreenLoader from './routes/main/components/ScreenLoader';
import { NAVBAR_HEIGHT } from './utils/constants';

const LandingPage = lazy(() => import('./routes/main/View'));
const Dashboard = lazy(() => import('./routes/dashboard/View'));
const Progress = lazy(() => import('./routes/dashboard/progress/View'));
const DashboardGroup = lazy(() => import('./routes/dashboard/components/DashboardGroup'));

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Box sx={boxStyle}>
        <Suspense fallback={<ScreenLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard/:careerPlan" element={<DashboardGroup />}>
              <Route index element={<Navigate to="progress" replace />} />
              <Route path="progress" element={<Progress />} />
              {/* <Route path="stats" element={<Stats />} /> */}
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Box>
    </React.Fragment>
  );
};

export default App;

// ---------- Styles ----------

const boxStyle = {
  display: 'flex',
  overflowX: 'hidden',
  justifyContent: 'center',
  height: `calc(100vh - ${NAVBAR_HEIGHT})`,
};

// ----------- Test -----------

// function withDelay(importFunc: () => Promise<{ default: React.ComponentType<unknown> }>, delay: number) {
//   return lazy(() =>
//     Promise.all([
//       importFunc(),
//       new Promise((resolve) => setTimeout(resolve, delay)), // Introduce delay
//     ]).then(([module]) => module)
//   );
// }

// const DashboardLayout = withDelay(() => import('./routes/dashboard/View'), 3000); // 3-second delay
// const Progress = withDelay(() => import('./routes/dashboard/progress/View'), 3000); // 3-second delay
