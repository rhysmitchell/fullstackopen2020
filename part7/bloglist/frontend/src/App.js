import React, { useState, useEffect } from 'react'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from './reducers/notificationReducer'
import { setLoggedInUser } from './reducers/userReducer'
import { initialise } from './reducers/blogReducer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { getUsers } from './reducers/usersReducer'
import { Container, CssBaseline, Typography } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(initialise())

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    <Router>
      <Navigation user={user} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Notification />

        <Switch>
          <Route path="/blogs/:id">
            <Blog blogs={blogs} />
          </Route>
          <Route path="/users/:id">
            <User blogs={blogs} user={user} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            {user && (
              <>
                <Typography variant="h5">
                  Blogs
                </Typography>
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
      </Container>
    </Router>
  )
}

export default App