import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'
import { compose }          from 'redux'

import { withStyles }       from '@material-ui/core/styles'
import TextField            from '@material-ui/core/TextField'
import Button               from '@material-ui/core/Button'

import { loginUser } from '../actionCreators'

class Login extends Component {

    state = {
        username: '',
        password: '',
        touched: {
            username: false,
            password: false
        },
        valid : {
            username: false,
            password: false
        },
        action: 'login'
    }

    handleSubmit = () => {
        const { username, password, action } = this.state

        this.props.login({username, password}, action)
        this.clearState()
    }

    clearState = () => {
        this.setState(() => ({
            username: '',
            password: '',
        touched: {
            username: false,
            password: false
        },
        valid : {
            username: false,
            password: false
        }
        }))
    }

    handleChange = (e) => {
        e.persist()
        const { name, value } = e.target

        const valid = this.validate(value, name)

        if(valid !== this.state.valid[name]) {
            return this.setState((state) => ({ 
                [name]: value,
                valid: { ...state.valid, [name]: valid }
            }))
        }

        this.setState(() => ({ [name]: value }))
    }

    handleTouched = (e) => {
        e.persist()
        const { name } = e.target
        if(this.state.touched[name] === false) {
            return this.setState((state) => ({
                 touched: { ...state.touched, [name]: true} }))
        }
    }

    validate = (value, type) => {
        if(type === 'username' ) {
            return value.length > 2
        } else if(type === 'password') {
            return !!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        }

    }

    handleFormAction = (action) => {
        this.setState(() => ({ action }), this.handleSubmit)
    }

    render() {

        const { classes } = this.props
        const { touched, valid } = this.state

        return (
            <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                    error={ touched.username && !valid.username }
                    id="std-username"
                    label="User Name"
                    name="username"
                    className={classes.textField}
                    value={this.state.username}
                    onChange={this.handleChange}
                    onClick={this.handleTouched}
                    margin="normal"
                    required
                />
                <span className={classes.fieldInfo}>Required 3 characters</span>
                <TextField
                    error={ touched.password && !valid.password }
                    id="std-password"
                    label="Password"
                    name="password"
                    type="password"
                    className={classes.textField}
                    value={this.state.password}
                    onChange={this.handleChange}
                    onClick={this.handleTouched}
                    margin="normal"
                    required
                />
                <span className={classes.fieldInfo}>Required 8 chars with letter and number</span>
                    <Button onClick={() => this.handleFormAction('login')} className={classes.button} variant="contained" color="primary" disabled={!valid.username || !valid.password}>
                        Login
                    </Button>
                    <Button onClick={() => this.handleFormAction('signup')} className={classes.button} variant="outlined" color="primary" disabled={!valid.username || !valid.password}>
                        Sign Up
                    </Button>
            </form>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  }

const mapDispatchToProps = dispatch => ({
    login: ({username, password}, mode) => dispatch(loginUser({ username, password, mode}))
})

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        background: '#fff',
        padding: '4rem',
        borderRadius: '4px',
        boxShadow: '2px 2px 4px #e0e0e0'
    },
    button: {
        marginTop: '1rem',
        '&:first-of-type': {
            marginTop: '2rem'
        }
    },
    fieldInfo: {
        fontSize: '.75rem',
        color: '#a0a0a0',
        fontStyle: 'italic'
    }
})

export default compose( 
    withStyles(styles),
    (connect(null, mapDispatchToProps))
    )(Login)