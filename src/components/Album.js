import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import TableCell      from '@material-ui/core/TableCell'
import TableRow       from '@material-ui/core/TableRow'
import Favorite from '@material-ui/icons/Favorite'
import { withStyles } from '@material-ui/core/styles'

import {
    addFavorite,
    removeFavorite } from '../actionCreators'

const Album = ({data, handleDetails, classes, addFav,removeFav, favorite}) => {
    const { image, name, artist, availability } = data

    const config = {
        id: data.id,
        mainRoute: 'albums',
        secondRoute: 'tracks',
    }

    return (
    <TableRow hover >
        <TableCell  component="th" scope="row">
            <div className={classes.firstCell}>
                <Favorite className={`${classes.icon} ${favorite ? classes.iconFav : ''}`} onClick={favorite ? removeFav: addFav} />
                <img className='item__img' src={image} alt={`Cover Album for ${name}`} />
            </div>
        </TableCell>
        <TableCell align="right" onClick={() => handleDetails(config)}>{name}</TableCell>
        <TableCell align="right">{artist}</TableCell>
        <TableCell align="right">{availability ? 'Yes' : 'No'}</TableCell>
    </TableRow>
    )
}

Album.propTypes = {
    data: PropTypes.object.isRequired,
    handleDetails: PropTypes.func.isRequired,
    addFav: PropTypes.func.isRequired,
    removeFav: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    favorite: PropTypes.bool.isRequired
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
    addFav: () => dispatch(addFavorite({data, favType: 'albums'})),
    removeFav: () => dispatch(removeFavorite({id: data.id, favType: 'albums'}))
})

const mapStateToProps = (state, { data }) => ({
    favorite: !!state.favorites.albums[data.id]
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
    )(Album)