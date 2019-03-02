import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux' 
import { compose }          from 'redux'
import { Redirect }         from "react-router-dom"
  
import { withStyles } from '@material-ui/core/styles'

import Form            from '../components/Form'
import TableItems      from '../components/TableItems'
import DetailsSelected from '../components/DetailsSelected'

import { setSearchField } from '../actionCreators/index'
import { types } from '../constants'
import createRequestObject from '../helpers/createRequestObject'

class DisplayData extends Component {

    state = {
        id: null,
        details: null,
        selected: false
    }

    fetchDetails = (config) => {
        if(config.id === this.state.id) { return }

        const detailsIds = JSON.parse(localStorage.getItem('detailsIds')) || {}

        // if item is in local storage return it
        if(detailsIds[config.id]) {
            return this.setState(() => ({id: config.id, details : detailsIds[config.id], selected: true}))
        }

        // fetch requested id
        const request = createRequestObject(config)
        fetch(request)
            .then(res => res.json())
            .then(data => {
                detailsIds[config.id] = data
                localStorage.setItem('detailsIds', JSON.stringify(detailsIds))
                this.setState(() => ({id: config.id, details : data, selected: true}))
            })
    }

    clearDetails = () => {
        this.setState(() => ({ details: null, id: null, selected: false }))
    }

    componentDidUpdate(prevProps) {
        if(this.state.details && prevProps.match.params.type !== this.props.match.params.type) {
            this.setState(() => ({ details: null, id: null, selected: false }))
        }

    }

    renderResults = () => {
        return this.props.data.length ? <TableItems handleDetails={this.fetchDetails} type={this.props.type}/> : <div className={this.props.classes.nomatch}>Sorry, No Matches Found</div>
    }

    render() {
        const { type } = this.props.match.params
        const { classes } = this.props
        if (!types.includes(type)) {
            return  <Redirect to='/' />
        }

        // if below is false, route's changed and fetched results should not be displayed
        const routeEqualsFetched = type === this.props.type

        return (
            <div className={classes.container}>
                <Form type={type} />
                { this.props.data && !this.state.selected && routeEqualsFetched && this.renderResults()  }
                { this.state.id && <DetailsSelected clearDetails={this.clearDetails} details={this.state.details} type={this.props.type} /> }
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
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        background: '#fff',
        padding: '0 2rem',
        flexGrow: '1',
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
    },
    nomatch: {
        fontStyle: 'italic',
        marginTop: '1rem'
    }
})

export default compose( 
    withStyles(styles),
    (connect(mapStateToProps, mapDispatchToProps))
    )(DisplayData)