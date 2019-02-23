import React from 'react'
import PropTypes from 'prop-types'


import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import convertTime from '../helpers/convertTime' 

const convertDate = (date) => date.split('-').reverse().join('/')

const DetailsSelected = ({details, type}) => {

    const fixLength = (str, len = 50) => str.length > len ? str.slice(0,len) + ' ...' : str

    const handleType = () => {
        if (type === 'artist') {
            return details.items.map(data => (
                <ListItem key={data.id}>
                    <ListItemText
                    primary={fixLength(data.name)}
                    secondary={convertDate(data.release_date)}
                    /> 
              </ListItem>
              ))
        } else if(type === 'album') {
            return details.items.map(data => (
                <ListItem key={data.id}>
                    <ListItemText
                    primary={data.name}
                    secondary={convertTime(data.duration_ms)}
                    /> 
              </ListItem>
              ))
        }
    }

    return (
        <List dense={true}
            subheader={<ListSubheader>{type === 'artist' ? 'Albums': 'Tracks'}</ListSubheader>}
        >
            {handleType()}
        </List>
    )
}

DetailsSelected.propTypes = {
    details: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}

export default DetailsSelected