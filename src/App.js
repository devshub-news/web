import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Main from './main/Main';

function App() {

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#2196f3'
      },
      secondary: {
        main: '#FFFFFF'
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
        <div className="App">
          <Main></Main>
        </div>
    </MuiThemeProvider>
  );
}

export default App;
