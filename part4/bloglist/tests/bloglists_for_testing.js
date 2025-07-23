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

const listWithBlogsFromMoreThanOneAuthor = [
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
  },
  {
    _id: '5a422bc61b908234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 299,
    __v: 0
  },
]

const listWithSomeAuthorsThatHaveEqualBlogsCount = [
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Yuval Noah Harari',
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
  },
  {
    _id: '5a422bc61b908234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 299,
    __v: 0
  },
]

const listWithMultipleAuthorsAndDifferentLikesCount = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithAuthorsThatShareSameLikesCount = [
  {
    _id: '687fc57460b41619577ceb2f',
    title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    url: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy',
    likes: 0,
    __v: 0
  },
  {
    _id: '687fc5fc60b41619577ceb31',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    url: 'https://www.goodreads.com/book/show/3735293-clean-code',
    likes: 0,
    __v: 0
  },
  {
    _id: '687fc5fd60b41619577ceb33',
    title: 'Learning React: Modern Patterns for Developing React Apps',
    author: 'Alex Banks and Eve Porcello',
    url: 'https://www.oreilly.com/library/view/learning-react/9781492051722/',
    likes: 0,
    __v: 0
  },
]

const listWithSomeAuthorsWhereOneBlogIsNegative = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: -3,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

module.exports = {
  listWithOneBlog,
  listWithMoreThanOneBlog,
  listWithEqualHighestLikesCount,
  listWithBlogsOneIsNegative,
  listWithBlogsFromMoreThanOneAuthor,
  listWithSomeAuthorsThatHaveEqualBlogsCount,
  listWithMultipleAuthorsAndDifferentLikesCount,
  listWithAuthorsThatShareSameLikesCount,
  listWithSomeAuthorsWhereOneBlogIsNegative
}