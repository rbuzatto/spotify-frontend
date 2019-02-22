import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const Album = ({data}) => {
    const { image, name, artist, availability } = data
    return (
    <TableRow>
        <TableCell  component="th" scope="row">
            <img className='item__img' src={image} alt={`Cover Album for ${name}`} />
        </TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{artist}</TableCell>
        <TableCell align="right">{availability ? 'Yes' : 'No'}</TableCell>
    </TableRow>
    )
}

Album.propTypes = {
    data: PropTypes.object.isRequired
}

export default Album