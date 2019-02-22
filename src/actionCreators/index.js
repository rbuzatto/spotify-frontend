import { 
    SEARCH_TYPE, 
    SEARCH_TEXT,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED,
    ADD_TO_FAVORITE,
    REMOVE_FROM_FAVORITE,
    CLEAR_FAVORITE
} from '../actions/index'

import { BASE_URL } from '../constants/index'

import handleFetchedDataType from '../helpers/handleFetchedDataType'
import createRequestObject from '../helpers/createRequestObj'

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

    fetch(request)
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

// const id = (d[0].id)
//         const url = new URL(`${BASE_URL}/artists/${id}/albums?limit=5`)
// const token = localStorage.getItem('token')
// const headers = new Headers({"Content-Type": "application/json", "Authorization": `Bearer ${token}`})

// const settings = {
//   method: 'GET',
//   headers
// }

// const request = new Request(url, settings)

// fetch(request)
//     .then(res => res.json())
//     .then(data => console.log(data))

// const id = (d[0].id)
//         const url = new URL(`${BASE_URL}/albums/${id}/tracks`)
// const token = localStorage.getItem('token')
// const headers = new Headers({"Content-Type": "application/json", "Authorization": `Bearer ${token}`})

// const settings = {
//   method: 'GET',
//   headers
// }

// const request = new Request(url, settings)

// fetch(request)
//     .then(res => res.json())
//     .then(data => console.log(data))
        