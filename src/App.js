import React, { Component } from 'react'

import './App.css'

import Form from './components/Form'

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
      .then(({ token }) => this.setState(() => ({ token })))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Form />
      </div>
    )
  }
}

export default App

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
