import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import * as actionCreators from 'actionCreators/'
import * as actions from 'actions/'
import * as userService from 'services/userService'

fetchMock.config.overwriteRoutes = true

jest.mock('services/userService')


describe('action creators for userData reducers', function () {
    const middlewares = [thunk]
    const mockStore = configureStore(middlewares)

    const url = 'http://server/loginUser'
        
    const query = {
        username: 'agent_smith',
        password: 'matrix1234',
        mode: 'login'
    }

    let store, action

    // userLoginSignup ies expected to return another function
    const innerFunction = jest.fn(() => fetch(url).then(res => res.json()))

    userService.userLoginSignup = jest.fn(() => innerFunction)

    beforeEach(() => {
        store = mockStore({})
        action = actionCreators.loginUser(query)
    })


    it('should login user', () => {
        

        // user response mock
        const user = { username: 'agent_smith', token: '424fs242fds' }

        fetchMock.mock(url, { status: 200, body: user })

        return store.dispatch(action)
            .then(() => {
                const actions = store.getActions()

                expect(actions[0]).toEqual({ type: 'LOGIN_PENDING' })
                expect(actions[1]).toEqual({ type: 'LOGIN_SUCCESS', payload: user})

                expect(userService.userLoginSignup).toBeCalledWith('login')
                expect(innerFunction).toBeCalledWith('agent_smith','matrix1234')

            })

    })

    it('should fail login user', () => {

        fetchMock.mock(url, { throws: 'failed' })

        return store.dispatch(action)
            .then(() => {
                const actions = store.getActions()

                expect(actions[0]).toEqual({ type: 'LOGIN_PENDING' })
                expect(actions[1]).toEqual({ type: 'LOGIN_FAILED', payload: 'failed'})

                expect(userService.userLoginSignup).toBeCalledWith('login')
                expect(innerFunction).toBeCalledWith('agent_smith','matrix1234')

            })

    })
    
})

it('action for logout user', () => {
    const action = actionCreators.logoutUser()

    expect(action).toEqual({ type: actions.LOGOUT})
})