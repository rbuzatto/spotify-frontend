import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect }    from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar         from '@material-ui/core/AppBar'
import Toolbar        from '@material-ui/core/Toolbar'
import Typography     from '@material-ui/core/Typography'
import IconButton     from '@material-ui/core/IconButton'
import Close  from  '@material-ui/icons/Close'
import Menu  from  '@material-ui/icons/Menu'

import { NavLink as RouterLink, withRouter } from 'react-router-dom'
import Link from '@material-ui/core/Link'

class NavBar extends Component {

  state = {
    menuOpen: false
  }

  handleMenu = () => {
   this.setState(({menuOpen }) =>({ menuOpen: !menuOpen }))
  }

  render() {
  const { classes, isLoggedIn } = this.props

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleMenu}>
           { !this.state.menuOpen ? <Menu/>: <Close/> }
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Tune<span className={classes.textColor}>In</span> 
          </Typography>
          <div className={`${classes.menuList} ${this.state.menuOpen ? classes.menuListShow : ''}`}>
            <Link 
              component={RouterLink} 
              activeStyle={{ color: '#baf531' }} 
              style={{ 'transitionDelay': '0' }}
              className={`${classes.menuLink} ${this.state.menuOpen ? classes.menuLinkShow : ''}`}
              to="/search/artist" 
              color="inherit">Artists
            </Link>
            <Link 
              component={RouterLink} 
              activeStyle={{ color: '#baf531' }} 
              style={{ 'transitionDelay': '100ms' }}
              className={`${classes.menuLink} ${this.state.menuOpen ? classes.menuLinkShow : ''}`}
              to="/search/album" 
              color="inherit">Albums
            </Link>
            <Link 
              component={RouterLink} 
              activeStyle={{ color: '#baf531' }} 
              style={{ 'transitionDelay': '200ms' }}
              className={`${classes.menuLink} ${this.state.menuOpen ? classes.menuLinkShow : ''}`}
              to="/search/track" 
              color="inherit">Tracks
            </Link>
            <Link 
              component={RouterLink} 
              style={{ 'transitionDelay': '300ms' }}
              className={`${classes.menuLink} ${this.state.menuOpen ? classes.menuLinkShow : ''}`} 
              to={isLoggedIn ? '/logout': '/login'} 
              color="inherit">{isLoggedIn ? 'Logout': 'Login'}</Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.loggedIn
})

const styles = theme => ({
  root: {
    position: 'relative',
    top: 0,
    width: '100vw',
    height: '56px',
    [theme.breakpoints.up('sm')]: {
      height: '64px',
    }
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  textColor : {
    color: 'yellow'
  },
  menuLink : {
    marginLeft: 12,
    '&:hover': {
      textDecoration: 'none',
      color: 'yellow',
    },
    [theme.breakpoints.down('xs')]: {
        padding: '.8rem',
        opacity:0,
        transform: 'translateX(-50%)',
        margin:0,
        background: '#4b675b',
        '&:hover': {
          background: '#102b06'
        },
      
        '&:not(:first-child)': {
          borderTop: '1px solid #92b791'
        }
    }
  },
    menuLinkShow : {
      [theme.breakpoints.down('xs')]: {
        opacity: 1,
        transform: 'translateX(0)',
        transition: `
          opacity .3s ease-in,
          transform .3s ease-in,
          background .10s linear,
          color .10s linear
          `,
      }
    }
  ,
  menuList: {
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      flexDirection: 'column',
      top: 50,
      left: 20,
      borderRadius: '4px',
      width: '0',
      display: 'flex',
      overflow: 'hidden',
    }
  },
  menuListShow: {
    [theme.breakpoints.down('xs')]: {
      width: '15rem',
    }
  }
})


export default withRouter(withStyles(styles)(connect(mapStateToProps, null)(NavBar)))