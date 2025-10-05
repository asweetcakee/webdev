import { count } from 'console'
import { request } from 'http'

const { expect, default: test } = require('@playwright/test')

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

const getToken = async (request, { username, password }) => {
  const loginResponse = await request.post('/api/login', { data: { username, password } })  
  expect(loginResponse.ok()).toBeTruthy()
  const { token } = await loginResponse.json()
  return token
}

const addBlogs = async (request, blogs, token) => {
  for (const blog of blogs) {
    const response = await request.post('/api/blogs', { 
      data: blog,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    expect(response.ok()).toBeTruthy()
  }
}

const expectBlogsOrderedByTitle = async (page, expectedTitles) => {
  const titles = await page.locator('.blog-title').allTextContents()
  expectedTitles.forEach((title, index) => {
    expect(titles[index]).toContain(title)
  })
}

const expandAllBlogs = async (page, blogs) => {
  for (const blog of blogs) {
    await page.getByRole('button', { name: `view blog ${blog.title}` }).click()
  }
}

const getLikeCounts = async (page) => {
  const likeTexts = await page.locator('span').allTextContents()
  return likeTexts
    .filter(text => text.startsWith('likes'))
    .map(text => Number(text.replace('likes ', '')))
}

export { 
  loginWith, 
  hasNotification, 
  openBlogForm,
  fillAndSubmitBlogForm, 
  expectLocatorsVisible,
  getToken,
  addBlogs,
  expectBlogsOrderedByTitle,
  expandAllBlogs,
  getLikeCounts 
}