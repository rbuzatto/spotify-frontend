import { SEARCH_TYPE, SEARCH_TEXT } from '../actions/index'
import { types } from '../constants/index'

const INITIAL_STATE = { name: '', type: 'artist' }

const filterSearch = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case SEARCH_TYPE:
            if(!types.includes(payload)) {
                return state
            }
            return { ...state, type: payload }
        case SEARCH_TEXT:
            return { ...state, name: payload }
        default:
            return state
    }
}

export default filterSearch