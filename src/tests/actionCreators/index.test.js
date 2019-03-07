import * as actionCreators from '../../actionCreators/'
import * as actions from '../../actions/'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as createRequestObject from '../../helpers/createRequestObject'
import * as handleFetchedDataType from '../../helpers/handleFetchedDataType'

describe('test action creators', () => {

    describe('for filterSearch reducers:', function () {
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

    describe('for getData reducers:', function () {
        const middlewares = [thunk]
        const mockStore = configureStore(middlewares)

        it('getData should return right action and payload', () => {
            const store = mockStore({})

            const url = 'https://spotify.com/artists/?q=buffay'

            // fake response from api
            const mockDataFound = {
                data : [
                    {
                        name: 'buffay',
                        id: '52785275',
                        image: 'http://www.phoebepics.com',
                        popularity: 'hot',
                        genres: 'country, pop, soul'
                    },
                    {
                        name: 'buffette',
                        id: '42423',
                        image: 'http://www.buffetepics.com',
                        popularity: 'regular',
                        genres: 'country'
                    },
                ]
            }

            // payload referring to success
            const payloadOnSuccess = {
                type: 'artist',
                ...mockDataFound
            }

            // createRequestObject passes the request object to fetch
            createRequestObject.default = jest.fn(() => url)
            // handleFetchedDataType handles the res.json() to extract data
            handleFetchedDataType.default = jest.fn(() => payloadOnSuccess)

            const query = {
                query: 'buffay in concert',
                type: 'album'
            }

            const action = actionCreators.getData(query)

            fetchMock.mock(url, { status: 200, body: { token: '424' }})

            return store.dispatch(action)
                .then(() => {
                    const actions = store.getActions()
                    expect(actions[0]).toEqual({ type: 'REQUEST_PENDING' })
                    expect(actions[1]).toEqual({ type: 'REQUEST_SUCCESS', payload: payloadOnSuccess})

                    expect(createRequestObject.default).toBeCalledWith({
                        qParams: {
                            q : query.query,
                            type: query.type
                        }
                    })
                    expect(handleFetchedDataType.default).toBeCalled()
                })
        })

        it('getData should return right action and payload', () => {
            const store = mockStore({})

            const url = 'https://spotify.com/artists/?q=buffay+in+concert'

            // createRequestObject passes the request object to fetch
            createRequestObject.default = jest.fn(() => url)

            const query = {
                query: 'buffay in concert',
                type: 'album'
            }

            const action = actionCreators.getData(query)

            fetchMock.mock(url, { throws: 'failed'})

            return store.dispatch(action)
                .then(() => {
                    const actions = store.getActions()
                    expect(actions[0]).toEqual({ type: 'REQUEST_PENDING' })
                    expect(actions[1]).toEqual({ type: 'REQUEST_FAILED', payload: 'failed'})

                    expect(createRequestObject.default).toBeCalledWith({
                        qParams: {
                            q : query.query,
                            type: query.type
                        }
                    })
                    expect(handleFetchedDataType.default).toBeCalled()
                })
        })
        
    })

    describe('for userFavorites reducers:', function () {

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
})