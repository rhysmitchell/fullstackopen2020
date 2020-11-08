import React from 'react'
import { Typography } from '@material-ui/core'


const Users = ({ user, blogs }) => {
  return (<>
    <Typography variant="h5">
      {user?.name}&apos;s blogs:
    </Typography>
    <table>
      <thead>
        <tr>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {blogs.map(blog => <tr key={blog.id}>
          <td>{blog.title}</td>
        </tr>)}
      </tbody>
    </table>
  </>
  )
}

export default Users