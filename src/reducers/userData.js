// import { 
//     ADD_TO_FAVORITE, 
//     REMOVE_FROM_FAVORITE,
//     CLEAR_FAVORITE } from '../actions/index'

import { 
    LOGIN_PENDING, 
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT } from '../actions/index'

// const INITIAL_STATE = { 
//     isAuth: false,
//     favTracks: [],
//     favAlbums: [],
//     favArtists: [],
// }

let user = JSON.parse(localStorage.getItem('user'))
const INITIAL_STATE = user ? { loggedIn: true, user } : {}

// const getUserData = (state = INITIAL_STATE, {type, payload = {} }) => {

//     const { data, favType, id } = payload
//     let favUpdated = favType ? [...state[favType]] : []

//     switch (type) {
//         case ADD_TO_FAVORITE:
//             favUpdated.push(data)
//             return { ...state, [favType]: favUpdated }

//         case REMOVE_FROM_FAVORITE:
//             favUpdated = favUpdated.filter( currentData => currentData.id !== id )
//             return { ...state, [favType]: favUpdated}

//         case CLEAR_FAVORITE:
//             return { ...state, [favType]: []}

//         default:
//             return state
//     }
// }

const authentication = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case LOGIN_PENDING:
            return { ...state, isPending: true }
        case LOGIN_SUCCESS:
            return { ...state, isPending: false, user: payload, loggedIn: true }
        case LOGIN_FAILED:
            return { ...state, isPending: false, error: payload, loggedIn: false }
        case LOGOUT:
            return {}
        default:
            return state
    }
}

export default authentication