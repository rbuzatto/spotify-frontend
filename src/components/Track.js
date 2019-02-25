import React       from 'react'
import PropTypes   from 'prop-types'
import convertTime from '../helpers/convertTime'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const Track = ({data}) => {

    const { name, duration, album, artists } = data
    
    return (
        <TableRow hover>
            <TableCell component="th" scope="row">{name}</TableCell>
            <TableCell align="right">{convertTime(duration)}</TableCell>
            <TableCell align="right">{album}</TableCell>
            <TableCell align="right">{artists}</TableCell>
        </TableRow>
)}

Track.propTypes = {
    data: PropTypes.object.isRequired
}

export default Track
