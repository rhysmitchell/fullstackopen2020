import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => dispatch(getUsers()), [])

  return (<>
    <h2>Users</h2>
    <table>
      <tr>
        <th></th>
        <th>Blogs</th>
      </tr>

      {users.map(user => <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.blogs.length}</td>
      </tr>)}
    </table>
  </>
  )
}

export default Users