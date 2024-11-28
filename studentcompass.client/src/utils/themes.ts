import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#6561c0',
        },
        secondary: {
          main: '#E90B93',
        },
        background: {
          default: '#fff',
          paper: 'rgba(250, 255, 252, 0.8)',
          paperChannel: '#ededed',
        },
      },
      custom: {
        backgroundImage: "url('/background-light.png')",
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#6561c0',
        },
        secondary: {
          main: '#E90B93',
        },
        background: {
          default: '#000',
          paper: 'rgba(40, 40, 40, 0.8)',
          paperChannel: '#3f3f3f',
        },
      },
      custom: {
        backgroundImage: "url('/background-dark.png')",
      },
    },
  },
});
