import React from 'react'

const Users = ({ user, blogs }) => {
  return (<>
    <h2>{user.name}&apos;s blogs:</h2>
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