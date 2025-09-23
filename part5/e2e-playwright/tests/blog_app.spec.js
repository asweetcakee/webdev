const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, hasNotification } = require('./helper')

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
    const locators = [
      page.getByRole('heading', { name: 'Log in to application' }),
      page.getByText('username'),
      page.getByText('password'),
      page.getByRole('textbox', { name: 'username' }),
      page.getByRole('textbox', { name: 'password' }),
      page.getByRole('button', { name: 'log in' })
    ]
    
    for (const locator of locators) {
      await expect(locator).toBeVisible();
    }
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'test', 'testpass')
      const userLoggedIn = page.getByText('Test subject logged in')
      await expect(userLoggedIn).toBeVisible()
      
      await hasNotification(page, 'Successful login', 'rgb(0, 128, 0)', 'rgb(0, 128, 0)')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'test', 'wrongpass')
      await hasNotification(page, 'Wrong credentials', 'rgb(255, 0, 0)', 'rgb(255, 0, 0)')
    })
  })
})