import './index.css';
import App from './App.tsx';
import { theme } from './utils/themes';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles, ThemeProvider } from '@mui/material';

// ------------ Styles ------------

const toastStyle = {
  maxWidth: 700,
  marginTop: 67,
  width: 'auto',
};

const globalStyle = {
  body: {
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: theme.colorSchemes[theme.palette.mode].custom.backgroundImage,
  },
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={globalStyle} />
      <App />
      <ToastContainer style={toastStyle} />
    </ThemeProvider>
  </BrowserRouter>
);
