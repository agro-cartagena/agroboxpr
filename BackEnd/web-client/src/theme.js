import { createMuiTheme, responsiveFontSizes }  from '@material-ui/core/styles'

let theme = createMuiTheme({
  palette: {
    primary: { 500: '#8C0634' },
    text: {
        primary: '#000000'
    }
  },
})

theme = responsiveFontSizes(theme)

export default theme