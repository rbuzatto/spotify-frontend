import React from 'react'
import PropTypes from 'prop-types'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const Album = ({data, handleDetails}) => {
    const { image, name, artist, availability } = data

    const config = {
        id: data.id,
        mainRoute: 'albums',
        secondRoute: 'tracks',
    }

    return (
    <TableRow hover onClick={() => handleDetails(config)}>
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
    data: PropTypes.object.isRequired,
    handleDetails: PropTypes.func.isRequired
}

export default Album