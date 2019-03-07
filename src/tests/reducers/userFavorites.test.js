import { 
    ADD_TO_FAVORITE, 
    REMOVE_FROM_FAVORITE,
    CLEAR_FAVORITE } from '../../actions'

import userFavorites from '../../reducers/userFavorites'

let state

describe('test userFavorites reducer', () => {
    it('should return initial state', () => {
        const result = userFavorites(undefined, {})

        expect(result).toEqual({ 
            tracks: {},
            albums: {},
            artists: {},
         })
    })

    it('should return initial state w/ localStorage values', () => {
    })

    beforeAll(() => {
        state = { 
            tracks: {
                '101': {
                    id: '101',
                    name: 'mockTrack'
                }
            },
            albums: {
                '1234': {
                    id: '1234',
                    name: 'mockAlbum'
                }
            },
            artists: {
                '333': {
                    id: '333',
                    name: 'mockArtist'
                },
                '201': {
                    id: '201',
                    name: 'mockArtist2'
                }
            }
        }
    })

    describe('on handling ADD_TO_FAVORITE action', () => {
        it('should add new favorite to right property', () => {
            const payload = {
                data: {
                    id: '23456',
                    name: 'music_mock',
                    duration: '53645'
                },
                favType: 'albums'
            }
            const action = {  type: ADD_TO_FAVORITE, payload }
            const result = userFavorites(undefined, action)

            expect(result).toEqual({ 
                tracks: {},
                artists: {},
                albums: {
                    [payload.data.id]: payload.data
                }
             })
        })
    })

    describe('on handling REMOVE_FROM_FAVORITE action', () => {
        it('should remove certain favorite id from state', () => {
            const payload = {
                id: '201',
                favType: 'artists'
            }
            const action = { type: REMOVE_FROM_FAVORITE, payload }
            const result = userFavorites(state, action)

            expect(result).toEqual({ 
                tracks: {
                    '101': {
                        id: '101',
                        name: 'mockTrack'
                    }
                },
                albums: {
                    '1234': {
                        id: '1234',
                        name: 'mockAlbum'
                    }
                },
                artists: {
                    '333': {
                        id: '333',
                        name: 'mockArtist'
                    },
                }
            })
        })
    })

    describe('on handling CLEAR_FAVORITE action', () => {
        it('should clear given favorite dictionary', () => {
            const payload = {
                favType: 'tracks'
            }
            const action = { type: CLEAR_FAVORITE, payload }
            const result = userFavorites(state, action)

            expect(result).toEqual({
                ...state,
                tracks: {}
            })
        })
    })
})