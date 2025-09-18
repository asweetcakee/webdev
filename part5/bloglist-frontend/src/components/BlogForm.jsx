import { useState } from 'react'

const MAGIC_STRINGS = {
  title: 'title',
  author: 'author',
  url: 'url'
}

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleInput = (event) => {
    const { name, value } = event.target
    if (name === MAGIC_STRINGS.title) setTitle(value)
    else if (name === MAGIC_STRINGS.author) setAuthor(value)
    else if (name === MAGIC_STRINGS.url) setUrl(value)
  }

  return(
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
            placeholder={`enter ${MAGIC_STRINGS.title}`}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name={MAGIC_STRINGS.author}
            value={author}
            onChange={handleInput}
            placeholder={`enter ${MAGIC_STRINGS.author}`}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name={MAGIC_STRINGS.url}
            value={url}
            onChange={handleInput}
            placeholder={`enter ${MAGIC_STRINGS.url}`}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm