import React from 'react'
import PropTypes from 'prop-types'

import Track from './Track'
import Artist from './Artist'
import Album from './Album'

const ItemDisplay = ({ data, type, handleDetails }) => {
    
    const SelectProperTag = () => {
        switch (type) {
            case 'artist':
                return <Artist data={data} handleDetails={handleDetails} />
            case 'album':
                return <Album data={data} handleDetails={handleDetails} />
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
    type: PropTypes.string.isRequired,
    handleDetails: PropTypes.func.isRequired
}

export default ItemDisplay