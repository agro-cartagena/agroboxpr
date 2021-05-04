import React from 'react'
import PasswordResetForm from './components/PasswordResetForm'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Switch>
          <Route path='/passwordReset' component={PasswordResetForm}/>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
