import React from 'react'

const LogoutButton = ({ user, logout }) => {
  if (!user) {
    return <></>
  }

  return (<button onClick={() => logout()}>Logout</button>)
}

export default LogoutButton