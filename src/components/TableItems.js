import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'

import ListItems from './ListItems'

const AlbumHeader = () => (
    <TableRow>
        <TableCell>Cover</TableCell>
        <TableCell align="right">Album</TableCell>
        <TableCell align="right">Artist</TableCell>
        <TableCell align="right">Availability</TableCell>
    </TableRow>
)
const TrackHeader = () => (
    <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="right">Duration</TableCell>
        <TableCell align="right">Album</TableCell>
        <TableCell align="right">Artists</TableCell>
    </TableRow>
)
const ArtistHeader = () => (
    <TableRow>
        <TableCell>Cover</TableCell>
        <TableCell align="right">Artist</TableCell>
        <TableCell align="right">Genres</TableCell>
        <TableCell align="right">Popularity</TableCell>
    </TableRow>
)

const TableItems = ({data, type}) => {

    const SelectHeaderTag = () => {

        switch (type) {
            case 'artist':
                return <ArtistHeader />
            case 'album':
                return <AlbumHeader />
            case 'track':
                return <TrackHeader />
            default:
                return null
        }

    }
    return (
        
    <Table>
        <TableHead>
            { SelectHeaderTag() }
        </TableHead>
        <TableBody>
            <ListItems/>    
        </TableBody>
    </Table>
        )
}


const mapStateToProps = state => ({
    data: state.data.data,
    type: state.data.type
})

TableItems.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}

export default connect(mapStateToProps, null)(TableItems)