import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#E0E0E0',
    },
    disabled: {
      main: '#B6B8C0',
    },
    success: {
      main: '#2CE0B7',
    },
    light: {
      main: '#F5F5F5',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
