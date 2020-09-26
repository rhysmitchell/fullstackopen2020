import React from 'react'
import PropTypes from 'prop-types'



const LoginForm = ({ user, handleLogin, username, setUsername, password, setPassword }) => {
  if (user) {
    return <></>
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
      </div>
      <div>
                password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>)
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm