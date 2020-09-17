import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        name: "Rhys Mitchell",
        username: username,
        password: password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {

    }
  }


  return (
    <div>
      <h2>Blogs</h2>

      {user === null && <form onSubmit={handleLogin}>
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
      </form>}

      {user !== null && `${user.username} is logged in`}
      {user !== null &&
        (<ul>{blogs.map(blog =>
          <li>
            <Blog key={blog.id} blog={blog} />
          </li>)}
        </ul>)}
    </div>
  )
}

export default App