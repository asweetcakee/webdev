const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return (!blogs || blogs.length === 0)
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return (!blogs || blogs.length === 0)
    ? null
    : blogs.reduce((favorite, blog) => {
      return blog.likes > favorite.likes
        ? blog
        : favorite
    }, blogs[0])
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  const authorCounts = {}

  for (const blog of blogs) {
    const { author } = blog
    authorCounts[author] = (authorCounts[author] || 0) + 1
  }
  console.log('-Authors:', authorCounts)

  let maxBlogs = {
    author: null,
    blogs: Number.MIN_SAFE_INTEGER
  }

  for (const [author, count] of Object.entries(authorCounts)) {
    if (count > maxBlogs.blogs) {
      maxBlogs = {
        author: author,
        blogs: count
      }
    }
  }
  console.log('-Max blogs:', maxBlogs)

  return maxBlogs
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }