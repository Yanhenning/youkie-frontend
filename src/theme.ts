'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#ab554b',
    },
    secondary: {
      main: '#1d2845',
    },
    background: {
      default: '#fbf3e2',
    },
    success: {
      main: '#69944f',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#e68417',
    },
    info: {
      main: '#3e2938',
    }
  },
});

export default theme;