import * as actionCreators from 'actionCreators/'
import * as actions from 'actions/'

describe('action creators for filterSearch reducers', function () {
    it('setSearchType should return right action and payload', () => {
        const payload = 'artist'
        const action = actionCreators.setSearchType(payload)

        expect(action).toEqual({
            type: actions.SEARCH_TYPE,
            payload
        })
    })

    it('setSearchField should return right action and payload', () => {
        const payload = 'phoebe'
        const action = actionCreators.setSearchField(payload)

        expect(action).toEqual({
            type: actions.SEARCH_TEXT,
            payload
        })
    })
    
})