import { 
    ADD_TO_FAVORITE, 
    REMOVE_FROM_FAVORITE,
    CLEAR_FAVORITE } from '../actions/index'

const INITIAL_STATE = { 
    token: null,
    favTracks: [],
    favAlbums: [],
    favArtists: [],
}

const getUserData = (state = INITIAL_STATE, {type, payload = {} }) => {

    const { data, favType, id } = payload
    let favUpdated = favType ? [...state[favType]] : []

    switch (type) {
        case ADD_TO_FAVORITE:
            favUpdated.push(data)
            return { ...state, [favType]: favUpdated }

        case REMOVE_FROM_FAVORITE:
            favUpdated = favUpdated.filter( currentData => currentData.id !== id )
            return { ...state, [favType]: favUpdated}

        case CLEAR_FAVORITE:
            return { ...state, [favType]: []}

        default:
            return state
    }
}

export default getUserData