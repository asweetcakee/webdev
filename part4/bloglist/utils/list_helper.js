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
  //console.log('-Authors:', authorCounts)

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
  //console.log('-Max blogs:', maxBlogs)

  return maxBlogs
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  let authorLikes = {}

  for (const blog of blogs) {
    const { author, likes } = blog
    authorLikes[author] = (authorLikes[author] || 0) + likes
  }
  //console.log('-Author likes:', authorLikes)

  let maxLikes = {
    author: null,
    likes: Number.MIN_SAFE_INTEGER
  }

  for (const[author, likes] of Object.entries(authorLikes)){
    if (likes > maxLikes.likes){
      maxLikes = {
        author: author,
        likes: likes
      }
    }
  }
  //console.log('-Max blogs:', maxLikes)
  return maxLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }