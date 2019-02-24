import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Chip from '@material-ui/core/Chip'

const Artist = ({data, handleDetails, classes }) => {
    
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
        <TableCell align="right">
        <Chip label={popularity} className={`${classes.chip} ${classes[`chip--${popularity}`]}`} /></TableCell>
    </TableRow>
)}

Artist.propTypes = {
    data: PropTypes.object.isRequired,
    handleDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const styles = {
    chip: {
        fontWeight: '500',
        fontSize: '10px'
    },
    'chip--hot': {
        background: 'hsl(0, 92%, 92%)',
        color: 'hsl(0, 92%, 54%)'
    },
    'chip--cool': {
        background: 'hsl(311, 92%, 92%)',
        color: 'hsl(311, 92%, 54%)'
    },
    'chip--regular': {
        background: 'hsl(222, 92%, 92%)',
        color: 'hsl(222, 92%, 54%)'
    },
    'chip--underground': {
        background: 'hsl(0, 0%, 91%)',
        color: 'hsl(0, 0%, 40%)'
    }
}

export default withStyles(styles)(Artist)