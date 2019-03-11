import { 
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT } from '../actions/index'


import { userLoginSignup } from '../services/userService'
import history from '../helpers/history'

export const loginUser = ({ username, password, mode }) => dispatch => {
    dispatch({ type: LOGIN_PENDING })

    return userLoginSignup(mode)(username, password)
        .then(user => {
            dispatch({ type: LOGIN_SUCCESS, payload: user })
            history.replace('/')
        })
        .catch(err => dispatch({ type: LOGIN_FAILED, payload: err }))
}

export const logoutUser = () => {
    localStorage.removeItem('user')
    return { type: LOGOUT }
}