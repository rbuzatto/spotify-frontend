const popularityChecker = pop => {

    switch (true) {
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

const handleFetchedDataType = (data, type) => {
    const payload = { data: {}, type }
    
    switch (type) {
        case 'album':
            payload.data =  data.albums.items.map((album) => ({
                name        : album.name,
                id          : album.id,
                image       : album.images.length ? album.images[0].url   : null,
                artist     : album.artists.length > 1 ? 'Various Artists': album.artists[0].name,
                availability: album.available_markets.includes('BR')

            }))
                return payload
        case 'artist':
        payload.data =  data.artists.items.map((artist) => ({
            name      : artist.name,
            id        : artist.id,
            image     : artist.images.length ? artist.images[0].url: null,
            popularity: popularityChecker(artist.popularity),
            genres    : artist.genres.join(', ')

        }))
            return payload
        case 'track':
        payload.data =  data.tracks.items.map((track) => ({
            name    : track.name,
            id      : track.id,
            duration: track.duration_ms,
            image   : track.album.images[0].url,
            album   : track.album.name,
            artists : track.artists.map( o => o.name).join(', ')

        }))
            return payload
        default:
            return null
    }
}

export default handleFetchedDataType