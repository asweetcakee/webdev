const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
  await page.getByRole('textbox', { name: 'username' }).fill(username)
  await page.getByRole('textbox', { name: 'password' }).fill(password)
  await page.getByRole('button', { name: 'log in' }).click()
}

const hasNotification = async (page, message, textColor, borderColor) => {
  const notification = page.getByTestId('notification')
  await expect(notification).toBeVisible()
  await expect(notification).toContainText(message)
  await expect(notification).toHaveCSS('color', textColor)
  await expect(notification).toHaveCSS('border', `3px solid ${borderColor}`)
}

const openBlogForm = async (page) => {
  await page.getByRole('button', { name: 'add blog' }).click()
}

const fillAndSubmitBlogForm = async (page, blog) => {
  await page.getByRole('textbox', { name: 'enter title' }).fill(blog.title)
  await page.getByRole('textbox', { name: 'enter author' }).fill(blog.author)
  await page.getByRole('textbox', { name: 'enter url' }).fill(blog.url)
  await page.getByRole('button', { name: 'create' }).click()
}

const expectLocatorsVisible = async (locators) => {
  for (const locator of locators) {
    await expect(locator).toBeVisible()
  }
}

export { 
  loginWith, 
  hasNotification, 
  openBlogForm,
  fillAndSubmitBlogForm, 
  expectLocatorsVisible
}