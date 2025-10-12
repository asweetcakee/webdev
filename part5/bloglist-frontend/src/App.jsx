/*
 * App.jsx
 *
 * Main React component that manages the overall state and behavior of the blog list application.
 *
 * Responsibilities:
 * - Handles user authentication (login/logout with localStorage persistence)
 * - Manages blog CRUD operations via `blogService`
 * - Displays notifications using `useNotification` custom hook
 * - Conditionally renders either the login form or the blog list
 *
 * Key React Hooks:
 * - useState: Manages blogs, user authentication data and controlled input values for the login form
 * - useEffect: Loads blogs from backend and restores user from localStorage
 * - useRef: Controls BlogForm visibility via Togglable
 */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotification, notificationTypes } from './hooks/useNotification'

// --- Constants ---
const MAGIC_STRINGS = {
  username: 'username',
  password: 'password',
  localStorageLoggedUser: 'loggedBloglistAppUser',
  createBtnLabel: 'add blog'
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { notification, type: notificationType, notify } = useNotification()
  const createFormRef = useRef()

  // --- Effects: Initial Data Fetch and LocalStorage Sync ---
  const sortBlogsByLikesDesc = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        const sortedBlogsByLikes = sortBlogsByLikesDesc(blogs)
        setBlogs(sortedBlogsByLikes)
      } catch (error) {
        notify(`Error fetching blogs: ${error.message}`, notificationTypes.error)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(MAGIC_STRINGS.localStorageLoggedUser)
    if (loggedUserJSON){
      const parsedJSON = JSON.parse(loggedUserJSON)
      blogService.setToken(parsedJSON.token)
      setUser(parsedJSON)
    }
  }, [])

  // --- Event Handlers: Login / Logout / Input Changes ---
  const handleInput = (event) => {
    const { name, value } = event.target
    if (name === MAGIC_STRINGS.username) setUsername(value)
    else if (name === MAGIC_STRINGS.password) setPassword(value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = { username, password }
      const authenticatedUser = await loginService.login(credentials)
      window.localStorage.setItem(
        MAGIC_STRINGS.localStorageLoggedUser,
        JSON.stringify(authenticatedUser)
      )
      blogService.setToken(authenticatedUser.token)
      setUser(authenticatedUser)
      notify('Successful login', notificationTypes.success)

      setUsername('')
      setPassword('')
    } catch {
      notify('Wrong credentials', notificationTypes.error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem(MAGIC_STRINGS.localStorageLoggedUser)
    blogService.setToken(null)
    setUser(null)
    notify('Successful logout', notificationTypes.success)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notification} type={notificationType} />
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type='text'
              name={MAGIC_STRINGS.username}
              value={username}
              onChange={handleInput}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='password'
              name={MAGIC_STRINGS.password}
              value={password}
              onChange={handleInput}
            />
          </label>
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  )

  // --- Blog Actions: Create, Update (Likes), Delete ---
  const handleCreateBlog = async (blogObject) => {
    try{
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat(response))
      notify(`a new blog ${blogObject.title} by ${blogObject.author} added`, notificationTypes.success)
      createFormRef.current.hide()
    } catch(exception) {
      notify(`Error: ${exception.response?.data?.error || exception.message}`, notificationTypes.error)
    }
  }

  const handleLikes = async (blog) => {
    try {
      const blogToUpdate = {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1
      }

      const response = await blogService.update(blog.id, blogToUpdate)
      const updatedBlog = {
        ...response,
        user: blog.user
      }
      handleBlogUpdate(updatedBlog)
      notify('Likes has been increased by 1', notificationTypes.success)
    } catch(exception) {
      notify(`Error: ${exception.response?.data?.error || exception.message}`, notificationTypes.error)
    }
  }

  const handleBlogUpdate = (updatedBlog) => {
    const updatedBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
    const sortedBlogsByLikes = sortBlogsByLikesDesc(updatedBlogs)
    setBlogs(sortedBlogsByLikes)
  }

  const handleBlogDelete = async (blogToDelete) => {
    const clientResponse = window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)
    if (!clientResponse) return
    try {
      await blogService.deleteBlog(blogToDelete.id)
      const filteredBlogs = blogs.filter(blog => blog.id !== blogToDelete.id)
      setBlogs(sortBlogsByLikesDesc(filteredBlogs))
      notify(`Blog ${blogToDelete.title} by ${blogToDelete.author} was deleted by ${user.name}`, notificationTypes.success)
    } catch (exception) {
      notify(`Error: ${exception.response?.data?.error || exception.message}`, notificationTypes.error)
    }
  }

  const listBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} type={notificationType} />
      <p>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable buttonLabel={MAGIC_STRINGS.createBtnLabel} ref={createFormRef}>
        <BlogForm createBlog={handleCreateBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLike={handleLikes} loggedUser={user} onDelete={handleBlogDelete}/>
      )}
    </div>
  )

  return (
    <div>
      { user === null
        ? loginForm()
        : listBlogs()
      }
    </div>
  )
}

export default App