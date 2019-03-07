import { 
    REQUEST_PENDING,
    REQUEST_SUCCESS,
    REQUEST_FAILED } from '../../actions'

import getData from '../../reducers/getData'

describe('test getData reducer', () => {
    it('should return initial state', () => {
        const result = getData(undefined, {})

        expect(result).toEqual({ 
            type: null,
            data: null,
            isPending: false,
            error: null
         })
    })

    describe('on handling REQUEST_PENDING action', () => {
        it('should return new state, where isPending is true', () => {
            const action = { type: REQUEST_PENDING, payload: {} }
            const result = getData(undefined, action)

            expect(result).toEqual({ 
                type: null,
                data: null,
                isPending: true,
                error: null
             })
        })
    })

    describe('on handling REQUEST_SUCCESS action', () => {
        it('should return state with data payload', () => {
            const payload = {
                data: { id: 42340, name: 'phoebe' },
                type: 'artist'
            }
            const action = { type: REQUEST_SUCCESS, payload }
            const result = getData(undefined, action)

            expect(result).toEqual({ 
                ...payload,
                isPending: false,
                error: null
            })
        })
    })

    describe('on handling REQUEST_FAILED action', () => {
        it('should return state with error', () => {
            const payload = {
                error: 'error'
            }
            const action = { type: REQUEST_FAILED, payload }
            const result = getData(undefined, action)

            expect(result).toEqual({ 
                error: payload,
                isPending: false,
                type: null,
                data: null
            })
        })
    })
})