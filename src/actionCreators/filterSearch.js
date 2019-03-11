import { 
    SEARCH_TYPE, 
    SEARCH_TEXT } from '../actions/index'

export const setSearchType = (payload) => ({
    type: SEARCH_TYPE, 
    payload
})

export const setSearchField = (payload) => ({
    type: SEARCH_TEXT,
    payload
})