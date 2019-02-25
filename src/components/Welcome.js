import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const Welcome = ({classes}) => (
    <div className={classes.landing}>
        <h1 className={classes.heading}>Tune
        <span className={classes.headingTwo}>In</span>
        </h1>
    </div>
)

Welcome.propTypes = {
    classes: PropTypes.object.isRequired
}

const styles = ({palette, breakpoints}) =>({
    landing: {
        backgroundImage: " linear-gradient(rgba(106, 232, 174, 0.59), rgba(220, 255, 213, 0.93)), url(./img/landing.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: '50% 00%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        maxWidth: '100%',
        '&:after': {
            content: '',
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'black',
            zIndex: 1
        }
    },
    heading: {
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        fontSize: '6.5rem',
        color: palette.primary.main,
        [breakpoints.up('mobile')]: {
            fontSize: '8rem'
        }
    },
    headingTwo : {
        color: palette.secondary.main
    }
})

export default withStyles(styles)(Welcome)