import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

import convertTime from '../helpers/convertTime' 

const convertDate = (date) => date.split('-').reverse().join('/')

const DetailsSelected = ({details, type, classes}) => {

    const fixLength = (str, len = 50) => str.length > len ? str.slice(0,len) + ' ...' : str

    const handleType = () => {
        if (type === 'artist') {
            return details.items.map(data => (
                <ListItem dense divider key={data.id}
                
                className={classes.li}>
                    <ListItemText
                    primary={fixLength(data.name)}
                    secondary={convertDate(data.release_date)}
                    /> 
              </ListItem>
              ))
        } else if(type === 'album') {
            return details.items.map(data => (
                <ListItem dense divider key={data.id}
                    className={classes.li}
                >
                    <ListItemText
                    primary={data.name}
                    secondary={convertTime(data.duration_ms)}
                    /> 
              </ListItem>
              ))
        }
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
    type: PropTypes.string.isRequired
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