import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('blog displays author and title by default', () => {
  const blog = {
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    url: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy',
    likes: 0,
    user: {
      username: 'test',
      name: 'tested'
    }
  }

  const loggedUser = { username: 'test' }

  const { container } = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      onLike={() => {}}
      onDelete={() => {}}
    />
  )

  const title = container.querySelector('.blog-title')
  const author = container.querySelector('.blog-author')
  const button = screen.getByRole('button', { name: 'view' })

  expect(author).toHaveTextContent(blog.author)
  expect(title).toHaveTextContent(blog.title)
  expect(container).not.toHaveTextContent(blog.url)
  expect(container).not.toHaveTextContent(`likes ${blog.likes}`)
  expect(container).not.toHaveTextContent(blog.user.name)
  expect(button).toBeInTheDocument()
})
