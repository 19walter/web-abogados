import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D3557',
      light: '#457B9D',
      dark: '#152638',
    },
    secondary: {
      main: '#457B9D',
      light: '#f0f5ff',
      dark: '#1D3557',
    },
    error: {
      main: '#e63946',
      light: '#f8d7da',
      dark: '#721c24',
    },
    warning: {
      main: '#856404',
      light: '#fff3cd',
      dark: '#856404',
    },
    success: {
      main: '#155724',
      light: '#d4edda',
      dark: '#155724',
    },
    text: {
      primary: '#495057',
      secondary: '#6c757d',
    },
    background: {
      default: '#f0f5ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#1D3557',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#1D3557',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#1D3557',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1D3557',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1D3557',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1D3557',
    },
    subtitle1: {
      color: '#6c757d',
    },
    subtitle2: {
      color: '#6c757d',
    },
    body1: {
      color: '#495057',
    },
    body2: {
      color: '#6c757d',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#1D3557',
          color: 'white',
          '&:hover': {
            backgroundColor: '#152638',
          },
        },
        containedSecondary: {
          backgroundColor: '#457B9D',
          color: 'white',
          '&:hover': {
            backgroundColor: '#1D3557',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1D3557',
          color: 'white',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1D3557',
          color: 'white',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#6c757d',
            },
            '&:hover fieldset': {
              borderColor: '#1D3557',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1D3557',
            },
          },
        },
      },
    },
  },
});

export default theme; 