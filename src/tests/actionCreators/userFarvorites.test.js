import * as actionCreators from 'actionCreators/'
import * as actions from 'actions/'

describe('action creators for userFavorites reducers:', function () {

    it('should create a favorite object', () => {
        const payload = {
            favType: 'artists',
            data: {
                id: '625235325',
                name: 'beatles',
            }
        }
        const action = actionCreators.addFavorite(payload)

        expect(action).toEqual({
            type: actions.ADD_TO_FAVORITE,
            payload
        })
    })
    
    it('should create an object with id and favtype and proper type', () => {
        const payload = {
            favType: 'albums',
            id: '76254'
        }
        const action = actionCreators.removeFavorite(payload)

        expect(action).toEqual({
            type: actions.REMOVE_FROM_FAVORITE,
            payload
        })
    })

    it('should create an object witha favtype and proper type', () => {
        const payload = {
            favType: 'tracks',
        }
        const action = actionCreators.clearFavorite(payload)

        expect(action).toEqual({
            type: actions.CLEAR_FAVORITE,
            payload
        })
    })
})