import React       from 'react'
import PropTypes   from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Favorite from '@material-ui/icons/Favorite'
import { withStyles } from '@material-ui/core/styles'

import convertTime from '../helpers/convertTime'

import {
    addFavorite,
    removeFavorite } from '../actionCreators'

const Track = ({data, classes, favorite, removeFav, addFav}) => {

    const { name, duration, album, artists } = data
    
    return (
        <TableRow hover>
            <TableCell component="th" scope="row">
            <div className={classes.firstCell}>
                <Favorite className={`${classes.icon} ${favorite ? classes.iconFav : ''}`} onClick={favorite ? removeFav: addFav} />
                {name}     
            </div>
            </TableCell>
            <TableCell align="right">{convertTime(duration)}</TableCell>
            <TableCell align="right">{album}</TableCell>
            <TableCell align="right">{artists}</TableCell>
        </TableRow>
)}

Track.propTypes = {
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    favorite: PropTypes.bool.isRequired,
    addFav: PropTypes.func.isRequired,
    removeFav: PropTypes.func.isRequired,
}

const styles = ({
    icon: {
        fill: '#e4e2e2',
        cursor: 'pointer',
        marginRight: '.6rem',
        transition: 'fill .2s linear',
        '&:hover': {
            fill: '#328c09'
        }
    },
    iconFav: {
        fill: '#328c09'
    },
    firstCell: {
        display: 'flex',
        alignItems: 'center'
    }
})

const mapDispatchToProps = (dispatch, { data }) => ({
    addFav: () => dispatch(addFavorite({data, favType: 'tracks'})),
    removeFav: () => dispatch(removeFavorite({id: data.id, favType: 'tracks'}))
})

const mapStateToProps = (state, { data }) => ({
    favorite: !!state.favorites.tracks[data.id]
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
    )(Track)
