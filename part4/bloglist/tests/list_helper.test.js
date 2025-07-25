const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('./bloglists_for_testing')

/* DUMMY */
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

/* TOTAL LIKES */
describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(totalLikes.oneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(totalLikes.fewBlogs)
    assert.strictEqual(result, 2418)
  })
})

/* FAVORITE */
describe('favorite blog', () => {
  test('of empty list is null', () => {
    const blogs = []
    const result = listHelper.favoriteBlog(blogs)
    assert.strictEqual(result, null)
  })

  test('returns a single blog when list has only one blog', () => {
    const result = listHelper.favoriteBlog(favoriteBlog.oneBlog)
    assert.deepStrictEqual(result, favoriteBlog.oneBlog[0])
  })

  test('returns the blog with the highest number of likes in a list, where no other blog shares that highest count', () => {
    const result = listHelper.favoriteBlog(favoriteBlog.fewBlogs)
    assert.deepStrictEqual(result, favoriteBlog.fewBlogs[1])
  })

  test('returns the blog with the highest number of likes in a list, where some blogs share that highest count', () => {
    const result = listHelper.favoriteBlog(favoriteBlog.sharedMaxLikedBlogs)
    assert.deepStrictEqual(result, favoriteBlog.sharedMaxLikedBlogs[1])
  })
})

/* MOST BLOGS */
describe('most blogs', () => {
  test('of an empty list', () => {
    const blogs = []
    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, null)
  })

  test('returns the only author when list has a single blog', () => {
    const result = listHelper.mostBlogs(mostBlogs.oneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('returns an author with the most blogs', () => {
    const result = listHelper.mostBlogs(mostBlogs.mostBlogsByOneAuthor)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 2 })
  })

  test('returns first author with the most blogs when list contains only unique authors', () => {
    const result = listHelper.mostBlogs(mostBlogs.blogsWithUniqueAuthors)
    assert.deepStrictEqual(result, { author: 'Douglas Adams', blogs: 1 })
  })

  test('returns first author with the most blogs when list contains some authors with equal blogs quantity', () => {
    const result = listHelper.mostBlogs(mostBlogs.firstAuthorWithMostBlogs)
    assert.deepStrictEqual(result, { author: 'Yuval Noah Harari', blogs: 2 })
  })
})

/* MOST LIKES */
describe('most likes', () => {
  test('of an empty list', () => {
    const blogs = []
    const result = listHelper.mostLikes(blogs)
    assert.strictEqual(result, null)
  })

  test('returns the only author when list has a single blog', () => {
    const result = listHelper.mostLikes(mostLikes.oneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('returns an author with the most likes', () => {
    const result = listHelper.mostLikes(mostLikes.fewBlogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', likes: 1500 })
  })

  test('returns first author with the most likes when each author share the same amount of likes', () => {
    const result = listHelper.mostLikes(mostLikes.blogsShareEqualLikes)
    assert.deepStrictEqual(result, { author: 'Douglas Adams', likes: 0 })
  })

  test('handles negative likes correctly', () => {
    const result = listHelper.mostLikes(mostLikes.oneBlogHasNegativeLikes)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 9 })
  })
})