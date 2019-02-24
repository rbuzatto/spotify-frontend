import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import {logoutUser} from '../actionCreators'

const Logout = ({logout}) => {
    logout()
    return <Route render={props => (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />

}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser())
})

export default connect(null, mapDispatchToProps)(Logout)