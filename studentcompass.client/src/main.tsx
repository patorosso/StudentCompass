import './index.css';
import App from './App.tsx';
import { theme } from './utils/themes';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import BackgroundUpdater from './routes/main/components/BackgroundUpdater';

// ------------ Styles ------------

const toastStyle = {
  maxWidth: 700,
  marginTop: 67,
  width: 'auto',
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <BackgroundUpdater />
      <App />
      <ToastContainer style={toastStyle} />
    </ThemeProvider>
  </BrowserRouter>
);
