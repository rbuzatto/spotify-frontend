import React          from 'react'
import PropTypes      from 'prop-types'
import { connect }    from 'react-redux'
import { compose }    from 'redux'

import { withStyles } from '@material-ui/core/styles'
import TextField      from '@material-ui/core/TextField'
import Button         from '@material-ui/core/Button'

import { setSearchField, getData } from '../actionCreators/index'

const styles = theme => ({
    form: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '8rem'
    },
    textField: {
        margin: 0
    },
    button: {
        marginLeft: '1rem'
    }
})

const Form = (props) => {

    const placeholder = {
        track: 'smelly cat',
        artist: 'Phoebe Buffay',
        album: 'Buffay Unplugged'
    }

    const {filter, handleSeachField, handleSubmit, type, classes} = props

    const passProps = () => ({ query: filter, type })

    return (
    <form className={classes.form} action="" onSubmit={(e) => handleSubmit(e, passProps())}>
        <TextField
            className={classes.textField} 
            type="text" 
            onChange={handleSeachField}
            margin="normal"
            placeholder={placeholder[type]}
            required />
        <Button 
            className={classes.button}
            variant="contained" 
            disabled={!filter.length} 
            type="submit">Submit</Button>
    </form>
    )
}

Form.propTypes = {
    type            : PropTypes.string.isRequired,
    filter          : PropTypes.string.isRequired,
    handleSubmit    : PropTypes.func.isRequired,
    handleSeachField: PropTypes.func.isRequired,
    classes         : PropTypes.object.isRequired

} 

const mapStateToProps = ({filter}) => ({
    filter: filter.name
})

const mapDispatchToProps = dispatch => ({
    handleSeachField: e => dispatch(setSearchField(e.target.value)),
    handleSubmit: (e, query) => {
        e.preventDefault()
        dispatch(getData(query))
    }
})

export default compose( 
    withStyles(styles),
    (connect(mapStateToProps, mapDispatchToProps))
    )(Form)