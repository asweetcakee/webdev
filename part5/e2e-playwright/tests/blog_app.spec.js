const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, hasNotification, openBlogForm, fillAndSubmitBlogForm, expectLocatorsVisible } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    const userTestData = {
      name: 'Test subject',
      username: 'test',
      password: 'testpass'
    }
    await request.post('/api/users', { data: userTestData })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    expectLocatorsVisible([
      page.getByRole('heading', { name: 'Log in to application' }),
      page.getByText('username'),
      page.getByText('password'),
      page.getByRole('textbox', { name: 'username' }),
      page.getByRole('textbox', { name: 'password' }),
      page.getByRole('button', { name: 'log in' })
    ])
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'testpass')
      const userLoggedIn = page.getByText('Test subject logged in')
      await expect(userLoggedIn).toBeVisible()
      
      await hasNotification(page, 'Successful login', 'rgb(0, 128, 0)', 'rgb(0, 128, 0)')

      const addBlogBtn = page.getByRole('button', { name: 'add blog' })
      await expect(addBlogBtn).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'wrongpass')
      await hasNotification(page, 'Wrong credentials', 'rgb(255, 0, 0)', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'test', 'testpass')
    })

    test('a new blog can be created', async ({ page }) => {
      await openBlogForm(page)
      await expectLocatorsVisible([
        page.getByRole('heading', { name: 'create new' }),
        page.getByText(/title/i),
        page.getByRole('textbox', { name: /title/i }),
        page.getByText(/author/i),
        page.getByRole('textbox', { name: /author/i }),
        page.getByText(/url/i),
        page.getByRole('textbox', { name: /url/i }),
        page.getByRole('button', { name: 'create' }),
        page.getByRole('button', { name: 'cancel' })
      ])
      
      const blogTestData = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
      }
      await fillAndSubmitBlogForm(page, blogTestData)
      await hasNotification(page, `a new blog ${blogTestData.title} by ${blogTestData.author} added`, 'rgb(0, 128, 0)', 'rgb(0, 128, 0)')
      
      await expect(page.getByText(blogTestData.title, { exact: true })).toBeVisible()
      await expect(page.getByText(blogTestData.author, { exact: true })).toBeVisible()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })

    test('can like a blog', async ({ page }) => {
      await openBlogForm(page)
      const blogTestData = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
      }
      await fillAndSubmitBlogForm(page, blogTestData)
      
      const viewBtn = page.getByRole('button', { name: 'view' })
      await expect(viewBtn).toBeVisible()
      await viewBtn.click()
      
      await expect(page.getByText(/^likes 0$/i)).toBeVisible()
      const likeBtn = page.getByRole('button', { name: 'like' })
      await expect(likeBtn).toBeVisible()
      
      await likeBtn.click()
      await expect(page.getByText(/^likes 1$/i)).toBeVisible()
    })
  })
})