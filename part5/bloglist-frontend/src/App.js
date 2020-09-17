import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import WelcomeMessage from './components/WelcomeMessage'
import LogoutButton from './components/LogoutButton'
import BlogList from './components/BlogList'

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

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogAppUser')
  };

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
      console.log(exception);
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      <LoginForm user={user} handleLogin={handleLogin}
        username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} />

      <WelcomeMessage user={user} />
      <LogoutButton user={user} logout={logout} />

      <BlogList user={user} blogs={blogs} />
    </div>
  )
}

export default App