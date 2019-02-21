import React from 'react'
import PropTypes from 'prop-types'
import convertTime from '../helpers/convertTime'


const Album = ({data}) => {
    
    const { image, name, artist, availability } = data
    return (
    <div>
        <img src={image} alt={`Cover Album for ${name}`} />
        <span>{name}</span>
        <span>{artist}</span>
        <span>{availability}</span>
    </div>
    )
}

const Track = ({data}) => {

    const { name, duration, album, artists } = data
    
    return (
    <div>
        <span>{name}</span>
        <span>{convertTime(duration)}</span>
        <span>{album}</span>
        <span>{artists}</span>
    </div>
)}
const Artist = ({data}) => {
    
    const { name, image, genres, popularity } = data 

    return (
    <div>
        <img src={image} alt={`Artist ${name}`} />
        <span>{name}</span>
        <span>{genres}</span>
        <span>{popularity}</span>
    </div>
)}

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