import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography, Paper } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const Users = () => {
  const users = useSelector(state => state.users)

  return (<>
    <Typography variant="h5">
      Users
    </Typography>

    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.name}>
              <TableCell component="th" scope="row">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </TableCell>
              <TableCell>
                <td>{user.blogs.length}</td>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}

export default Users