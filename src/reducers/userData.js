import { 
    LOGIN_PENDING, 
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT } from '../actions/index'


let user = JSON.parse(localStorage.getItem('user'))
const INITIAL_STATE = user ? { loggedIn: true, user } : {}


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