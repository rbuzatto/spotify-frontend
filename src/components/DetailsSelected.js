import React from 'react'
import PropTypes from 'prop-types'


const DetailsSelected = ({details, type}) => {

    const handleType = () => {
        if (type === 'artist') {
            return details.items.map(data => <div key={data.id}>{data.name} released: {data.release_date}</div>)
        } else if(type === 'album') {
            return details.items.map(data => <div key={data.id}>{data.name} duration: {data.duration_ms}</div>)
        }
    }

    return (
        <div>
            {handleType()}
        </div>
    )
}

DetailsSelected.propTypes = {
    details: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}

export default DetailsSelected