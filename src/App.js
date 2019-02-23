import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import './App.scss'


import Welcome     from './components/Welcome'
import NavBar     from './components/NavBar'
import Login     from './components/Login'

import DisplayData from './containers/DisplayData'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7986cb",
      main: "#4c4949",
      dark: "#303f9f",
    },
  },
  typography: {
    useNextVariants: true,
  },
})

class App extends Component {

  state = {
    token: null
  }

  componentDidMount() {

    fetch('http://localhost:3001')
      .then(res => res.json())
      .then(({ token }) => localStorage.setItem('token', token))
      .catch(err => console.log(err))
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
      
        <CssBaseline/>
        <Router>
          <React.Fragment>
            <NavBar />
          <div className="App">
            <Route exact path="/" component={Welcome}/>
            <Route path="/login" component={Login}/>
            <Route path="/search/:type" component={DisplayData}/>
          </div>
          </React.Fragment>
        </Router>
      </MuiThemeProvider>

    )
  }
}

export default App