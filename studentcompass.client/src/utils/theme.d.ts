import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    colorSchemes: {
      light: {
        custom: {
          backgroundImage: string;
        };
      };
      dark: {
        custom: {
          backgroundImage: string;
        };
      };
    };
  }

  interface ThemeOptions {
    colorSchemes?: {
      light?: {
        custom?: {
          backgroundImage?: string;
        };
      };
      dark?: {
        custom?: {
          backgroundImage?: string;
        };
      };
    };
  }
}

type _ThemeOptionsReference = ThemeOptions;
