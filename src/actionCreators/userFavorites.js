import { 
    ADD_TO_FAVORITE,
    REMOVE_FROM_FAVORITE,
    CLEAR_FAVORITE } from '../actions/index'

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