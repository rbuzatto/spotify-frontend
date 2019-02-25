import React, { Component }                 from 'react'
import { Router,Route }                     from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline                          from '@material-ui/core/CssBaseline'

import './App.scss'
import NavBar      from './containers/NavBar'
import DisplayData from './containers/DisplayData'

import Welcome      from './components/Welcome'
import Login        from './components/Login'
import Logout       from './components/Logout'
import PrivateRoute from './components/PrivateRoute'

import { SERVER_URL } from './constants/'

import history from './helpers/history'

class App extends Component {

  state = {
    token: null
  }

  componentDidMount() {
    console.log(process.env.NODE_ENV)
    fetch(SERVER_URL)
      .then(res => res.json())
      .then(({ token }) => localStorage.setItem('token', token))
      .catch(err => console.log(err))
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
      
        <CssBaseline/>
        <Router history={history}>
          <React.Fragment>
            <NavBar />
            <div className="App">
              <Route exact path="/" component={Welcome}/>
              <Route path="/login" component={Login}/>
              <Route path="/logout" component={Logout}/>
              <PrivateRoute path="/search/:type" component={DisplayData}/>
            </div>
          </React.Fragment>
        </Router>
      </MuiThemeProvider>

    )
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7986cb',
      main: '#4c4949',
      dark: '#303f9f',
    },
    secondary: {
      main: '#ffff00'
    }
  },
  breakpoints:{
    keys: [
      'xs',
      'mobile',
      'sm',
      'tablet',
      'md',
      'lg',
      'xl',
    ],
    values: {
      xs: 0,
      mobile: 420,
      sm: 600,
      tablet: 720,
      md: 960,
      lg: 1280,
      xl: 1920,
  }
},
  typography: {
    useNextVariants: true,
  }
})

export default App