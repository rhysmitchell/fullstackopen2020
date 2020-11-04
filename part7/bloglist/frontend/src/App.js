import React, { useState, useEffect } from 'react'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import WelcomeMessage from './components/WelcomeMessage'
import LogoutButton from './components/LogoutButton'
import BlogList from './components/BlogList'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { setLoggedInUser, setLoggedOutUser } from './reducers/userReducer'
import { initialise } from './reducers/blogReducer'
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initialise())
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const logout = () => {
    dispatch(setLoggedOutUser())
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

      dispatch(setLoggedInUser(user))
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

      <Router>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            {user && (
              <>
                <WelcomeMessage user={user} />
                <LogoutButton user={user} logout={logout} />
                <CreateBlogForm user={user} handleBlogCreation={handleBlogCreation} />
                <BlogList user={user} blogs={blogs} />
              </>
            )}

            {!user && (
              <LoginForm user={user}
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
            )}
          </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default App