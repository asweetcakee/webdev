const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

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

const listWithMoreThanOneBlog = [
  {
    _id: '687fc57460b41619577ceb2f',
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    url: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy',
    likes: 42,
    __v: 0
  },
  {
    _id: '687fc5fc60b41619577ceb31',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    url: 'https://www.goodreads.com/book/show/3735293-clean-code',
    likes: 1500,
    __v: 0
  },
  {
    _id: '687fc5fd60b41619577ceb33',
    title: 'Learning React: Modern Patterns for Developing React Apps',
    author: 'Alex Banks and Eve Porcello',
    url: 'https://www.oreilly.com/library/view/learning-react/9781492051722/',
    likes: 876,
    __v: 0
  },
]

const listWithEqualHighestLikesCount = [
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 189,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 678,
    __v: 0
  },
  {
    _id: '687fcd30174116bad4fa8b6b',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    url: 'https://www.ynharari.com/sapiens',
    likes: 678,
    __v: 0
  }
]

const listWithBlogsOneIsNegative = [
  {
    _id: '687fc57460b41619577ceb2f',
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    url: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy',
    likes: 42,
    __v: 0
  },
  {
    _id: '687fc5fc60b41619577ceb31',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    url: 'https://www.goodreads.com/book/show/3735293-clean-code',
    likes: -10,
    __v: 0
  },
  {
    _id: '687fc5fd60b41619577ceb33',
    title: 'Learning React: Modern Patterns for Developing React Apps',
    author: 'Alex Banks and Eve Porcello',
    url: 'https://www.oreilly.com/library/view/learning-react/9781492051722/',
    likes: 876,
    __v: 0
  },
]

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
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithMoreThanOneBlog)
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
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('returns the blog with the highest number of likes in a list, where no other blog shares that highest count', () => {
    const result = listHelper.favoriteBlog(listWithMoreThanOneBlog)
    assert.deepStrictEqual(result, listWithMoreThanOneBlog[1])
  })

  test('returns the blog with the highest number of likes in a list, where some blogs share that highest count', () => {
    const result = listHelper.favoriteBlog(listWithEqualHighestLikesCount)
    assert.deepStrictEqual(result, listWithEqualHighestLikesCount[1])
  })

  test('handles blogs with negative likes correctly', () => {
    const result = listHelper.favoriteBlog(listWithBlogsOneIsNegative)
    assert.deepStrictEqual(result, listWithBlogsOneIsNegative[2])
  })
})