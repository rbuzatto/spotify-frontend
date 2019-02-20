const popularityChecker = pop => {
    switch (pop) {
        case pop >= 80:
            return 'hot'    
        case pop >= 60:
            return 'cool'    
        case pop >= 30:
            return 'regular'  
        default:
            return 'underground'
    }
}

const handleFetchedDataType = data => {

    switch (data) {
        case data.albums:
            return data.albums.items.map((album) => ({
                name: album.name,
                image: album.images[0].url,
                artists: album.artists.length > 1 ? 'Various Artists' : album.artists[0],
                availability: album.available_markets.contains('BR')

            }))
        case data.artists:
        return data.artists.items.map((artist) => ({
            name: artist.name,
            image: artist.images[0].url,
            popularity: popularityChecker(artist.popularity),
            genres: artist.genres.join(', ')

        }))
        case data.tracks:
        return data.tracks.items.map((track) => ({
            name: track.name,
            duration: track.duration,
            album: track.album.name,
            artists: track.artists.map( o => o.name)

        }))
        default:
            return null
    }
}

export default handleFetchedDataType