import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

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

test('calls handleCreateBlog with correct details when new blog is submitted', async() => {
  const mockCreateBlog = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={mockCreateBlog}/>)

  const titleInput = screen.getByPlaceholderText('enter title')
  const authorInput = screen.getByPlaceholderText('enter author')
  const urlInput = screen.getByPlaceholderText('enter url')
  const createButton = screen.getByRole('button', { name: 'create' })

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(createButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: blog.title,
    author: blog.author,
    url: blog.url
  })
})