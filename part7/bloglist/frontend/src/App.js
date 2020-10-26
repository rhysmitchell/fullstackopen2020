import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import WelcomeMessage from './components/WelcomeMessage'
import LogoutButton from './components/LogoutButton'
import BlogList from './components/BlogList'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

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
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(createNotification({
      type: 'success',
      message: 'Logout successful.',
      resetInterval: 5000,
    }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')

      dispatch(createNotification({
        type: 'success',
        message: 'Login successful.',
        resetInterval: 5000,
      }))
    }
    catch (exception) {
      dispatch(createNotification({
        type: 'error',
        message: `Login failed ${exception}`,
        resetInterval: 5000,
      }))
    }
  }

  const handleBlogCreation = (blog) => {
    blogService
      .create(blog)
      .then(async returnedBlog => {
        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs)

        dispatch(createNotification({
          type: 'success',
          message: `${returnedBlog.title} by ${returnedBlog.author} was added.`,
          resetInterval: 5000,
        }))
      })
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      <LoginForm user={user} handleLogin={handleLogin}
        username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} />

      <WelcomeMessage user={user} />
      <LogoutButton user={user} logout={logout} />

      <CreateBlogForm user={user} handleBlogCreation={handleBlogCreation} />

      <BlogList user={user} blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

export default App