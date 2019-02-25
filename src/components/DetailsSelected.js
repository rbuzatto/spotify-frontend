import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem       from '@material-ui/core/ListItem'
import ListItemText   from '@material-ui/core/ListItemText'
import ListSubheader  from '@material-ui/core/ListSubheader'
import Paper          from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import convertTime from '../helpers/convertTime' 
import fixLength from '../helpers/fixLength' 

const convertDate = (date) => date.split('-').reverse().join('/')

const DetailsSelected = ({details, type, classes, component: Component}) => {

    const handleType = () => {

        const types = {
            artist: {
                primary: ({name}) => fixLength(name),
                secondary: ({release_date}) =>convertDate(release_date),
            },
            album: {
                primary: ({name}) => name,
                secondary: ({duration_ms}) => convertTime(duration_ms),
            }
        }
        return details.items.map(data => (
                <ListItem  
                    dense divider 
                    key={data.id}
                    className={classes.li}>
                    <ListItemText
                    primary={types[type].primary(data)}
                    secondary={types[type].secondary(data)}
                    /> 
                </ListItem>
            ))
    }

    return (
        <Paper className={classes.paper}>
            <List dense
                className={classes.list}
                subheader={<ListSubheader>{type === 'artist' ? 'Albums': 'Tracks'}</ListSubheader>}
            >
                {handleType()}
            </List>
        </Paper>
    )
}

DetailsSelected.propTypes = {
    details: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
}

const styles = () => ({
    list: {
    },
    paper: {
        marginTop: '3rem',
        width: '60%',
        background: '#f1f1f1'
    },
    li: {
        '&:last-child': {
            border: 'none'
        }
    }
})

export default withStyles(styles)(DetailsSelected)