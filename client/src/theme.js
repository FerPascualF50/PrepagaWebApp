import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#45d1b7',
    },
    secondary: {
      main: '#ff5862',
    },
    error: {
      main: red.A400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 960, 
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;