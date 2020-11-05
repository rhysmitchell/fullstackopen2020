import React from 'react'
import WelcomeMessage from './WelcomeMessage'
import LogoutButton from './LogoutButton'
import { Link } from 'react-router-dom'

const Navigation = ({ user, logout }) => {
  if (!user) {
    return null
  }

  return (
    <div style={{ background: 'lightgrey' }}>
      <ul style={{
        listStyle: 'none',
        display: 'inline-flex'
      }}>
        <li><Link to={'/blogs'}>Blogs</Link></li>&nbsp;
        <li><Link to={'/users'}>Users</Link></li>&nbsp;
        <li><WelcomeMessage user={user} /></li>&nbsp;
        <li><LogoutButton user={user} logout={logout} /></li>
      </ul>
    </div>
  )
}

export default Navigation