import React from 'react'
import NavBar from './components/NavBar'
import PasswordResetForm from './components/PasswordResetForm'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <NavBar />
        <PasswordResetForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
