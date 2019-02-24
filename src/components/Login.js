import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'

import { loginUser } from '../actionCreators'

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    },
    button: {
        marginTop: '1rem'
    }
})

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
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password } = this.state

        this.props.login(username, password)
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
                    <Button type="submit" className={classes.button} variant="contained" color="primary" disabled={!valid.username || !valid.password}>
                        Log In
                    </Button>
            </form>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  }

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch(loginUser({ username, password, mode: 'signup' }))
})

export default withStyles(styles)(connect(null, mapDispatchToProps)(Login))