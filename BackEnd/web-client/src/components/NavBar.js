import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.main
    },
    text: {
        color: theme.palette.text.primary.main
    },
    appbar: {
        alignItems: 'center',
        margin: 0
      }
  }))

const NavBar = () => {
    const classes = useStyles()

    return(
        <div>
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <Typography align="center">
                Reset AgroBox Password
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;