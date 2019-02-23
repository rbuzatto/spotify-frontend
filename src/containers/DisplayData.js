import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom"

import Form       from '../components/Form'
import TableItems from '../components/TableItems'
import DetailsSelected from '../components/DetailsSelected'

import { types } from '../constants'
import createRequestObject from '../helpers/createRequestObject'
class DisplayData extends Component {

    state = {
        id: null,
        details: null
    }

    fetchDetails = (config) => {
        if(config.id === this.state.id) { return }

        const request = createRequestObject(config)
        fetch(request)
            .then(res => res.json())
            .then(data => {this.setState(() => ({id: config.id, details : data }))})
    }

    componentDidUpdate(prevProps) {
        if(this.state.details && prevProps.type !== this.props.type) {
            this.setState(() => ({ details: null, id: null }))
        }

    }

    render() {
        const { type } = this.props.match.params
        if (!types.includes(type)) {
            return  <Redirect to='/' />
        }

        return (
            <div>
                <Form />
                { this.props.data && <TableItems handleDetails={this.fetchDetails} /> }
                { this.state.id && <DetailsSelected details={this.state.details} type={this.props.type} /> }
            </div>
        )
    }
}

DisplayData.propTypes = {
    data : PropTypes.array,
    type: PropTypes.string
}

const mapStateToProps = state => ({
    data : state.data.data,
    type: state.data.type
  })

export default  connect(mapStateToProps, null)(DisplayData)