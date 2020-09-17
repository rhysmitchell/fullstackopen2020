import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import WelcomeMessage from './components/WelcomeMessage'
import LogoutButton from './components/LogoutButton'
import BlogList from './components/BlogList'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({
    type: null,
    message: null,
  });

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
    window.localStorage.removeItem('loggedBlogAppUser');

    flashMessage({
      type: 'success',
      message: `Logout successful.`,
      resetInterval: 5000,
    });
  };

  const flashMessage = (props) => {
    const { type, message, resetInterval } = props;

    setMessage({
      type: type,
      message: message,
    });

    setTimeout(() => {
      setMessage({
        type: null,
        message: null,
      });
    }, resetInterval);
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

      flashMessage({
        type: 'success',
        message: `Login successful.`,
        resetInterval: 5000,
      });
    } catch (exception) {
      flashMessage({
        type: 'error',
        message: `Login failed ${exception}`,
        resetInterval: 5000,
      });
    }
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    try {
      const updatedBlog = await blogService.create({ title, author, url });

      setTitle('')
      setAuthor('')
      setUrl('')

      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs)

      flashMessage({
        type: 'success',
        message: `${updatedBlog.title} by ${updatedBlog.author} was added.`,
        resetInterval: 5000,
      });
    } catch (exception) {
      console.log(exception);
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification schema={message} />

      <LoginForm user={user} handleLogin={handleLogin}
        username={username} setUsername={setUsername} password={password}
        setPassword={setPassword} />

      <WelcomeMessage user={user} />
      <LogoutButton user={user} logout={logout} />

      <CreateBlogForm user={user} handleBlogCreation={handleBlogCreation} title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />

      <BlogList user={user} blogs={blogs} />
    </div>
  )
}

export default App