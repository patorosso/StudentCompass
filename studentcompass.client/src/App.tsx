import Home from './routes/main/View';
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
const DashboardLayout = lazy(() => import('./routes/dashboard/View'));
const Progress = lazy(() => import('./routes/dashboard/progress/View'));

// const DashboardLayout = withDelay(() => import('./routes/dashboard/View'), 3000); // 3-second delay
// const Progress = withDelay(() => import('./routes/dashboard/progress/View'), 3000); // 3-second delay

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Suspense fallback={<ScreenLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route path="progress" element={<Progress />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default App;
