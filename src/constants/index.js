const types = ['artist', 'track', 'album']
Object.freeze(types)

export { types }

export const BASE_URL = 'https://api.spotify.com/v1'

export const SERVER_URL = process.env.NODE_ENV === 'production' ?  'https://boiling-hollows-73946.herokuapp.com' : 'http://localhost:3001'