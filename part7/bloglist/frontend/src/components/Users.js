import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => dispatch(getUsers()), [])

  return (<>
    <h2>Users</h2>
    <ul>
      {users.map(user => <Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link>)}
    </ul>
  </>
  )
}

export default Users