const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locators = [
      page.getByRole('heading', { name: 'Log in to application' }),
      page.getByText('username'),
      page.getByText('password'),
      page.getByRole('button', { name: 'log in' })
    ]
    
    for (const locator of locators) {
      await expect(locator).toBeVisible();
    }
  })
})