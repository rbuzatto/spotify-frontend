import { SEARCH_TYPE, SEARCH_TEXT } from '../../actions/index'

import filterSearch from '../../reducers/filterSearch'

describe('test filterSearch reducer', () => {
    it('should return initial state', () => {
        const result = filterSearch(undefined, {})

        expect(result).toEqual({ 
            name: '',
            type: 'artist'
         })
    })

    describe('on handling SEARCH_TYPE action', () => {
        it('should return new state, where type matches payload', () => {
            const action = { type: SEARCH_TYPE, payload: 'track' }
            const result = filterSearch(undefined, action)

            expect(result).toEqual({ 
                name: '',
                type: 'track'
            })
        })

        it('should return same state w/ wrong payload', () => {
            const action = { type: SEARCH_TYPE, payload: 'dance' }
            const result = filterSearch(undefined, action)

            expect(result).toEqual({ 
                name: '',
                type: 'artist'
            })
        })
    })

    describe('on handling SEARCH_TEXT action', () => {
        it('should return new state, where name matches payload', () => {
            const action = { type: SEARCH_TEXT, payload: 'buffay' }
            const result = filterSearch(undefined, action)

            expect(result).toEqual({ 
                name: 'buffay',
                type: 'artist'
            })
        })
    })
})