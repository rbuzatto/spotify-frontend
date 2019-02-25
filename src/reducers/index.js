import { combineReducers } from 'redux'


import filterSearch from './filterSearch'
import getData from './getData'
import getUserData from './userData'
import userFavorites from './userFavorites'

const rootReducer = combineReducers({
    filter: filterSearch,
    data: getData,
    user: getUserData,
    favorites: userFavorites
})


export default rootReducer