import { 
    LOGIN_PENDING, 
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT } from 'actions/index'

import authentication from 'reducers/userData'

const user = {
    id: '42435',
    token: 'fasf3j52850qjhfasf',
    username: 'john'
}

describe('test authentication reducer', () => {
    it('should return initial state', () => {
        const result = authentication(undefined, {})

        expect(result).toEqual({})
    })

    describe('on handling LOGIN_PENDING action', () => {
        it('should return new state, where isPending is true', () => {
            const action = { type: LOGIN_PENDING, payload: {} }
            const result = authentication(undefined, action)

            expect(result).toEqual({
                isPending: true,
                })
        })
    })

    describe('on handling LOGIN_SUCCESS action', () => {
        it('should return state with user authenticated', () => {
            const payload = user
            const action = { type: LOGIN_SUCCESS, payload }
            const result = authentication(undefined, action)

            expect(result).toEqual({ 
                user: payload,
                isPending: false,
                loggedIn: true
            })
        })
    })

    describe('on handling LOGIN_FAILED action', () => {
        it('should return state with error', () => {
            const payload = {
                error: 'error'
            }
            const action = { type: LOGIN_FAILED, payload }
            const result = authentication(undefined, action)

            expect(result).toEqual({ 
                error: payload,
                isPending: false,
                loggedIn: false,
            })
        })
    })

    describe('on handling LOGOUT action', () => {
        it('should clear state', () => {
            const action = { type: LOGOUT }
            const result = authentication({ loggedIn: true, user }, action)

            expect(result).toEqual({})
        })
    })
})