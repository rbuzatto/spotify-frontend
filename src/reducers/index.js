import { combineReducers } from 'redux'


import filterSearch from './filterSearch'
import getData from './getData'
import getUserData from './userData'

const rootReducer = combineReducers({
    filter: filterSearch,
    data: getData,
    user: getUserData
})


export default rootReducer