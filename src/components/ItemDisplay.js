import React from 'react'
import PropTypes from 'prop-types'

import Row from './Row'

import ChipCustom from './ChipCustom'

import convertTime from '../helpers/convertTime'

const dataOrder = {
    artist: ['genres', 'popularity'],
    album: ['artist', 'availability'],
    track: ['duration', 'album', 'artists']
}

const configArtist = id => ({
    id: id,
    qParams: {
        limit: 5,
    },
    mainRoute: 'artists',
    secondRoute: 'albums',
})

const configAlbum = id => ({
    id: id,
    mainRoute: 'albums',
    secondRoute: 'tracks',
})

const ItemDisplay = ({ data, type, handleDetails, column }) => {
    
    const SelectProperTag = () => {
        switch (type) {
            case 'artist':
                return <Row 
                            type={type} 
                            config={configArtist} 
                            column={column} 
                            components={{ popularity: ChipCustom }} 
                            dataOrder={dataOrder.artist} 
                            data={data} 
                            handleDetails={handleDetails} />
            case 'album':
                return <Row 
                            type={type} 
                            config={configAlbum} 
                            column={column} 
                            dataOrder={dataOrder.album} 
                            data={{...data, 'availability' : data.availability ? 'Yes' : 'No'}} 
                            handleDetails={handleDetails} />
            case 'track':
                return <Row 
                            type={type} 
                            column={column} 
                            dataOrder={dataOrder.track} 
                            data={{...data, 'duration': convertTime(data.duration)}} />
            default:
                return null
        }

    }
    return SelectProperTag()
}

ItemDisplay.propTypes = {
    data: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    handleDetails: PropTypes.func.isRequired,
    column: PropTypes.number.isRequired,
}

export default ItemDisplay