import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ItemDisplay from './ItemDisplay'


const ListItems = ({data, type}) => (
   <Fragment>
        { data.slice(0, 8).map(o => <ItemDisplay key={o.id} data={o} type={type} />) }
   </Fragment>

)

ListItems.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    data: state.data.data,
    type: state.data.type
})


export default connect(mapStateToProps, null)(ListItems)