import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect }    from 'react-redux'    
import { compose } from 'redux'
import { NavLink as RouterLink, withRouter } from 'react-router-dom'

import AppBar            from '@material-ui/core/AppBar'
import Toolbar           from '@material-ui/core/Toolbar'
import IconButton        from '@material-ui/core/IconButton'
import Close             from '@material-ui/icons/Close'
import Menu              from '@material-ui/icons/Menu'
import Link              from '@material-ui/core/Link'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { withStyles }    from '@material-ui/core/styles'


class NavBar extends Component {

  state = {
    menuOpen: false
  }

  handleMenu = () => {
   this.setState(({ menuOpen }) =>({ menuOpen: !menuOpen }))
  }

  closeMenu = () => {
    if(this.state.menuOpen) {
      this.setState(() => ({ menuOpen : false}))
    }
  }

  handleClickAway = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }
    
    this.setState(() => ({ menuOpen : false}))
  }

  render() {
  const { classes, isLoggedIn } = this.props
  const { menuOpen } = this.state

  const linksValues = [
    {
      to: '/search/artist',
      display: 'Artists',
    },
    {
      to: '/search/album',
      display: 'Albums',
    },
    {
      to: '/search/track',
      display: 'Tracks',
    },
    {
      to: isLoggedIn ? '/logout': '/login',
      display: isLoggedIn ? 'Logout': 'Login',
    },
  ]

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton
            buttonRef={node => {
              this.anchorEl = node
            }}
            aria-owns={ menuOpen ? 'menu-list' : undefined}
            aria-haspopup="true"
            color="inherit"
            onClick={this.handleMenu}
            className={classes.menuButton}
            aria-label="Menu"
          >
             { !menuOpen ? <Menu/> : <Close/> }
          </IconButton>
          <Link 
            variant="h6" 
            color="inherit" 
            className={classes.logo} 
            component= {RouterLink} to={'/'}>
            Tune<span className={classes.textColor}>In</span> 
          </Link>
          <ClickAwayListener onClickAway={this.handleClickAway}>
            <div id='menu-list' className={`${classes.menuList} ${menuOpen ? classes.menuListShow : ''}`}>
              { linksValues.map(({to, display}, idx) => (
                <Link
                  key         = {idx} 
                  component   = {RouterLink}
                  onClick     = {this.closeMenu} 
                  activeStyle = {{ color: '#baf531' }} 
                  style       = {{ 'transitionDelay': `${idx*100}ms` }}
                  className   = {`${classes.menuLink} ${menuOpen ? classes.menuLinkShow: ''}`}
                  to          = {to} 
                  color       = "inherit">{display}
                </Link>
                ))
              }
            </div>
          </ClickAwayListener>
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
  logo: {
    flexGrow: 1,
    '&:hover': {
      textDecoration: 'none',
    }
    
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

export default compose(
  withRouter,
  withStyles(styles),
  (connect(mapStateToProps, null))
  )(NavBar)