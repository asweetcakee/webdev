import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

let blog
let loggedUser

beforeEach(() => {
  blog = {
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    url: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy',
    likes: 0,
    user: {
      username: 'test',
      name: 'tested'
    }
  }

  loggedUser = { username: 'test' }
})

const renderBlog = (overrides = {}) => {
  return render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      onLike={() => {}}
      onDelete={() => {}}
      {...overrides}
    />
  )
}

test('displays author and title but hides URL, likes, and user details by default', () => {
  const { container } = renderBlog()
  const title = container.querySelector('.blog-title')
  const author = container.querySelector('.blog-author')
  expect(author).toHaveTextContent(blog.author)
  expect(title).toHaveTextContent(blog.title)

  const viewButton = screen.getByRole('button', { name: 'view' })
  expect(viewButton).toBeInTheDocument()
  expect(viewButton).toHaveTextContent('view')

  expect(container).not.toHaveTextContent(blog.url)
  expect(container).not.toHaveTextContent(`likes ${blog.likes}`)
  expect(container).not.toHaveTextContent(blog.user.name)
})

test('displays url and likes count when view button is pressed', async () => {
  const { container } = renderBlog()
  const user = userEvent.setup()
  const viewButton = screen.getByRole('button', { name: 'view' })
  await user.click(viewButton)

  const hideButton = screen.getByRole('button', { name: 'hide' })
  expect(hideButton).toBeInTheDocument()
  expect(hideButton).toHaveTextContent('hide')

  expect(container).toHaveTextContent(blog.url)
  expect(container).toHaveTextContent(`likes ${blog.likes}`)
})

test('clicking like button twice calls onLike twice', async () => {
  const mockOnLike = vi.fn()
  const user = userEvent.setup()
  renderBlog({ onLike: mockOnLike })

  const viewButton = screen.getByRole('button', { name: 'view' })
  await user.click(viewButton)

  const likeButton = screen.getByRole('button', { name: 'like' })
  expect(likeButton).toBeInTheDocument()
  expect(likeButton).toHaveTextContent('like')

  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockOnLike).toHaveBeenCalledTimes(2)
  expect(mockOnLike).toHaveBeenCalledWith(blog)
})
