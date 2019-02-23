import React from 'react'
import PropTypes from 'prop-types'


import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const Artist = ({data, handleDetails }) => {
    
    const { name, image, genres, popularity } = data

    const config = {
        id: data.id,
        qParams: {
            limit: 5,
        },
        mainRoute: 'artists',
        secondRoute: 'albums',
    }

    return (
    <TableRow hover onClick={() => handleDetails(config)}>
        <TableCell  component="th" scope="row"><img className='item__img' src={image} alt={`Artist ${name}`} /></TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{genres}</TableCell>
        <TableCell align="right">{popularity}</TableCell>
    </TableRow>
)}

Artist.propTypes = {
    data: PropTypes.object.isRequired,
    handleDetails: PropTypes.func.isRequired
}



export default Artist