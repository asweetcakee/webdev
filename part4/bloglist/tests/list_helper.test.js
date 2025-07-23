const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const bloglists = require('./bloglists_for_testing')

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
    const result = listHelper.totalLikes(bloglists.listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(bloglists.listWithMoreThanOneBlog)
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
    const result = listHelper.favoriteBlog(bloglists.listWithOneBlog)
    assert.deepStrictEqual(result, bloglists.listWithOneBlog[0])
  })

  test('returns the blog with the highest number of likes in a list, where no other blog shares that highest count', () => {
    const result = listHelper.favoriteBlog(bloglists.listWithMoreThanOneBlog)
    assert.deepStrictEqual(result, bloglists.listWithMoreThanOneBlog[1])
  })

  test('returns the blog with the highest number of likes in a list, where some blogs share that highest count', () => {
    const result = listHelper.favoriteBlog(bloglists.listWithEqualHighestLikesCount)
    assert.deepStrictEqual(result, bloglists.listWithEqualHighestLikesCount[1])
  })

  test('handles blogs with negative likes correctly', () => {
    const result = listHelper.favoriteBlog(bloglists.listWithBlogsOneIsNegative)
    assert.deepStrictEqual(result, bloglists.listWithBlogsOneIsNegative[2])
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
    const result = listHelper.mostBlogs(bloglists.listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('returns an author with the most blogs', () => {
    const result = listHelper.mostBlogs(bloglists.listWithBlogsFromMoreThanOneAuthor)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })

  test('returns first author with the most blogs when list contains only unique authors', () => {
    const result = listHelper.mostBlogs(bloglists.listWithMoreThanOneBlog)
    assert.deepStrictEqual(result, { author: 'Douglas Adams', blogs: 1 })
  })

  test('returns first author with the most blogs when list contains some authors with equal blogs quantity', () => {
    const result = listHelper.mostBlogs(bloglists.listWithSomeAuthorsThatHaveEqualBlogsCount)
    assert.deepStrictEqual(result, { author: 'Yuval Noah Harari', blogs: 2 })
  })
})