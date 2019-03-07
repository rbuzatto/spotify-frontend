import { 
    ADD_TO_FAVORITE, 
    REMOVE_FROM_FAVORITE,
    CLEAR_FAVORITE } from '../actions/index'

let userFav = JSON.parse(localStorage.getItem('userFav'))

const INITIAL_STATE = userFav ? { userFav } : { 
    tracks: {},
    albums: {},
    artists: {},
}

const userFavorites = (state = INITIAL_STATE, {type, payload = {} }) => {

    const { data, favType, id} = payload
    let favUpdated = favType ? {...state[favType]} : {}

    switch (type) {
        case ADD_TO_FAVORITE:
            favUpdated[data.id] = data
            return { ...state, [favType]: favUpdated }

        case REMOVE_FROM_FAVORITE:
            delete favUpdated[id]
            return { ...state, [favType]: favUpdated}

        case CLEAR_FAVORITE:
            return { ...state, [favType]: {}}

        default:
            return state
    }
}


export default userFavorites