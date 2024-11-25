import React, { lazy, Suspense } from 'react';
import Navbar from './routes/main/components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScreenLoader from './routes/main/components/ScreenLoader';

// function withDelay(importFunc: () => Promise<{ default: React.ComponentType<unknown> }>, delay: number) {
//   return lazy(() =>
//     Promise.all([
//       importFunc(),
//       new Promise((resolve) => setTimeout(resolve, delay)), // Introduce delay
//     ]).then(([module]) => module)
//   );
// }

// const Stats = lazy(() => import('./components/dashboard/Stats'));
const LandingPage = lazy(() => import('./routes/main/View'));
const Dashboard = lazy(() => import('./routes/dashboard/View'));
const Progress = lazy(() => import('./routes/dashboard/progress/View'));
const DashboardGroup = lazy(() => import('./routes/dashboard/components/DashboardGroup'));

// const DashboardLayout = withDelay(() => import('./routes/dashboard/View'), 3000); // 3-second delay
// const Progress = withDelay(() => import('./routes/dashboard/progress/View'), 3000); // 3-second delay

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
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
    </React.Fragment>
  );
};

export default App;
