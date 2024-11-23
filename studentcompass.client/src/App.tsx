import Home from './routes/main/View';
import React, { lazy, Suspense } from 'react';
import Navbar from './routes/main/components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';

const DashboardLayout = lazy(() => import('./routes/dashboard/View'));
//const Stats = lazy(() => import('./components/dashboard/Stats'));
//const Progress = lazy(() => import('./components/dashboard/Progress'));

const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default App;
