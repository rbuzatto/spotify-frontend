import React from 'react'
import classNames  from 'classnames'
import Chip      from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const ChipCustom = ({ classes, attr }) => (
    <Chip label={attr} className={classNames(classes.chip, classes[`chip--${attr}`] )} />
    )

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

export default withStyles(styles)(ChipCustom)