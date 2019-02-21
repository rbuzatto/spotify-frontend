import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: 0,
    width: '100vw',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textColor : {
    color: 'yellow'
  },
}

const NavBar = (props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Tune<span className={classes.textColor}>In</span> 
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NavBar)