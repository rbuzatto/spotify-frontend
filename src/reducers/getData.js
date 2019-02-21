import { 
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED } from '../actions/index'

const INITIAL_STATE = { 
    type: null, 
    data: null, 
    isPending: false, 
    error: null 
}


const getData = (state = INITIAL_STATE, {type, payload}) => {

    switch (type) {
        case REQUEST_PENDING:
            return { ...state, isPending: true }
        case REQUEST_SUCCESS:
            return { ...state, data: payload.data, type: payload.type, isPending: false }
        case REQUEST_FAILED:
            return { ...state, error: payload, isPending: false }
        default:
            return state
    }
}

export default getData