import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actionCreators from 'actionCreators/'
import * as createRequestObject from 'helpers/createRequestObject'
import * as handleFetchedDataType from 'helpers/handleFetchedDataType'

describe('action creators for getData reducers:', function () {
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