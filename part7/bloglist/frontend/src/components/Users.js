import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const Users = () => {
  const users = useSelector(state => state.users)

  return (<>
    <Typography variant="h5">
      Users
    </Typography>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Blogs</th>
        </tr>
      </thead>

      <tbody>
        {users.map(user =>
          <tr key={user.id}>

            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>

          </tr>)}
      </tbody>
    </table>
  </>
  )
}

export default Users