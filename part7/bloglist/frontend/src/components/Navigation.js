import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { setLoggedOutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'


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

const Navigation = ({ user }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(setLoggedOutUser())

    dispatch(createNotification({
      type: 'success',
      message: 'Logout successful.',
      resetInterval: 5000,
    }))
  }

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
          ? <div className={classes.rightToolbar}>
            <span color="inherit" component={Link}>
              {user.name}
            </span>
            <Button color="inherit" component={Link} onClick={logout}>
              Logout
            </Button>
          </div>
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