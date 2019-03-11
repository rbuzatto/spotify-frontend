import {
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED } from '../actions/index'

import createRequestObject from '../helpers/createRequestObject'
import handleFetchedDataType from '../helpers/handleFetchedDataType'

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