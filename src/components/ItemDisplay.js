import React from 'react'
import PropTypes from 'prop-types'

import Track from './Track'
import Artist from './Artist'
import Album from './Album'

const ItemDisplay = ({ data, type }) => {
    
    const SelectProperTag = () => {
        switch (type) {
            case 'artist':
                return <Artist data={data} />
            case 'album':
                return <Album data={data} />
            case 'track':
                return <Track data={data} />
            default:
                return null
        }

    }
    return SelectProperTag()
}

ItemDisplay.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}

export default ItemDisplay