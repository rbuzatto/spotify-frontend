import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import {
  BrowserRouter as Router,
  Route,
  Link
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

    fetch('http://localhost:4000')
      .then(res => res.json())
      .then(({ token }) => localStorage.setItem('token', token))
      .catch(err => console.log(err))
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
      
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Welcome}/>
            <Route path="/artists" component={DisplayData}/>
            <Route path="/albums" component={DisplayData}/>
            <Route path="/tracks" component={DisplayData}/>
            <Route path="/login" component={Login}/>
          </div>
        </Router>
      </MuiThemeProvider>

    )
  }
}

export default App