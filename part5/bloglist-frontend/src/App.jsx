import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const MAGIC_STRINGS = {
    username: 'username',
    password: 'password',
    localStorageLoggedUser: 'loggedBloglistAppUser'
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
      setUser(parsedJSON)
    }
  }, [])

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
      setUser(authenticatedUser)

      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Error:', exception)
    }
  }
  
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem(MAGIC_STRINGS.localStorageLoggedUser)
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
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

  const listBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </p>
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