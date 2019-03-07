import { 
    SEARCH_TYPE, 
    SEARCH_TEXT,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
    ADD_TO_FAVORITE,
    REMOVE_FROM_FAVORITE,
    CLEAR_FAVORITE,
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT } from '../actions/index'

import { userLoginSignup } from '../services/userService'
import history from '../helpers/history'

import handleFetchedDataType from '../helpers/handleFetchedDataType'
import createRequestObject from '../helpers/createRequestObject'

export const setSearchType = (payload) => ({
    type: SEARCH_TYPE, 
    payload
})

export const setSearchField = (payload) => ({
    type: SEARCH_TEXT,
    payload
})

export const getData = ({query, type}) => dispatch => {
    dispatch({ type: REQUEST_PENDING })

    const request = createRequestObject({
        qParams: {
            q : query,
            type
        }
    })

    return fetch(request)
        .then(res => res.json())
        .then(data => dispatch({ type: REQUEST_SUCCESS, payload: handleFetchedDataType(data, type)}))
        .catch(err => dispatch({ type: REQUEST_FAILED, payload : err}))
}

export const addFavorite = ({ data, favType }) => ({
    type: ADD_TO_FAVORITE,
    payload: { data, favType }
})

export const removeFavorite = ({ id, favType }) => ({
    type: REMOVE_FROM_FAVORITE,
    payload: { id, favType }
})

export const clearFavorite = ({ favType }) => ({
    type: CLEAR_FAVORITE,
    payload: { favType }
})

export const loginUser = ({ username, password, mode }) => dispatch => {
    dispatch({ type: LOGIN_PENDING })

    userLoginSignup(mode)(username, password)
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