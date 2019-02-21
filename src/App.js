import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import './App.scss'

import Form from './components/Form'
import NavBar from './components/NavBar'
import ItemDisplay from './components/ItemDisplay'

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


  fetchApi = () => {
    let url = new URL('https://api.spotify.com/v1/search?q=spice+world&type=album')
    // let params = new 

    const headers = new Headers({"Content-Type": "application/json", "Authorization": "Bearer BQCg5plDpteNwIoXQi8QAY531WbRycSLEfsdRmPEG87pTEbM035P5GYhpTHYP5X3ay-J0xhMyxZATCL5jKh7Hu19eQOKq8ih_-_8Uqt5pvmBf1iBmhfE16Z5an1kZQlvkI1WM8r1xVJu"})

    const settings = {
      method: 'GET',
      headers
    }

    const request = new Request(url, settings)


    fetch(request)
      .then(res => res.json())
      .then(data => console.log(data.albums.items[0]))
  }

  componentDidMount() {
    // this.fetchApi()
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
          { data &&  <ItemDisplay data={data[0]} type={type} /> }
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
