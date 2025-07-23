const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const listWithMoreThanOneBlog = [
    {
      _id: '',
      title: 'The Hitchhiker\'s Guide to the Galaxy',
      author: 'Douglas Adams',
      url: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy',
      likes: 42,
      __v: 0
    },
    {
      _id: '',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      url: 'https://www.goodreads.com/book/show/3735293-clean-code',
      likes: 1500,
      __v: 0
    },
    {
      _id: '',
      title: 'Learning React: Modern Patterns for Developing React Apps',
      author: 'Alex Banks and Eve Porcello',
      url: 'https://www.oreilly.com/library/view/learning-react/9781492051722/',
      likes: 876,
      __v: 0
    }
  ]
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMoreThanOneBlog)
    assert.strictEqual(result, 2418)
  })
})