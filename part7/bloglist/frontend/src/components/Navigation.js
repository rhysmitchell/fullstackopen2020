import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  // Credit for aligned AppBar menu items
  // https://stackblitz.com/edit/material-ui-appbar-example?file=demo.js
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12
  },
  leftToolbar: {
    marginRight: 16,
    marginLeft: -12
  }
})

const Navigation = ({ user, logout }) => {
  const classes = useStyles()

  if (!user) {
    return null
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button className={classes.leftToolbar} color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button className={classes.leftToolbar} color="inherit" component={Link} to="/users">
          users
        </Button>
        {user
          ? <Button className={classes.rightToolbar} color="inherit" component={Link} onClick={logout}>
            Logout
          </Button>
          :
          <Button className={classes.rightToolbar} color="inherit" component={Link} to="/login">
            Login
          </Button>

        }
      </Toolbar>
    </AppBar>
  )
}

export default Navigation