import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'


import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import ListItems from './ListItems'

const AlbumHeader = ({setClasses}) => (
    <TableRow>
        <TableCell>Cover</TableCell>
        <TableCell align="right">Album</TableCell>
        <TableCell className={setClasses(0)} align="right">Artist</TableCell>
        <TableCell className={setClasses(1)} align="right">Availability</TableCell>
    </TableRow>
)
const TrackHeader = ({setClasses}) => (
    <TableRow>
        <TableCell>Cover</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell className={setClasses(0)} align="right">Duration</TableCell>
        <TableCell className={setClasses(1)} align="right">Album</TableCell>
        <TableCell className={setClasses(2)} align="right">Artists</TableCell>
    </TableRow>
)
const ArtistHeader = ({setClasses}) => (
    <TableRow>
        <TableCell>Cover</TableCell>
        <TableCell align="right">Artist</TableCell>
        <TableCell className={setClasses(0)} align="right">Genres</TableCell>
        <TableCell className={setClasses(1)} align="right">Popularity</TableCell>
    </TableRow>
)

const columns = {
    artist: ['Genres', 'Popularity'],
    album: ['Artist', 'Available'],
    track: ['Duration', 'Album', 'Artists']
}

class TableItems extends Component {

    state = {
        column: 0
    }

    setClasses =(row) => classNames(this.props.classes.secondary, {[this.props.classes.secondaryShown] : this.state.column === row })

    SelectHeaderTag = () => {

        switch (this.props.type) {
            case 'artist':
                return <ArtistHeader setClasses={this.setClasses} />
            case 'album':
                return <AlbumHeader setClasses={this.setClasses} />
            case 'track':
                return <TrackHeader setClasses={this.setClasses} />
            default:
                return null
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
      }

    render() {

    const {type, handleDetails, classes} = this.props

    return (
        <React.Fragment>
            <form className={classes.form}>
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="field-simple">Field</InputLabel>
                <Select
                value={this.state.column}
                onChange={this.handleChange}
                inputProps={{
                    name: 'column',
                    id: 'column-simple',
                }}
                >
                { columns[type].map((col, idx) => <MenuItem key={idx} value={idx}>{col}</MenuItem>) }
                </Select>
                </FormControl>
            </form>
        
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    { this.SelectHeaderTag() }
                </TableHead>
                <TableBody>
                    <ListItems handleDetails={handleDetails} column={this.state.column} />    
                </TableBody>
            </Table>
        </React.Fragment>
        )
    }
}


const mapStateToProps = state => ({
    data: state.data.data,
    type: state.data.type
})

TableItems.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    handleDetails: PropTypes.func,
    classes: PropTypes.object.isRequired
}

const styles = theme => ({
    table: {
        margin: '2rem auto',
        width: '80%',
        [theme.breakpoints.down('xs')] : {
            width: '100%'
        }
    },
    form: {
        // display: 'none',
        marginTop: '2rem',
        [theme.breakpoints.up('sm')] : {
            display: 'none'
        }
    },
    secondary: {
        [theme.breakpoints.down('xs')] : {
            display: 'none'
        }
    },
    secondaryShown: {
        display: 'table-cell'
    },
    tableHead: {
        fontStyle: 'italic',
        [theme.breakpoints.down('xs')] : {
            display: 'none'
        }
    }
})

export default compose( 
    withStyles(styles),
    (connect(mapStateToProps, null))
    )(TableItems)