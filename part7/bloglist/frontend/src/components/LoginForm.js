import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Typography, TextField, Button } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const LoginForm = ({ user, handleLogin, username, setUsername, password, setPassword }) => {

  const classes = useStyles()
  if (user) {
    return <></>
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>

      <form id='loginForm' onSubmit={handleLogin} className={classes.form}>
        <div>
          Username

          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id='username'
            type="text"
            value={username}
            name="Username"
            autoFocus
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div>
          Password

          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id='username'
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          id='BtnLogin'
          type="submit">
            Login
        </Button>
      </form>
    </div>)
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm