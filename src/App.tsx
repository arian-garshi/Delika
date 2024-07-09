import { createGlobalStyle } from 'styled-components';
import AppRoutes from './Routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    color: #333;
    line-height: 1.6;
  }
`;

const theme = createTheme({
  typography: {
    fontFamily: [
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','), 
  },

  palette: {
    primary: {
      main: '#D2415B',
    },
    secondary: {
      main: '#3f3f3f', // Adjust this to match your desired secondary color
    },
    error: {
      main: '#FF6B6B', // Adjust this to match your desired error color
    },
    warning: {
      main: '#FFA726', // Adjust this to match your desired warning color
    },
    info: {
      main: '#29B6F6', // Adjust this to match your desired info color
    },
    success: {
      main: '#66BB6A', // Adjust this to match your desired success color
    },
  },
});

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
