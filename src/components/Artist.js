import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import TableCell from '@material-ui/core/TableCell'
import TableRow  from '@material-ui/core/TableRow'
import Favorite from '@material-ui/icons/Favorite'
import Chip      from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

import {
    addFavorite,
    removeFavorite } from '../actionCreators'

const Artist = ({data, handleDetails, classes, addFav,removeFav , favorite }) => {
    
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
    <TableRow hover className={classes.row}>
        <TableCell  component="th" scope="row">
        <div className={classes.firstCell}>
            <Favorite className={`${classes.icon} ${favorite ? classes.iconFav : ''}`} onClick={favorite ? removeFav: addFav} />
            <img className={classes.img} src={image} alt={`Artist ${name}`} onClick={() => handleDetails(config)} />
        </div>
        </TableCell>
        <TableCell align="right" onClick={() => handleDetails(config)}>{name}</TableCell>
        <TableCell align="right" onClick={() => handleDetails(config)}>{genres}</TableCell>
        <TableCell align="right">
        <Chip label={popularity} className={`${classes.chip} ${classes[`chip--${popularity}`]}`} /></TableCell>
    </TableRow>
)}

Artist.propTypes = {
    data: PropTypes.object.isRequired,
    handleDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    favorite: PropTypes.bool.isRequired,
    addFav: PropTypes.func.isRequired,
    removeFav: PropTypes.func.isRequired,
}

const styles = {
    row: {
        cursor: 'pointer'
    },
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
    },
    icon: {
        fill: '#e4e2e2',
        cursor: 'pointer',
        marginRight: '.6rem',
        transition: 'fill .2s linear',
    },
    '@media (hover: hover)': {
        icon: {
            '&:hover': {
                fill: '#328c09'
            }
        }
    }
    ,
    iconFav: {
        fill: '#328c09'
    },
    firstCell: {
        display: 'flex',
        alignItems: 'center'
    },
    img: {
        width: '5rem',
        height: '5rem'
    }
}

const mapDispatchToProps = (dispatch, { data }) => ({
    addFav: () => dispatch(addFavorite({data, favType: 'artists'})),
    removeFav: () => dispatch(removeFavorite({id: data.id, favType: 'artists'}))
})

const mapStateToProps = (state, { data }) => ({
    favorite: !!state.favorites.artists[data.id]
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
    )(Artist)
