import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Redirect } from "react-router-dom"

  
import { withStyles } from '@material-ui/core/styles'

import Form       from '../components/Form'
import TableItems from '../components/TableItems'
import DetailsSelected from '../components/DetailsSelected'
import { setSearchField } from '../actionCreators/index'

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

    renderResults = () => {
        return this.props.data.length ? <TableItems handleDetails={this.fetchDetails} type={this.props.type}/> : <div>Sorry, No Matches Found</div>
    }

    render() {
        const { type } = this.props.match.params
        const { classes } = this.props

        if (!types.includes(type)) {
            return  <Redirect to='/' />
        }

        // this.props.handleSeachField(type)

        return (
            <div className={classes.container}>
                <Form type={type} />
                { this.props.data && this.renderResults()  }
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

  const mapDispatchToProps = (dispatch, ownProps) => ({
    handleSeachField: type => dispatch(setSearchField(type)),
})

const styles = theme => ({
    container: {
        width: '80%',
        maxWidth: '1080px',
        margin: '0 auto'
    }
})

export default  withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DisplayData))