import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import classNames  from 'classnames'

import TableCell from '@material-ui/core/TableCell'
import TableRow  from '@material-ui/core/TableRow'
import Favorite from '@material-ui/icons/Favorite'

import { withStyles } from '@material-ui/core/styles'


import {
    addFavorite,
    removeFavorite } from '../actionCreators'

// o que precisamos para fazer um modelo: config para search

const Row = props => {
    const { data, handleDetails, classes, addFav, removeFav, 
            favorite, column, type, dataOrder, components, config } = props

    const { name, image } = data

    let fetchDetails = () => {}

    if(handleDetails) {
        const query = config(data.id)
         fetchDetails = () => handleDetails(query)
    }
    
    // handleComponents verifies if a value(data[key]) is rendered wrapped inside another component (e.g. ChipCustom)
    const handleComponents = (key) => {
        if(components && components[key]) {
            const Tag = components[key]
            return <Tag attr={data[key]} />
        }
        return data[key]
    }

    return (
    <TableRow hover className={classes.row}>
        <TableCell className={classes.cell} component="th" scope="row">
            <div className={classes.firstCell}>
                <div className={classes.iconBox}>
                    <Favorite 
                        className={classNames(classes.icon, {[classes.iconFav] : favorite })}
                        onClick={favorite ? removeFav: addFav} />
                </div>
                <img 
                    className={classes.img} 
                    src={image} 
                    alt={`${type} ${name}`} 
                    onClick={fetchDetails} />
            </div>
        </TableCell>
        <TableCell className={classNames(classes.cell, classes.cellName)} align="left" onClick={fetchDetails}>{name}</TableCell>
        { dataOrder.map((prop, idx) => (
            <TableCell 
                key={idx} 
                className={classNames(classes.cell, classes.secondary, {[classes.secondaryShown] : column === idx})} 
                align="left" 
                onClick={fetchDetails}>
                    {handleComponents(prop)}
            </TableCell>
        )) 
        }
    </TableRow>
)}

Row.propTypes = {
    data         : PropTypes.object.isRequired,
    dataOrder    : PropTypes.array.isRequired,
    classes      : PropTypes.object.isRequired,
    favorite     : PropTypes.bool.isRequired,
    addFav       : PropTypes.func.isRequired,
    removeFav    : PropTypes.func.isRequired,
    column       : PropTypes.number.isRequired,
    config       : PropTypes.func,
    handleDetails: PropTypes.func,
    components   : PropTypes.object,
}

const styles = theme => ({
    row: {
        cursor: 'pointer',
        padding: '3rem'
    },
    cell: {
        fontSize: '1rem',
        padding: '3.4rem 1.6rem',
        [theme.breakpoints.down('md')]: { 
            padding: '2.4rem 1.0rem',
            fontSize: '.8rem',
            },
        [theme.breakpoints.down('xs')]: { 
        padding: '1.4rem .8rem',
        }
    },
    cellName: {
        fontWeight: 700,
        color: '#169c60'
    },
    iconBox: {
        position      : 'absolute',
        top           : 0,
        left          : 0,
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center',
        borderRadius  : '50%',
        padding       : '3px',
        background    : '#b4caaa',
        boxShadow     : '0px 2px 2px 0px #7b7b7b',
        transform     : 'translate(-50%, -50%)',
    },
    icon: {
        fill: '#e4e2e2',
        cursor: 'pointer',
        transition: 'fill .2s linear',
        [theme.breakpoints.up('mobile')]: { 
            width: '2rem',
            height: '2rem',
        },
        [theme.breakpoints.up('md')]: { 
            width: '2.4rem',
            height: '2.4rem',
        }
    },
    '@media (hover: hover)': {
        icon: {
            '&:hover': {
                fill: '#328c09'
            }
        }
    },
    iconFav: {
        fill: '#328c09'
    },
    firstCell: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    img: {
        width: '12rem',
        height: '12rem',
        [theme.breakpoints.down('md')]: { 
            width: '8rem',
            height: '8rem',
            },
        [theme.breakpoints.down('xs')]: { 
            width: '5rem',
            height: '5rem',
            }
    },
    secondary: {
        [theme.breakpoints.down('xs')] : {
            display: 'none'
        }
    },
    secondaryShown: {
        display: 'table-cell'
    },
})

const mapDispatchToProps = (dispatch, { data, type }) => ({
    addFav: () => dispatch(addFavorite({data, favType: type + 's'})),
    removeFav: () => dispatch(removeFavorite({id: data.id, favType: type + 's'}))
})
const mapStateToProps = (state, { data, type }) => ({
    favorite: !!state.favorites[type + 's'][data.id],
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
    )(Row)
