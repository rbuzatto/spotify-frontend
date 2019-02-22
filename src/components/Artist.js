import React from 'react'
import PropTypes from 'prop-types'


import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import createRequestObject from '../helpers/createRequestObj'

function fetchArtistLastAlbums(id) {

    const request = createRequestObject({ 
        qParams: {
            limit: 5,
        },
        mainRoute: 'artists',
        secondRoute: 'albums',
        id 
    })

    fetch(request)
        .then(res => res.json())
        .then(data => console.log(data))
}



const Artist = ({data}) => {
    
    const { name, image, genres, popularity } = data 

    return (
    <TableRow onClick={() => fetchArtistLastAlbums(data.id)}>
        <TableCell  component="th" scope="row"><img className='item__img' src={image} alt={`Artist ${name}`} /></TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{genres}</TableCell>
        <TableCell align="right">{popularity}</TableCell>
    </TableRow>
)}

Artist.propTypes = {
    data: PropTypes.object.isRequired
}



export default Artist