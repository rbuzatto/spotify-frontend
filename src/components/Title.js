import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const Title = ({ type, classes }) => (
    <div className={classes.wrapper}>
        <div className={classes.polygon}></div>
        <div className={classes.polygonUnder}></div>
        <span className={classes.title}>{`${type}s`}</span>
    </div>
)

Title.propTypes = {
    type: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

const styles = {
    polygon: {
        clipPath: 'polygon(0 56%, 89% 67%, 55% 3%)',
        background: '#8CBE9D',
        width: 200,
        height: 200,
        position: 'absolute',
        zIndex: 1,
    },
    polygonUnder: {
        clipPath: 'polygon(15% 13%, 42% 100%, 100% 31%)',
        background: '#759680',
        width: 200,
        height: 200,
        position: 'absolute',
        left: '40%',
        top: '0%'
    },
    wrapper: {
        position: 'relative',
        height: 200,
        width: 200,
        margin: '45px 0',
    },
    title: {
        fontSize: 42 ,
        position: 'absolute',
        zIndex: 2,
        color: '#FCF8A4',
        top: '25%',
        left: '45%',
        textTransform: 'capitalize',
        fontFamily: 'Righteous'
    }
}

export default withStyles(styles)(Title)