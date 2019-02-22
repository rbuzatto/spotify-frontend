import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import './App.scss'

import Form       from './components/Form'
import NavBar     from './components/NavBar'
import TableItems from './components/TableItems'

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

    const {data, type} = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <NavBar />
          <Form />
          { data &&  <TableItems /> }
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  data : state.data.data,
  type: state.data.type
})

export default connect(mapStateToProps, null)(App)

// albums
// album - albums.items array {found albums}
// image : images[n].url
// artists: artists[j].name: if artists.length > 1 "Various Artists"
// name: name
// availability: available_markets {array of countries available} - check if contains BR

// artists
// artist = artists.items array {found artists}
// image : images[n].url (display first image returned)
// name: name
// popularity: popularity (tag >=80 : hot; 60 & 79: cool; 30 & 59 regular; < 30: underground)
// genres: genres[i] (separated by commmas)

// tracks
// track: tracks.items array {found tracks}
// name: name
// duration: duration ms
// album img: images[j].url
// album name: album.name
// artists: artists[i].name
