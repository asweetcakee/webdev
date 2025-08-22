import { useState } from "react"

const Blog = ({ blog, onLike, loggedUser, onDelete }) => {
  const [visible, setVisible] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVisibility = () => {
    setVisible(!visible)
  }
  
  const canDelete = blog.user.username === loggedUser.username

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <span>  </span>
        <button onClick={handleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => onLike(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {canDelete && (
            <div>
              <button onClick={() => onDelete(blog)}>delete</button>
            </div>
          )}
        </div>
      )}
  </div>
)}

export default Blog