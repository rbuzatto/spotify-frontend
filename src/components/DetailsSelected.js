import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem       from '@material-ui/core/ListItem'
import ListItemText   from '@material-ui/core/ListItemText'
import ListSubheader  from '@material-ui/core/ListSubheader'
import Paper          from '@material-ui/core/Paper'
import IconButton     from '@material-ui/core/IconButton'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import { withStyles } from '@material-ui/core/styles'

import convertTime from '../helpers/convertTime' 
import fixLength from '../helpers/fixLength' 

const convertDate = (date) => date.split('-').reverse().join('/')

const DetailsSelected = ({details, type, classes, clearDetails}) => {

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
        
        return details.items ? 
            (details.items.map(data => (
                    <ListItem  
                        dense divider 
                        key={data.id}
                        className={classes.li}>
                        <ListItemText
                        primary={types[type].primary(data)}
                        secondary={types[type].secondary(data)}
                        /> 
                    </ListItem>
                )))
                : (<ListItem  
                    dense divider
                    className={classes.li}>
                    <ListItemText
                    primary={'No Data Found'}
                    /> 
                </ListItem>)
    }

    return (
        <Paper className={classes.paper}>
            <List dense
                className={classes.list}
                subheader={
                    <ListSubheader className={classes.listHeader}>{type === 'artist' ? 'Albums': 'Tracks'}
                        <IconButton  color="inherit" aria-label="Menu" onClick={clearDetails}>
                            <ArrowBackIos className={classes.iconBack} />
                        </IconButton>
                    </ListSubheader>
                }
            >
                {handleType()}
            </List>
        </Paper>
    )
}

DetailsSelected.propTypes = {
    details: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    clearDetails: PropTypes.func.isRequired,
}

const styles = () => ({
    list: {
    },
    paper: {
        margin: '8rem auto',
        width: '60%',
        background: '#f1f1f1'
    },
    li: {
        '&:last-child': {
            border: 'none'
        }
    },
    listHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconBack: {
        width: '16px',
        height: '16px',
        cursor: 'pointer',
        transition: 'fill .2s linear',
    }
})

export default withStyles(styles)(DetailsSelected)