import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotification, notificationTypes } from './hooks/useNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { notification, type: notificationType, notify } = useNotification()
  const createFormRef = useRef()

  const MAGIC_STRINGS = {
    username: 'username',
    password: 'password',
    localStorageLoggedUser: 'loggedBloglistAppUser',
    title: 'title',
    author: 'author',
    url: 'url',
    createBtnLabel: 'add blog'
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(MAGIC_STRINGS.localStorageLoggedUser)
    if (loggedUserJSON){
      const parsedJSON = JSON.parse(loggedUserJSON)
      blogService.setToken(parsedJSON.token)
      setUser(parsedJSON)
    }
  }, [])

  const handleInput = (event) => {
    const { name, value } = event.target
    if (name === MAGIC_STRINGS.username) setUsername(value)
    else if (name === MAGIC_STRINGS.password) setPassword(value)
    else if (name === MAGIC_STRINGS.title) setTitle(value)
    else if (name === MAGIC_STRINGS.author) setAuthor(value)
    else if (name === MAGIC_STRINGS.url) setUrl(value)
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
      notify(`Successful login`, notificationTypes.success)

      setUsername('')
      setPassword('')
    } catch (exception) {
      notify(`Wrong credentials`, notificationTypes.error)
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
          username
          <input 
            type='text'
            name={MAGIC_STRINGS.username}
            value={username}
            onChange={handleInput}
          />
        </div>
        <div>
          password
          <input 
            type='password'
            name={MAGIC_STRINGS.password}
            value={password}
            onChange={handleInput}
          />
        </div>
        <button type='submit'>log in</button>
      </form>
    </div>
  )

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try{
      const response = await blogService.create({
        title, author, url
      })

      setBlogs(blogs.concat(response))
      notify(`a new blog ${title} by ${author} added`, notificationTypes.success)

      setTitle('')
      setAuthor('')
      setUrl('')
      createFormRef.current.hide()
    } catch(exception) {
      notify(`Error: ${exception.response?.data?.error || exception.message}`, notificationTypes.error)
    }
  }

  const createForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input 
            type="text" 
            name={MAGIC_STRINGS.title}
            value={title}
            onChange={handleInput}
          />
        </div>
        <div>
          author:
          <input 
            type="text" 
            name={MAGIC_STRINGS.author}
            value={author}
            onChange={handleInput}
          />
        </div>
        <div>
          url:
          <input 
            type="text" 
            name={MAGIC_STRINGS.url}
            value={url}
            onChange={handleInput}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  ) 

  const listBlogs = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} type={notificationType} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable buttonLabel={MAGIC_STRINGS.createBtnLabel} ref={createFormRef}>
        {createForm()}
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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